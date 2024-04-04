<?php
/**
 * @var CMain $APPLICATION
 */
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");
$href = 'http://' .  $_SERVER['HTTP_HOST'] . '/forms/';
echo 'Успешно добавлено';
echo "<a href='{$href}'><button>Вернуться</button></a>";

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");