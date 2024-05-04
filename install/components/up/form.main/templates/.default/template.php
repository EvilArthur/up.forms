<?php

/**
 * @var array $arParams
 * @var array $arResult
 * @var CMain $APPLICATION
 */

use Bitrix\Main\UI\Extension;
use Bitrix\UI\Toolbar\ButtonLocation;
use Bitrix\UI\Toolbar\Facade\Toolbar;

Extension::load('up.form-list');
\CJSCore::init("sidepanel");
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

Toolbar::addButton($arResult['ADD_BUTTON'], ButtonLocation::AFTER_TITLE);
Toolbar::addFilter($arResult['FILTER_PARAMS']);
Toolbar::addButton($arResult['ACCESS_BUTTON']);

$APPLICATION->IncludeComponent(
	'bitrix:main.ui.grid',
	'',
	[
		'GRID_ID' => $arParams['GRID_ID'],
		'COLUMNS' => $arResult['COLUMNS'],
		'ROWS' => $arResult['ROWS'],
		'ACTION_PANEL' => $arResult['ACTION_PANEL'],
		'AJAX_MODE' => 'Y',
		'AJAX_OPTION_JUMP' => 'N',
		'AJAX_OPTION_HISTORY' => 'N',

		//Общие настройки
		'SHOW_ROW_ACTIONS_MENU'     => true,
		'SHOW_GRID_SETTINGS_MENU'   => true,
		'SHOW_SELECTED_COUNTER'     => true,
		'SHOW_TOTAL_COUNTER'        => false,
		'SHOW_ACTION_PANEL'         => true,
		'SHOW_GROUP_DELETE_BUTTON'  => true,
		'ALLOW_COLUMNS_RESIZE'      => true,
		'ALLOW_HORIZONTAL_SCROLL'   => true,
		'ALLOW_PIN_HEADER'          => true,

		//Настройки для пагинации
		'NAV_OBJECT' => $arResult['NAV_OBJECT'],
		'SHOW_NAVIGATION_PANEL'     => true,
		'SHOW_PAGINATION'           => true,

		//Настройки для сортировки\фильтрации\поиска
		'ALLOW_SORT'                => true,
		'ALLOW_COLUMNS_SORT'        => true,

	]
);
?>

<div class="container" id="main-container"></div>

<script>
	BX.ready(function() {
		window.FormList = new BX.Up.Forms.FormList({
			container: document.getElementById('main-container'),
			gridId: "<?=$arResult['GRID_ID']?>",
			<?= $arParams['ACTION'] ? "action: '{$arParams['ACTION']}'," : '' ?>
			<?= $arParams['FORM_ID'] ? "formId: '{$arParams['FORM_ID']}'," : '' ?>
		});
	});
</script>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>