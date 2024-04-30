<?php

class FormCreateComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $APPLICATION;
		if (!(\Up\Forms\Model\FormTable::getByPrimary($this->arParams['ID']))->fetchObject() && $this->arParams['ID'] !== 0)
		{
			$APPLICATION->includeComponent('up:not.found', '', []);
			return;
		}
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