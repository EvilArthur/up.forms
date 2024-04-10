<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");

\Up\Forms\Repository\FormRepository::deleteForm(83);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");