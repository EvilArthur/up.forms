<?php
namespace Up\Forms\Model;

use Bitrix\Main\Entity\ExpressionField;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\DatetimeField;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\CascadePolicy;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class ResponseTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> FORM_ID int mandatory
 * <li> USER_ID int mandatory
 * <li> TRY_NUMBER int mandatory
 * </ul>
 *
 * @package Up\Forms\Model;
 **/

class ResponseTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_response';
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
					'title' => Loc::getMessage('RESPONSE_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'FORM_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('RESPONSE_ENTITY_FORM_ID_FIELD'),
				]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('RESPONSE_ENTITY_USER_ID_FIELD'),
				]
			),
			new IntegerField(
				'TRY_NUMBER',
				[
					'required' => true,
					'title' => Loc::getMessage('RESPONSE_ENTITY_TRY_NUMBER_FIELD'),
				]
			),
			(new IntegerField('COMPLETED',
							  []
			))->configureTitle(Loc::getMessage('RESPONSE_ENTITY_COMPLETED_FIELD')),
			(new DatetimeField('START_TIME',
							   []
			))->configureTitle(Loc::getMessage('RESPONSE_ENTITY_START_TIME_FIELD')),
			(new DatetimeField('COMPLETED_TIME',
							   []
			))->configureTitle(Loc::getMessage('RESPONSE_ENTITY_COMPLETED_TIME_FIELD')),

			new Reference(
				'FORM',
				FormTable::class,
				Join::on('this.FORM_ID', 'ref.ID')
			),
			(new OneToMany(
				'ANSWER', AnswerTable::class, 'RESPONSE'
			))->configureCascadeDeletePolicy(CascadePolicy::FOLLOW),

			(new ExpressionField('LAST_TRY', 'MAX(%s)', ['TRY_NUMBER']))
		];
	}
}