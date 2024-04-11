<?php

/**
 * @var array $arResult
 * @var CMain $APPLICATION
 */

use Bitrix\Main\UI\Extension;
use Bitrix\Main\UI\Filter\Options;
use Bitrix\UI\Toolbar\Facade\Toolbar;

Extension::load('up.form-list');
\CJSCore::init("sidepanel");
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

Toolbar::addFilter([
					   'GRID_ID' => $arResult['GRID_ID'],
					   'FILTER_ID' => $arResult['FILTER_ID'],
					   'FILTER' => [
						   [
							   'id' => 'Title',
							   'name' => 'Название формы',
							   'type' => 'text',
							   'default' => true,
						   ],
					   ],
					   'ENABLE_LIVE_SEARCH' => true,
					   'ENABLE_LABEL' => true
				   ]);

$filterOptions = new Options('FORMS_LIST_GRID_FILTER');
$filterFields = $filterOptions->getFilter([
											  [
												  'id' => 'Title',
												  'name' => 'Название формы',
												  'type' => 'text',
												  'default' => true,
											  ],
										  ]);

Toolbar::addButton($arResult['ADD_BUTTON']);

$APPLICATION->IncludeComponent(
	'bitrix:main.ui.grid',
	'',
	[
		'GRID_ID' => $arResult['GRID_ID'],
		'COLUMNS' => $arResult['COLUMNS'],
		'ROWS' => $arResult['ROWS'],
		'ACTION_PANEL' => $arResult['ACTION_PANEL'],
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
			container: document.getElementById('main-container'),
			gridId: "<?=$arResult['GRID_ID']?>"
		});
	});
</script>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>