<?php

namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\CascadePolicy;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\Validators\LengthValidator;

Loc::loadMessages(__FILE__);

/**
 * Class OptionTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> Value string(100) optional
 * </ul>
 *
 * @package Bitrix\Option
 **/
class OptionTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'Up_Option';
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
				'ID', [
						'primary' => true,
						'autocomplete' => true,
						'title' => Loc::getMessage('OPTION_ENTITY_ID_FIELD'),
					]
			),
			new StringField(
				'Value', [
						   'validation' => [__CLASS__, 'validateValue'],
						   'title' => Loc::getMessage('OPTION_ENTITY_VALUE_FIELD'),
					   ]
			),
			(new ManyToMany('Question', QuestionTable::class))
				->configureTableName('Up_Question_Option')
				->configureLocalPrimary('ID', 'Option_ID')
				->configureLocalReference('Options')
				->configureRemotePrimary('ID', 'Question_ID')
				->configureRemoteReference('Question')
				->configureCascadeDeletePolicy(CascadePolicy::FOLLOW)
		];
	}

	/**
	 * Returns validators for Value field.
	 *
	 * @return array
	 */
	public static function validateValue()
	{
		return [
			new LengthValidator(null, 100),
		];
	}
}