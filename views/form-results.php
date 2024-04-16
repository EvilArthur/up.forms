<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$componentParameters = ['ID' => (int)$_REQUEST['id']];
if (isset($_REQUEST['IFRAME']) && $_REQUEST['IFRAME'] == 'Y')
{
	$APPLICATION->IncludeComponent(
		'up:slider.wrapper',
		'',
		array(
			'COMPONENT_NAME' => 'up:form.results',
			'COMPONENT_TEMPLATE_NAME' => '',
			'COMPONENT_PARAMS' => $componentParameters,
		)
	);
}
else
{
	$APPLICATION->SetTitle("Forms");
	$APPLICATION->IncludeComponent(
		'up:form.results',
		'',
		$componentParameters
	);
}


require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");