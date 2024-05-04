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
use Up\Forms\Model\FormSettingsTable;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\TaskRepository;
use Up\Forms\Service\AccessManager;

use \Bitrix\Main\Localization\Loc;
Loc::loadMessages(__FILE__);
class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER, $APPLICATION;
		$this->arResult['USER_ID'] = $USER->GetID();


		if (!AccessManager::checkAccessRights($USER->GetID()))
		{
			$APPLICATION->includeComponent('up:not.found', '', []);
			return;
		}
		if ($this->arResult['IS_ADMIN'] = AccessManager::isAdmin($USER->GetID()))
		{
			$this->fetchAccessButton();
		}


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
		$this->arResult['FORM_SETTINGS'] = FormSettingsTable::query()->setSelect(['ID', 'TITLE'])->fetchAll();
	}

	protected function fetchAddButton()
	{

		$this->arResult['ADD_BUTTON'] = AddButton::create(
			[
				'id' => 'createForm',
				'click' => new JsCode("FormList.createForm()"),
				'text' => Loc::getMessage('UP_FORMS_GRID_CREATE_FORM_BUTTON'),
				'dataset' => [
					'toolbar-collapsed-icon' => Bitrix\UI\Buttons\Icon::ADD,
				],
			]
		);


	}

	protected function fetchAccessButton()
	{
		$this->arResult['ACCESS_BUTTON'] = new Bitrix\UI\Buttons\SettingsButton(
			[
				'text' => 'Права доступа',
				'click' => new JsCode("FormList.openAccess()"),
				'dataset' =>
					[
						'toolbar-collapsed-icon' => Bitrix\UI\Buttons\Icon::SETTINGS,
					],
			]
		);
	}

	protected function fetchActionPanel()
	{
		$deleteOnchange = new Onchange();
		$deleteOnchange->addAction(
			[
				'ACTION' => Actions::CALLBACK,
				'CONFIRM' => true,
				'CONFIRM_APPLY_BUTTON'  => Loc::getMessage('UP_FORMS_GRID_ACTION_PANEL_CONFIRM_APPLY_BUTTON'),
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
							'TEXT'     => Loc::getMessage('UP_FORMS_GRID_ACTION_PANEL_DELETE_BUTTON'),
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
					'name' => Loc::getMessage('UP_FORMS_GRID_FILTER_FORM_TITLE'),
					'default' => true,
				],
				[
					'id' => 'USER',
					'name' => Loc::getMessage('UP_FORMS_GRID_FILTER_USER'),
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
				['id' => 'TITLE', 'name' => Loc::getMessage('UP_FORMS_GRID_COLUMN_TITLE'), 'sort' => 'TITLE', 'default' => true],
				['id' => 'DATE', 'name' => Loc::getMessage('UP_FORMS_GRID_COLUMN_DATE'), 'sort' => 'DATE', 'default' => true],
				['id' => 'USER_NAME', 'name' => Loc::getMessage('UP_FORMS_GRID_COLUMN_USER_NAME'), 'sort' => 'CREATOR_ID', 'default' => true],
			];
		foreach ($this->arResult['FORM_SETTINGS'] as $setting)
		{
			$this->arResult['COLUMNS'][] = [
				'id' => $setting['ID'],
				'name' => Loc::getMessage($setting['TITLE']),
				'default' => true,
			];
		}
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
		$gridOptions = new GridOptions($this->arParams['GRID_ID']);
		$filterOptions = new FilterOptions($this->arParams['FILTER_ID']);
		$gridFields = $gridOptions->getSorting();
		$filterFields = $filterOptions->getFilter($this->arResult['FILTERS']);

		$this->arResult['FILTER'] = [
			'LIMIT' => $this->arResult['NAV_OBJECT']->getLimit() + 1,
			'OFFSET' => $this->arResult['NAV_OBJECT']->getOffset(),
			'TITLE' => $filterFields['TITLE'],
			'USERS' => $filterFields['USER'],
			'SORT' => $gridFields['sort'],
		];
	}

	protected function prepareFormsForGrid( $forms)
	{
		$rows = [];
		// FormatDate();
		foreach ($forms as $form)
		{
			$columns = [
				'TITLE' => "<a href = '/form/view/" . $form->getId() . "/'>" . htmlspecialcharsbx($form->getTitle()) . "</a>",
				'DATE' => $form->getDate()?->format('d M, H:i'),
				'STATUS' => 'Active',
				'USER_NAME' => htmlspecialcharsbx($this->arResult['USERS'][$form->getCreatorId()]),
			];
			foreach ($form->getSettings() as $setting)
			{
				if(is_null($setting->getValue()))
				{
					$columns[$setting->getSettingsId()] = Loc::getMessage('UP_FORMS_GRID_NULL_VALUE');
				}
				elseif($setting->getSettings()->getType()->getTitle() === 'datetime-local')
				{
					$columns[$setting->getSettingsId()] = date('d.M Y H:i', strtotime($setting->getValue())) ;
				}
				elseif ($setting->getSettings()->getType()->getTitle() === 'checkbox')
				{
					$columns[$setting->getSettingsId()] = ($setting->getValue() === 'false') ?
						Loc::getMessage('UP_FORMS_GRID_CHECKBOX_FALSE') :
						Loc::getMessage('UP_FORMS_GRID_CHECKBOX_TRUE');
				}
				else
				{
					$columns[$setting->getSettingsId()] =  $setting->getValue();
				}

			}
			$rows[] = [
				'id' => (int)$form->getId(),
				'columns' => $columns,
				'actions' => [
					[
						'text' => Loc::getMessage('UP_FORMS_GRID_ACTION_OPEN'),
						'onclick' => 'FormList.openForm(' . $form->getId() . ')',
						'default' => true,
					],
					[
						'text' => Loc::getMessage('UP_FORMS_GRID_ACTION_DELETE'),
						'onclick' => 'FormList.deleteForm(' . $form->getId() . ')',
						'default' => true,
					],
					[
						'text' => Loc::getMessage('UP_FORMS_GRID_ACTION_EDIT'),
						'onclick' => 'FormList.editForm(' . $form->getId() . ')',
						'default' => true,
					],
					[
						'text' => Loc::getMessage('UP_FORMS_GRID_ACTION_RESULT'),
						'onclick' => 'FormList.showResults(' . $form->getId() . ')',
						'default' => true,
					],
					[
						'text' => Loc::getMessage('UP_FORMS_GRID_ACTION_CREATE_TASK'),
						'onclick' => 'FormList.createTask("' . $form->getTitle() . '",' . $form->getId() . ',' . $this->arResult['USER_ID'] . ')',
						'default' => true,
					],
					[
						'text' => Loc::getMessage('UP_FORMS_GRID_ACTION_QUICK_TASK'),
						'onclick' => 'FormList.createFastTask("' . $form->getTitle() . '",' . $form->getId() . ',' . $this->arResult['USER_ID'] . ')',
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