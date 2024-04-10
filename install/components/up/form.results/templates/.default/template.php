<?php

/**
 * @var array $arParams
 * @var array $arResult
 * @var CMain $APPLICATION
 */

use Bitrix\Main\UI\Extension;
use Bitrix\UI\Toolbar\Facade\Toolbar;

Extension::load('up.form-results');
\CJSCore::init("sidepanel");
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

Toolbar::addFilter([
					   'GRID_ID' => 'MY_GRID_ID',
					   'FILTER_ID' => 'report_list',
				   ]);

$APPLICATION->IncludeComponent(
	'bitrix:main.ui.grid',
	'',
	[
		'GRID_ID' => "FORMS_RESULTS_GRID_{$arParams['ID']}",
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
		window.FormConstructor = new BX.Up.Forms.FormResults({
			container: document.getElementById('main-container'),
			id: <?=$arParams['ID']?>
		});
	});
</script>




<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>