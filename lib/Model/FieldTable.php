<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\Validators\LengthValidator;

/**
 * Class FieldTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> Title string(100) optional
 * </ul>
 *
 * @package Up\Forms\Model
 **/

class FieldTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_field';
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
					'title' => Loc::getMessage('FIELD_ENTITY_ID_FIELD'),

				]
			),
			new StringField(
				'TITLE',
				[
					'validation' => function()
					{
						return[
							new LengthValidator(null, 100),
						];
					},
					'title' => Loc::getMessage('FIELD_ENTITY_TITLE_FIELD'),
				]
			),
			(new OneToMany(
				'question', QuestionTable::class, 'field'
			)),
		];
	}
}