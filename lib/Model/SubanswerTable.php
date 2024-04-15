<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Fields\TextField;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class AnswerTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> ANSWER_ID int mandatory
 * <li> VALUE text optional
 * </ul>
 *
 * @package Up\Forms\Model;
 **/

class SubanswerTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_sub_answer';
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
					'title' => Loc::getMessage('ANSWER_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'ANSWER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('ANSWER_ENTITY_ANSWER_ID_FIELD'),
				]
			),
			new TextField(
				'VALUE',
				[
					'title' => Loc::getMessage('ANSWER_ENTITY_VALUE_FIELD'),
				]
			),
			new Reference(
				'answer',
				AnswerTable::class,
				Join::on('this.ANSWER_ID', 'ref.ID')
			),
		];
	}
}
