<?php

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

\Bitrix\Main\UI\Extension::load('up.form');
$values = [
	'id' => $arParams['ID'],
	'timer' => $arResult['TIMER'],
	'maxTry' => $arResult['MAX_TRY'],
	'try' => $arResult['TRY'],
	'startTime' => $arResult['START_RESPONSE_TIME'],
	'answers' => $arResult['ANSWERS']
]
?>


<div class="container main" id="main-container">
</div>


<script>
	BX.ready(function() {
		window.Form = new BX.Up.Forms.Form({
			container: document.getElementById('main-container'),
			values: <?=json_encode($values)?>
		});
	});
</script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>