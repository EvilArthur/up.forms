<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class SettingsTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> TITLE string(30) optional
 * <li> TYPE_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Form
 **/

class FormSettingsTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_form_settings';
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
			))->configureTitle(Loc::getMessage('SETTINGS_ENTITY_ID_FIELD'))
			  ->configurePrimary(true)
			  ->configureAutocomplete(true),
			(new StringField('TITLE',
							 [
								 'validation' => [__CLASS__, 'validateTitle']
							 ]
			))->configureTitle(Loc::getMessage('SETTINGS_ENTITY_TITLE_FIELD')),
			(new IntegerField('TYPE_ID',
							  []
			))->configureTitle(Loc::getMessage('SETTINGS_ENTITY_TYPE_ID_FIELD'))
			  ->configureRequired(true),
			(new OneToMany('FORM', FormFormSettingsTable::class, 'SETTINGS')),
			(new Reference('TYPE', FormSettingsTypeTable::class, Join::on('this.TYPE_ID', 'ref.ID'))),
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