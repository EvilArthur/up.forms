<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");

var_dump(request()->getPostList());

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");