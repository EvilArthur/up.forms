<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class AnswerTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> Question_ID int mandatory
 * <li> User_ID int mandatory
 * <li> Answer string(100) optional
 * </ul>
 *
 * @package Bitrix\Answer
 **/

class AnswerTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'Up_Answer';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			new IntegerField(
				'ID',
				[
					'primary' => true,
					'autocomplete' => true,
					'title' => Loc::getMessage('ANSWER_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'Question_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('ANSWER_ENTITY_QUESTION_ID_FIELD'),
				]
			),
			new Reference(
				'Question',
				QuestionTable::class,
				Join::on('this.Question_ID', 'ref.ID')
			),
			new IntegerField(
				'User_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('ANSWER_ENTITY_USER_ID_FIELD'),
				]
			),
			new StringField(
				'Answer',
				[
					'validation' => function()
					{
						return[
							new LengthValidator(null, 100),
						];
					},
					'title' => Loc::getMessage('ANSWER_ENTITY_ANSWER_FIELD'),
				]
			),
		];
	}
}