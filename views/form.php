<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");

$APPLICATION->IncludeComponent('up:form', '',
							   ['ID' => (int)$_REQUEST['id']]);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");