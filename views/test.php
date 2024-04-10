<?php
/**
 * @var CMain $APPLICATION
 */

use Bitrix\Main\Config\Option;

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");
Option::set('up.forms', '~database_schema_version', 7);
var_dump(Option::get('up.forms', '~database_schema_version'));

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");