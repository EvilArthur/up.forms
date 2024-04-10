<?php

		// 'ACTION_PANEL' => [
		// 	'GROUPS' => [
		// 		[
		// 			'ITEMS' => [
		// 				[
		// 					'TYPE' => 'BUTTON',
		// 					'ID' => 'action_panel_button',
		// 					'TEXT' => 'Добавить форму',
		// 					'CLASS' => 'ui-btn-primary',
		// 				],
		// 			],
		// 		],
		// 	],
		// ],
		// 'SHOW_GROUP_DELETE_BUTTON' => true,
		// 'SHOW_ACTION_PANEL' => true,
		// 'SHOW_SELECT_ALL_RECORDS_CHECKBOX' => true,

/**
 * @var array $arResult
 * @var CMain $APPLICATION
 */

use Bitrix\Main\UI\Extension;
use Bitrix\UI\Toolbar\Facade\Toolbar;

Extension::load('up.form-list');
\CJSCore::init("sidepanel");
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

Toolbar::addFilter([
					   'GRID_ID' => 'MY_GRID_ID',
					   'FILTER_ID' => 'report_list',
					   // 'FILTER' => [
						//    [
						// 	   'id' => 'TITLE',
						// 	   'name' => 'Название формы',
						// 	   'type' => 'string',
						// 	   'default' => true,
						//    ],
						   // [
							//    'id' => 'DATE_CREATE',
							//    'name' => 'Дата создания',
							//    'type' => 'date',
							//    'default' => true,
						   // ],
						   // [
							//    'id' => 'STATUS',
							//    'name' => 'Статус',
							//    'type' => 'list',
							//    'items' => [
							// 	   'Active' => 'Active',
							// 	   'Inactive' => 'Inactive',
							//    ],
							//    'default' => true,
						   // ],
						   // [
							//    'id' => 'USER_NAME',
							//    'name' => 'Создал',
							//    'type' => 'string',
							//    'default' => true,
						   // ],
					   // ],
				   ]);

Toolbar::addButton($arResult['ADD_BUTTON']);

$APPLICATION->IncludeComponent(
	'bitrix:main.ui.grid',
	'',
	[
		'GRID_ID' => 'FORMS_LIST_GRID',
		'COLUMNS' => $arResult['COLUMNS'],
		'ROWS' => $arResult['ROWS'],
		'AJAX_MODE' => 'Y',
		'AJAX_OPTION_JUMP' => 'N',
		'AJAX_OPTION_HISTORY' => 'N',
	]
);
?>

<div class="container" id="main-container"></div>

<script>
	BX.ready(function() {
		window.FormList = new BX.Up.Forms.FormList({
			container: document.getElementById('main-container')
		});
	});
</script>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>