<?php

use Bitrix\Main\Loader;

class FormMainComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER;
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::Add($USER->GetID(), 'FORMS-UPDATE');
		}

		$this->includeComponentTemplate();
	}


}