<?php

use Bitrix\Main\Grid\Panel\Actions;
use Bitrix\Main\Grid\Panel\Snippet\Onchange;
use Bitrix\Main\Loader;
use Bitrix\UI\Buttons\AddButton;
use Bitrix\UI\Buttons\JsCode;
use Up\Forms\Repository\FormRepository;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
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
		$this->fetchParams();
		$this->fetchFormColumns();
		$this->fetchAddButton();
		$this->fetchActionPanel();

		$this->includeComponentTemplate();
	}

	protected function fetchParams()
	{
		$this->arResult['GRID_ID'] = 'FORMS_LIST_GRID';
		$this->arResult['FILTER_ID'] = 'FORMS_LIST_GRID_FILTER';
		$this->arResult['NAVIGATION_ID'] = 'FORMS_LIST_GRID_NAVIGATION';
		$this->arResult['NUM_OF_ITEMS_PER_PAGE'] = 10;
	}

	protected function fetchFormRows()
	{
		// $gridOptions = new GridOptions($this->arResult['GRID_ID']);
		// $filterOptions = new FilterOptions($this->arResult['FILTER_ID']);
		// $filterFields = $filterOptions->getFilter([['id' => 'Title', 'name' => 'Название формы']]);






		$nav = new PageNavigation($this->arResult['NAVIGATION_ID']);
		$nav->allowAllRecords(false)
			->setPageSize($this->arResult['NUM_OF_ITEMS_PER_PAGE'])
			->initFromUri();

		$filter = [
			'LIMIT' => $nav->getLimit() + 1,
			'OFFSET' => $nav->getOffset(),
		];

		$forms = FormRepository::getForms($filter);
		$rows = FormManager::prepareFormsForGrid($forms, $this->arResult['NUM_OF_ITEMS_PER_PAGE']);
		$nav->setRecordCount($nav->getOffset() + count($forms));

		$this->arResult['ROWS'] = $rows;
	}

	protected function fetchFormColumns()
	{
		$this->arResult['COLUMNS'] = [
			['id' => 'Title', 'name' => 'Название формы', 'sort' => 'Title', 'default' => true],
			['id' => 'DATE_CREATE', 'name' => 'Создано', 'default' => true],
			['id' => 'STATUS', 'name' => 'Статус', 'default' => true],
			['id' => 'USER_NAME', 'name' => 'Создал', 'default' => true],
		];
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
					['JS' => 'FormList.deleteForms()']
				]
			]
		);

		$this->arResult['ACTION_PANEL'] = [
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
				]
			],
		];
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
}