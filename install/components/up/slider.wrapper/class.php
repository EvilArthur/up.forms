//class.php
<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true)
{
	die();
}
class SliderWrapperComponent extends \CBitrixComponent
{
	public function executeComponent()
	{
		/** @var CMain $APPLICATION */
		global $APPLICATION;
		$APPLICATION->RestartBuffer();
		if (!isset($this->arParams['COMPONENT_PARAMS']) || !is_array($this->arParams['COMPONENT_PARAMS']))
		{
			$this->arParams['COMPONENT_PARAMS'] = array();
		}
		$this->arParams['COMPONENT_PARAMS']['IFRAME'] = true;
		$this->includeComponentTemplate();
		require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/epilog_after.php');
		exit;
	}
}