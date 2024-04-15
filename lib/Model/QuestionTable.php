<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\CascadePolicy;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\TextField;
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
		return 'up_question';
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
				'CHAPTER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('QUESTION_ENTITY_CHAPTER_ID_FIELD'),
				]
			),
			new IntegerField(
				'FIELD_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('QUESTION_ENTITY_FIELD_ID_FIELD'),
				]
			),
			new IntegerField(
				'POSITION',
				[
					'required' => true,
					'title' => Loc::getMessage('QUESTION_ENTITY_POSITION_FIELD'),
				]
			),
			new StringField(
				'TITLE',
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
			new TextField(
				'DESCRIPTION',
				[
					'title' => Loc::getMessage('CHAPTER_ENTITY_DESCRIPTION_FIELD'),
				]
			),
			new Reference(
				'field',
				FieldTable::class,
				Join::on('this.FIELD_ID', 'ref.ID')
			),
			(new Reference(
				'chapter',
				ChapterTable::class,
				Join::on('this.CHAPTER_ID', 'ref.ID')
			)),

			(new OneToMany(
				'answer', AnswerTable::class, 'question'
			))->configureCascadeDeletePolicy(CascadePolicy::FOLLOW),

			(new ManyToMany('options', OptionTable::class))
				->configureTableName('up_question_option')
				->configureLocalPrimary('ID', 'QUESTION_ID')
				->configureLocalReference('question')
				->configureRemotePrimary('ID', 'OPTION_ID')
				->configureRemoteReference('options')

				->configureCascadeDeletePolicy(CascadePolicy::FOLLOW_ORPHANS)
		];
	}
}