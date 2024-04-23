<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;
use Bitrix\Question\QuestionSettingsTable;

Loc::loadMessages(__FILE__);

/**
 * Class QuestionSettingsTable
 *
 * Fields:
 * <ul>
 * <li> QUESTION_ID int mandatory
 * <li> SETTINGS_ID int mandatory
 * <li> VALUE string(30) optional
 * </ul>
 *
 * @package Bitrix\Question
 **/

class QuestionQuestionSettingsTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_question_QUESTION_QUESTION_SETTINGS';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			(new IntegerField('QUESTION_ID',
							  []
			))->configureTitle(Loc::getMessage('QUESTION_QUESTION_SETTINGS_ENTITY_QUESTION_ID_FIELD'))
			  ->configurePrimary(true),
			(new IntegerField('SETTINGS_ID',
							  []
			))->configureTitle(Loc::getMessage('QUESTION_QUESTION_SETTINGS_ENTITY_SETTINGS_ID_FIELD'))
			  ->configurePrimary(true),
			(new StringField('VALUE',
							 [
								 'validation' => [__CLASS__, 'validateValue']
							 ]
			))->configureTitle(Loc::getMessage('QUESTION_QUESTION_SETTINGS_ENTITY_VALUE_FIELD')),

			(new Reference('QUESTION', QuestionTable::class, Join::on('this.QUESTION_ID', 'ref.ID'))),
			(new Reference('SETTINGS', QuestionSettingsTable::class, Join::on('this.SETTINGS_ID', 'ref.ID')))
		];
	}

	/**
	 * Returns validators for VALUE field.
	 *
	 * @return array
	 */
	public static function validateValue()
	{
		return [
			new LengthValidator(null, 30),
		];
	}
}