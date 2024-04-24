<?php

use Bitrix\Main\UserTable;
use Bitrix\UI\Buttons\AddButton;
use Bitrix\UI\Buttons\JsCode;
use Bitrix\Main\Loader;
use Bitrix\Main\Grid\Panel\Actions;
use Bitrix\Main\Grid\Panel\Snippet\Onchange;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\TaskRepository;

class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER;
		$this->arResult['USER_ID'] = $USER->GetID();
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::Add($USER->GetID(), 'FORMS-UPDATE');
		}



		$this->fetchData();
		$this->fetchAddButton();
		$this->fetchActionPanel();
		$this->fetchFilterParams();
		$this->fetchGridColumns();
		$this->fetchGridRows();

		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['GRID_ID'] = 'FORMS_LIST_GRID';
		$arParams['FILTER_ID'] = 'FORMS_LIST_GRID_FILTER';
		$arParams['NAVIGATION_ID'] = 'FORMS_LIST_GRID_NAVIGATION';
		$arParams['NUM_OF_ITEMS_PER_PAGE'] = 10;

		return $arParams;
	}

	protected function fetchData()
	{
		$users = UserTable::query()->setSelect(['ID', 'NAME'])->fetchAll();
		foreach ($users as $user)
		{
			$this->arResult['USERS'][$user['ID']] = $user['NAME'];
		}
	}

	protected function fetchAddButton()
	{
		$addButton = AddButton::create(
			[
				'id' => 'createForm',
				'click' => new JsCode("FormList.createForm()"),
				'text' => 'Создать',
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
				],
			],
		];
	}

	protected function fetchFilterParams()
	{
		$this->arResult['FILTERS'] =
			[
				[
					'id' => 'TITLE',
					'name' => 'Название формы',
					'default' => true,
				],
				[
					'id' => 'USER',
					'name' => 'Пользователь',
					'type' => 'list',
					'items' => $this->arResult['USERS'],
					'params' => ['multiple' => 'Y'],
					'default' => true,
				],
			];

		$this->arResult['FILTER_PARAMS'] =
			[
				'GRID_ID' => $this->arParams['GRID_ID'],
				'FILTER_ID' => $this->arParams['FILTER_ID'],
				'FILTER' => $this->arResult['FILTERS'],
				'DISABLE_SEARCH' => true,
				'ENABLE_LABEL' => true,
			];
	}

	protected function fetchGridColumns()
	{
		$this->arResult['COLUMNS'] =
			[
				['id' => 'TITLE', 'name' => 'Название формы', 'default' => true],
				['id' => 'DATE_CREATE', 'name' => 'Создано', 'default' => true],
				['id' => 'STATUS', 'name' => 'Статус', 'default' => true],
				['id' => 'USER_NAME', 'name' => 'Создал', 'default' => true],
			];
	}

	protected function fetchGridRows()
	{
		$this->fetchNavigation();
		$this->fetchFilter();

		$forms = FormRepository::getForms($this->arResult['FILTER']);
		$this->arResult['ROWS'] = $this->prepareFormsForGrid($forms);
	}

	protected function fetchNavigation()
	{
		$nav = new PageNavigation($this->arParams['NAVIGATION_ID']);
		$nav->allowAllRecords(false)
			->setPageSize($this->arParams['NUM_OF_ITEMS_PER_PAGE'])
			->initFromUri();
		$this->arResult['NAV_OBJECT'] = $nav;
	}

	protected function fetchFilter()
	{
		// $gridOptions = new GridOptions($this->arParams['GRID_ID']);
		$filterOptions = new FilterOptions($this->arParams['FILTER_ID']);
		$filterFields = $filterOptions->getFilter($this->arResult['FILTERS']);

		$this->arResult['FILTER'] = [
			'LIMIT' => $this->arResult['NAV_OBJECT']->getLimit() + 1,
			'OFFSET' => $this->arResult['NAV_OBJECT']->getOffset(),
			'TITLE' => $filterFields['TITLE'],
			'USERS' => $filterFields['USER'],
		];
	}

	protected function prepareFormsForGrid(array $forms)
	{
		$rows = [];

		foreach ($forms as $form)
		{
			$rows[] = [
				'id' => (int)$form['ID'],
				'columns' => [
					'TITLE' => htmlspecialcharsbx($form['TITLE']),
					'DATE_CREATE' => '2022-01-01',
					'STATUS' => 'Active',
					'USER_NAME' => htmlspecialcharsbx($this->arResult['USERS'][$form['CREATOR_ID']]),
				],
				'actions' => [
					[
						'text' => 'Открыть',
						'onclick' => 'FormList.openForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Удалить',
						'onclick' => 'FormList.deleteForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Редактировать',
						'onclick' => 'FormList.editForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Результаты',
						'onclick' => 'FormList.showResults(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Созать задачу',
						'onclick' => 'FormList.createTask("' . $form['TITLE'] . '",' . $form['ID'] . ',' . $this->arResult['USER_ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Быстрая задача',
						'onclick' => 'FormList.createFastTask("' . $form['TITLE'] . '",' . $form['ID'] . ',' . $this->arResult['USER_ID'] . ')',
						'default' => true,
					],
				],

			];
		}

		if (count($rows) > $this->arParams['NUM_OF_ITEMS_PER_PAGE'])
		{
			array_pop($rows);
		}

		$this->arResult['NAV_OBJECT']->setRecordCount($this->arResult['NAV_OBJECT']->getOffset() + count($forms));

		return $rows;
	}
}