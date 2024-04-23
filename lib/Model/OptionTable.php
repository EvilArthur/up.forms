<?php

namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\CascadePolicy;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Fields\StringField;
use Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Query\Join;

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
		return 'up_option';
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
				'TITLE', [
						   'validation' => [__CLASS__, 'validateValue'],
						   'title' => Loc::getMessage('OPTION_ENTITY_VALUE_FIELD'),
					   ]
			),
			new IntegerField(
				'QUESTION_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('OPTION_ENTITY_QUESTION_ID_FIELD'),
				]
			),
			(new StringField('IS_RIGHT_ANSWER',
							 [
								 'validation' => [__CLASS__, 'validateIsRightAnswer']
							 ]
			))->configureTitle(Loc::getMessage('OPTION_ENTITY_IS_RIGHT_ANSWER_FIELD'))
			->configureNullable(),

			(new Reference(
				'QUESTION',
				QuestionTable::class,
				Join::on('this.QUESTION_ID', 'ref.ID')
			)),
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

	/**
	 * Returns validators for IS_RIGHT_ANSWER field.
	 *
	 * @return array
	 */
	public static function validateIsRightAnswer()
	{
		return [
			new LengthValidator(null, 30),
		];
	}
}