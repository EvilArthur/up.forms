<?php

use Bitrix\Main\Loader;
use Up\Forms\Model\FormTable;

class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER;
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::Add($USER->GetID(), 'FORMS-UPDATE');
		}

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