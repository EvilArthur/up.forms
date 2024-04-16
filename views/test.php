<?php
/**
 * @var CMain $APPLICATION
 */

use Bitrix\Main\Config\Option;

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");
echo '<pre>';
var_dump(\Up\Forms\Repository\FormRepository::getForm(48));
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");