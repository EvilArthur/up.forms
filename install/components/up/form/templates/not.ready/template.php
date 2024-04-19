<?php

/**
 * @var array $arParams
 * @var array $arResult
 */

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>



<div class="container text-center">
	<h1>Форма пока ещё не доступна!</h1>
	<p class="mt-2">Форма будет доступна с: <?=$arResult['startTestTime']->format('d.m.Y H:i')?></p>
	<?php if (!is_null($arResult['endTestTime'])):?>
		<p class="mt-1">Форма перестанет быть доступной в: <?=$arResult['endTestTime']->format('d.m.Y H:i')?></p>
	<?php endif;?>
</div>
