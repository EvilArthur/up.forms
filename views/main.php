<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");

$APPLICATION->IncludeComponent('up:form.main', '');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");