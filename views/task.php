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
			'COMPONENT_NAME' => 'up:form.task',
			'COMPONENT_TEMPLATE_NAME' => '',
			'COMPONENT_PARAMS' => $componentParameters,
			'USE_UI_TOOLBAR' => 'Y',
			'POPUP_COMPONENT_USE_BITRIX24_THEME' => 'Y'
		]
	);
}
else
{
	$APPLICATION->SetTitle("Forms.task");
	$APPLICATION->IncludeComponent(
		"bitrix:tasks.task",
		"",
		[
			"REDIRECT_ON_SUCCESS" => "Y",
			"SET_NAVCHAIN" => "Y",
			"SET_TITLE" => "Y",
			"SHOW_RATING" => "Y",
			"ACTION"=>"edit",
			"USER_ID" => "1"
		]
	);
}






require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");