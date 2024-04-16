<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\CascadePolicy;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\Validators\LengthValidator;

/**
 * Class FormTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> Creator_ID int mandatory
 * <li> Title string(100) optional
 * </ul>
 *
 * @package Up\Forms\Model
 **/

class FormTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_form';
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
					'title' => Loc::getMessage('FORM_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'CREATOR_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('FORM_ENTITY_CREATOR_ID_FIELD'),
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
					'title' => Loc::getMessage('FORM_ENTITY_TITLE_FIELD'),
				]
			),
			(new OneToMany(
				'CHAPTER', ChapterTable::class, 'FORM'
			))
				->configureCascadeDeletePolicy(CascadePolicy::FOLLOW),
			(new OneToMany(
				'RESPONSE', ResponseTable::class, 'FORM'
			))
				->configureCascadeDeletePolicy(CascadePolicy::FOLLOW),
		];
	}
}