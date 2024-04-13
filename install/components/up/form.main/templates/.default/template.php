<?php

/**
 * @var array $arResult
 * @var CMain $APPLICATION
 */

use Bitrix\Main\UI\Extension;
use Bitrix\UI\Toolbar\Facade\Toolbar;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Service\FormManager;

Extension::load('up.form-list');
\CJSCore::init("sidepanel");
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

Toolbar::addButton($arResult['ADD_BUTTON']);
// Toolbar::addFilter([
// 					   'GRID_ID' => $arResult['GRID_ID'],
// 					   'FILTER_ID' => $arResult['FILTER_ID'],
// 					   'FILTER' => [
// 						   [
// 							   'id' => 'Title',
// 							   'name' => 'Название формы',
// 							   'type' => 'text',
// 						   ],
// 					   ],
// 					   'ENABLE_LIVE_SEARCH' => false,
// 					   'ENABLE_LABEL' => true,
// 					   'DISABLE_SEARCH' => true,
// 				   ]);

$gridOptions = new GridOptions($arResult['GRID_ID']);

$APPLICATION->includeComponent(
	"bitrix:main.ui.filter",
	"",
	[
		'FILTER_ID' => $arResult['GRID_ID'],
		'GRID_ID' => $arResult['GRID_ID'],
		'FILTER' => [['id' => 'Title', 'name' => 'Название формы']],
		'ENABLE_LIVE_SEARCH' => false,
		'ENABLE_LABEL' => true,
		'DISABLE_SEARCH' => true,
	]
);


$filterOptions = new FilterOptions($arResult['GRID_ID']);
$filterFields = $gridOptions->getFilter([['id' => 'Title', 'name' => 'Название формы']]);






$nav = new PageNavigation($arResult['NAVIGATION_ID']);
$nav->allowAllRecords(false)
	->setPageSize($arResult['NUM_OF_ITEMS_PER_PAGE'])
	->initFromUri();

$filter = [
	'LIMIT' => $nav->getLimit() + 1,
	'OFFSET' => $nav->getOffset(),
];

$forms = FormRepository::getForms($filter);
$rows = FormManager::prepareFormsForGrid($forms, $arResult['NUM_OF_ITEMS_PER_PAGE']);
$nav->setRecordCount($nav->getOffset() + count($forms));



$APPLICATION->IncludeComponent(
	'bitrix:main.ui.grid',
	'',
	[
		'GRID_ID' => $arResult['GRID_ID'],
		'COLUMNS' => $arResult['COLUMNS'],
		'ROWS' => $rows,
		'ACTION_PANEL' => $arResult['ACTION_PANEL'],
		'AJAX_MODE' => 'Y',
		'AJAX_OPTION_JUMP' => 'N',
		'AJAX_OPTION_HISTORY' => 'N',

		'SHOW_ROW_ACTIONS_MENU'     => true,
		'SHOW_GRID_SETTINGS_MENU'   => true,
		'SHOW_SELECTED_COUNTER'     => true,
		'SHOW_TOTAL_COUNTER'        => false,
		'SHOW_ACTION_PANEL'         => true,
		'ALLOW_COLUMNS_SORT'        => true,
		'ALLOW_COLUMNS_RESIZE'      => true,
		'ALLOW_HORIZONTAL_SCROLL'   => true,
		'ALLOW_PIN_HEADER'          => true,


		//Настройки для пагинации
		'NAV_OBJECT' => $nav,
		'SHOW_NAVIGATION_PANEL'     => true,
		'SHOW_PAGINATION'           => true,

		// 'NAV_PARAM_NAME'
		// 'CURRENT_PAGE'
		// 'ENABLE_NEXT_PAGE'
		// 'TOTAL_ROWS_COUNT'
		// 'DEFAULT_PAGE_SIZE'


		//Настройки для сортировки\фильтрации\поиска
		'ALLOW_SORT'                => true,
	]
);
?>

<div class="container" id="main-container"></div>

<script>
	BX.ready(function() {
		window.FormList = new BX.Up.Forms.FormList({
			container: document.getElementById('main-container'),
			gridId: "<?=$arResult['GRID_ID']?>"
		});
	});
</script>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>