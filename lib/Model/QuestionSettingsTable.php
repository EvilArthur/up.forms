<?php
namespace Bitrix\Question;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Up\Forms\Model\FormFormSettingsTable;
use Up\Forms\Model\QuestionQuestionSettingsTable;

Loc::loadMessages(__FILE__);

/**
 * Class SettingsTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> TITLE string(30) optional
 * </ul>
 *
 * @package Bitrix\Question
 **/

class QuestionSettingsTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_question_settings';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			(new IntegerField('ID',
							  []
			))->configureTitle(Loc::getMessage('QUESTION_SETTINGS_ENTITY_ID_FIELD'))
			  ->configurePrimary(true)
			  ->configureAutocomplete(true),
			(new StringField('TITLE',
							 [
								 'validation' => [__CLASS__, 'validateTitle']
							 ]
			))->configureTitle(Loc::getMessage('QUESTION_SETTINGS_ENTITY_TITLE_FIELD')),
			(new OneToMany('QUESTION', QuestionQuestionSettingsTable::class, 'SETTINGS')),
		];
	}

	/**
	 * Returns validators for TITLE field.
	 *
	 * @return array
	 */
	public static function validateTitle()
	{
		return [
			new LengthValidator(null, 30),
		];
	}
}