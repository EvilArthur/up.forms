<?php

use Bitrix\UI\Buttons\AddButton;
use Bitrix\UI\Buttons\JsCode;
use Bitrix\Main\Loader;
use Bitrix\Main\Grid\Panel\Actions;
use Bitrix\Main\Grid\Panel\Snippet\Onchange;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Service\FormManager;

class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER;
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::Add($USER->GetID(), 'FORMS-UPDATE');
		}
		$this->fetchAddButton();

		$this->fetchGridColumns();
		$this->fetchFilterParams();
		$this->fetchGridRows();

		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['GRID_ID'] = 'FORMS_LIST_GRID';
		$arParams['FILTER_ID'] = 'FORMS_LIST_GRID_FILTER';
		$arParams['NAVIGATION_ID'] = 'FORMS_LIST_GRID_NAVIGATION';
		$arParams['NUM_OF_ITEMS_PER_PAGE'] = 10;
		$arParams['FILTERS'] = [
			['id' => 'TITLE', 'name' => 'Название формы'],
		];
		$arParams['ACTION_PANEL'] = $this->fetchActionPanel();
		return $arParams;
	}

	protected function fetchAddButton()
	{
		$addButton = AddButton::create(
			[
				'id' => 'createForm',
				'click' => new JsCode("FormList.createForm()"),
				'text' => 'Добавить форму',
			]
		);

		$this->arResult['ADD_BUTTON'] = $addButton;
	}

	protected function fetchActionPanel()
	{
		$deleteOnchange = new Onchange();
		$deleteOnchange->addAction(
			[
				'ACTION' => Actions::CALLBACK,
				'CONFIRM' => true,
				'CONFIRM_APPLY_BUTTON'  => 'Подтвердить',
				'DATA' => [
					['JS' => 'FormList.deleteForms()'],
				],
			]
		);

		return [
			'GROUPS' => [
				'TYPE' => [
					'ITEMS' => [
						[
							'ID'       => 'delete',
							'TYPE'     => 'BUTTON',
							'TEXT'     => 'Удалить',
							'CLASS'    => 'icon remove',
							'ONCHANGE' => $deleteOnchange->toArray(),
						],
					],
				],
			],
		];
	}

	protected function fetchGridColumns()
	{
		$this->arResult['COLUMNS'] = [
			['id' => 'TITLE', 'name' => 'Название формы', 'sort' => 'Title', 'default' => true],
			['id' => 'DATE_CREATE', 'name' => 'Создано', 'default' => true],
			['id' => 'STATUS', 'name' => 'Статус', 'default' => true],
			['id' => 'USER_NAME', 'name' => 'Создал', 'default' => true],
		];
	}

	protected function fetchFilterParams()
	{
		$this->arResult['FILTER_PARAMS'] = [
			'GRID_ID' => $this->arParams['GRID_ID'],
			'FILTER_ID' => $this->arParams['FILTER_ID'],
			'FILTER' => $this->arParams['FILTERS'],
			'DISABLE_SEARCH' => true,
			'ENABLE_LABEL' => true,
		];
	}

	protected function fetchGridRows()
	{
		$gridOptions = new GridOptions($this->arParams['GRID_ID']);
		$filterOptions = new FilterOptions($this->arParams['FILTER_ID']);
		$filterFields = $filterOptions->getFilter($this->arParams['FILTERS']);

		$nav = new PageNavigation($this->arParams['NAVIGATION_ID']);
		$nav->allowAllRecords(false)
			->setPageSize($this->arParams['NUM_OF_ITEMS_PER_PAGE'])
			->initFromUri();

		$filter = [
			'LIMIT' => $nav->getLimit() + 1,
			'OFFSET' => $nav->getOffset(),
			'TITLE' => $filterFields['TITLE'],
		];

		$forms = FormRepository::getForms($filter);
		$rows = FormManager::prepareFormsForGrid($forms, $this->arParams['NUM_OF_ITEMS_PER_PAGE']);
		$nav->setRecordCount($nav->getOffset() + count($forms));

		$this->arResult['ROWS'] = $rows;
		$this->arResult['NAV_OBJECT'] = $nav;
	}
}