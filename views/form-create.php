<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$componentParameters = ['ID' => (int)$_REQUEST['id']];
if (isset($_REQUEST['IFRAME']) && $_REQUEST['IFRAME'] === 'Y')
{
	$APPLICATION->IncludeComponent(
		'up:slider.wrapper',
		'',
		array(
			'COMPONENT_NAME' => 'up:form.create',
			'COMPONENT_TEMPLATE_NAME' => '',
			'COMPONENT_PARAMS' => $componentParameters,
		)
	);
}
else
{
	$APPLICATION->SetTitle("Формы");

	if ($componentParameters['ID'] === 0)
	{
		$componentParameters['ACTION'] = 'create';
	}
	else
	{
		$componentParameters['ACTION'] = 'edit';
		$componentParameters['FORM_ID'] = $componentParameters['ID'];
	}
	$APPLICATION->IncludeComponent(
		'up:form.main',
		'',
		$componentParameters
	);
}

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");