<?php
/**
 * @var CMain $APPLICATION
 */

use Bitrix\Main\Config\Option;
use Up\Forms\Model\QuestionTable;

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Forms");
// echo '<pre>';
Option::set('up.forms', '~database_schema_version', 20);
var_dump(Option::get('up.forms', '~database_schema_version'));
// var_dump(\Up\Forms\Repository\FormRepository::getForm(48));

/*QuestionTable::query()
			 ->setSelect(['ID', 'CHAPTER_ID', 'FIELD_ID', 'POSITION', 'TITLE', 'DESCRIPTION', 'OPTION_ID' => 'OPTION.ID', 'OPTION.TITLE', 'OPTION.IS_RIGHT_ANSWER', 'OPTION.QUESTION_ID', 'SETTINGS'])
			 ->setFilter([['=CHAPTER_ID' => 127]])
			 ->setOrder(['POSITION' => 'asc']);*/
/*var_dump(\Bitrix\Main\ORM\Query\Query::getLastQuery());*/
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");