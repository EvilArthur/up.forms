<?php

use Up\Forms\Model\FormTable;

class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchTasksList();
		$this->includeComponentTemplate();
	}

	protected function fetchTasksList()
	{

		$tasks = FormTable::query()
						  ->setSelect(['*'])
						  ->fetchCollection();

		$this->arResult['FORMS'] = $tasks;
	}
}