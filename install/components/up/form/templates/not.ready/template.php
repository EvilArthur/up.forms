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
	<h1><?=Loc::getMessage('UP_FORMS_FORM_NOT_AVAILABLE')?></h1>
	<p class="mt-2"><?=Loc::getMessage('UP_FORMS_FORM_WILL_BE_AVAILABLE')?>: <?=$arResult['START_TEST_TIME']->format('d.m.Y H:i')?></p>
	<?php if (!is_null($arResult['END_TEST_TIME'])):?>
		<p class="mt-1"><?=Loc::getMessage('UP_FORMS_FORM_NO_LONGER_AVAILABLE')?>: <?=$arResult['END_TEST_TIME']->format('d.m.Y H:i')?></p>
	<?php endif;?>
</div>
