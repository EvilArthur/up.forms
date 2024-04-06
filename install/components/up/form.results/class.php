<?php

use Up\Forms\Model\FormTable;

class FormResultsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['ID'] = (int) $arParams['ID'];
		if ($arParams['ID'] <= 0)
		{
			$response = new \Bitrix\Main\Engine\Response\Redirect('404');
			$response->setStatus('404');
		}
		return $arParams;
	}

}