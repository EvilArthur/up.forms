<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$componentParameters = [
	'ID' => (int)$_REQUEST['id'],
	'IS_SLIDER' => $_REQUEST['IFRAME']
];
if (isset($_REQUEST['IFRAME']) && $_REQUEST['IFRAME'] == 'Y')
{
	$APPLICATION->IncludeComponent(
		'up:slider.wrapper',
		'',
		[
			'COMPONENT_NAME' => 'up:form.results',
			'COMPONENT_TEMPLATE_NAME' => '',
			'COMPONENT_PARAMS' => $componentParameters,
			'USE_UI_TOOLBAR' => 'Y',
			'POPUP_COMPONENT_USE_BITRIX24_THEME' => 'Y'
		]
	);
}
else
{
	$APPLICATION->IncludeComponent(
		'up:form.results',
		'',
		$componentParameters
	);
}


require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");