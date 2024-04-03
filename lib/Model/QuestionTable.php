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
 * Class QuestionTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> Form_ID int mandatory
 * <li> Field_ID int mandatory
 * <li> Position int mandatory
 * <li> Title string(300) optional
 * </ul>
 *
 * @package Up\Forms\Model
 **/

class QuestionTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'UP_Question';
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
					'title' => Loc::getMessage('QUESTION_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'Chapter_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('QUESTION_ENTITY_CHAPTER_ID_FIELD'),
				]
			),
			new Reference(
				'Chapter',
				ChapterTable::class,
				Join::on('this.Chapter_ID', 'ref.ID')
			),
			new IntegerField(
				'Field_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('QUESTION_ENTITY_FIELD_ID_FIELD'),
				]
			),
			new Reference(
				'Field',
				FieldTable::class,
				Join::on('this.Field_ID', 'ref.ID')
			),
			new IntegerField(
				'Position',
				[
					'required' => true,
					'title' => Loc::getMessage('QUESTION_ENTITY_POSITION_FIELD'),
				]
			),
			new StringField(
				'Title',
				[
					'validation' => function()
					{
						return[
							new LengthValidator(null, 300),
						];
					},
					'title' => Loc::getMessage('QUESTION_ENTITY_TITLE_FIELD'),
				]
			),
		];
	}
}