<?php

use Bitrix\Main\Engine\Response\Redirect;
use Bitrix\Main\Grid\Panel\Snippet\Onchange;
use Bitrix\Main\UserTable;
use Up\Forms\Model\FormTable;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Bitrix\Main\Grid\Panel\Actions;

use Up\Forms\Repository\ResponseRepository;


class FormTaskComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['ID'] = (int) $arParams['ID'];

		return $arParams;
	}
}