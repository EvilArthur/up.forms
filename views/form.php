<?php

/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$componentParameters = ['ID' => (int)$_REQUEST['id']];

if (isset($_REQUEST['IFRAME']) && $_REQUEST['IFRAME'] == 'Y')
{
	$APPLICATION->IncludeComponent(
		'up:slider.wrapper', '', [
							   'COMPONENT_NAME' => 'up:form',
							   'COMPONENT_TEMPLATE_NAME' => '',
							   'COMPONENT_PARAMS' => $componentParameters,
						   ]
	);
}
else
{
	$APPLICATION->SetTitle("Формы");

	$APPLICATION->IncludeComponent(
		'up:form',
		'',
		$componentParameters
	);
}

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");