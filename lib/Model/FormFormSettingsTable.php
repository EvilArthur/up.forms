<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class FormSettingsTable
 *
 * Fields:
 * <ul>
 * <li> FORM_ID int mandatory
 * <li> SETTINGS_ID int mandatory
 * <li> VALUE string(30) optional
 * </ul>
 *
 * @package Bitrix\Form
 **/

class FormFormSettingsTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_form_form_settings';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			(new IntegerField('FORM_ID',
							  []
			))->configureTitle(Loc::getMessage('FORM_FORM_SETTINGS_ENTITY_FORM_ID_FIELD'))
			  ->configurePrimary(true),
			(new IntegerField('SETTINGS_ID',
							  []
			))->configureTitle(Loc::getMessage('FORM_FORM_SETTINGS_ENTITY_SETTINGS_ID_FIELD'))
			  ->configurePrimary(true),
			(new StringField('VALUE',
							 [
								 'validation' => [__CLASS__, 'validateValue']
							 ]
			))->configureTitle(Loc::getMessage('FORM_FORM_SETTINGS_ENTITY_VALUE_FIELD'))
			->configureNullable(),
			(new Reference('FORM', FormTable::class, Join::on('this.FORM_ID', 'ref.ID'))),
			(new Reference('SETTINGS', FormSettingsTable::class, Join::on('this.SETTINGS_ID', 'ref.ID')))
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