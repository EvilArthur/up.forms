<?php

/**
 * @var array $arParams
 */

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
use \Bitrix\Main\Localization\Loc;
Loc::loadMessages(__FILE__);
Loc::loadLanguageFile(__FILE__);
?>
<div class="container text-center">
	<h1><?=Loc::getMessage('UP_FORMS_FORM_NOT_FOUND_OR_ACCESS_DENIED')?></h1>
	<p class="mt-2"><?=Loc::getMessage('UP_FORMS_CONTACT_ADMIN')?></p>
</div>
