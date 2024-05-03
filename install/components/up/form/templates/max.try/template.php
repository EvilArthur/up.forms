<?php

/**
 * @var array $arParams
 * @var array $arResult
 */

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
use \Bitrix\Main\Localization\Loc;
Loc::loadMessages(__FILE__);
?>



<div class="container text-center">
	<h1><?=Loc::getMessage('UP_FORMS_FORM_USED_ALL_TRYIES')?></h1>
	<p class="mt-2"><?=Loc::getMessage('UP_FORMS_CONTACT_ADMIN')?></p>
</div>
