<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\CascadePolicy;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\TextField;
use Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class ChapterTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> Form_ID int mandatory
 * <li> Title string(100) optional
 * <li> Description text optional
 * </ul>
 *
 * @package Up\Forms\Model
 **/

class ChapterTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'Up_Chapter';
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
					'title' => Loc::getMessage('CHAPTER_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'Form_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('CHAPTER_ENTITY_FORM_ID_FIELD'),
				]
			),
			new Reference(
				'Form',
				FormTable::class,
				Join::on('this.Form_ID', 'ref.ID')
			),
			new StringField(
				'Title',
				[
					'validation' => function()
					{
						return[
							new LengthValidator(null, 100),
						];
					},
					'title' => Loc::getMessage('CHAPTER_ENTITY_TITLE_FIELD'),
				]
			),
			new TextField(
				'Description',
				[
					'title' => Loc::getMessage('CHAPTER_ENTITY_DESCRIPTION_FIELD'),
				]
			),
			(new OneToMany(
				'Question', QuestionTable::class, 'Chapter'
			))->configureCascadeDeletePolicy(CascadePolicy::FOLLOW),
		];
	}
}