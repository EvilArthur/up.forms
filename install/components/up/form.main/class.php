<?php

use Bitrix\Crm\WebForm\Internals\FormTable;
use Bitrix\Main\Loader;
use Bitrix\UI\Buttons\AddButton;
use Bitrix\UI\Buttons\JsCode;
use Up\Forms\Repository\FormRepository;

class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER;
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::Add($USER->GetID(), 'FORMS-UPDATE');
		}
		$this->fetchFormRows();
		$this->fetchFormColumns();
		$this->fetchAddButton();

		$this->includeComponentTemplate();
	}

	protected function fetchFormRows()
	{
		$forms = FormRepository::getForms();
		$rows = [];

		foreach ($forms as $form)
		{
			$rows[] = [
				'id' => (int)$form['ID'],
				'columns' => [
					'TITLE' => $form['Title'],
					'DATE_CREATE' => '2022-01-01',
					'STATUS' => 'Active',
					'USER_NAME' => 'Супер Админ'
				],
				'actions' => [
					[
						'text' => 'Delete',
						'onclick' => 'FormList.deleteForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Edit',
						'onclick' => 'FormList.editForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Open',
						'onclick' => 'FormList.openForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Results',
						'href' => '/form/results/' . $form['ID'] . '/',
						'default' => true,
					],
				],

			];
		}

		$this->arResult['ROWS'] = $rows;
	}

	protected function fetchFormColumns()
	{
		$this->arResult['COLUMNS'] = [
			['id' => 'TITLE', 'name' => 'Название формы', 'sort' => 'Title', 'default' => true],
			['id' => 'DATE_CREATE', 'name' => 'Создано', 'default' => true],
			['id' => 'STATUS', 'name' => 'Статус', 'default' => true],
			['id' => 'USER_NAME', 'name' => 'Создал', 'default' => true],
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