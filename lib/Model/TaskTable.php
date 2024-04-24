<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class TaskTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> USER_ID int mandatory
 * <li> FORM_ID int mandatory
 * <li> TASK_ID int mandatory
 * <li> CREATOR_ID int mandatory
 * </ul>
 *
 * @package Up\Forms\Model
 **/

class TaskTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_task';
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
					'title' => Loc::getMessage('TASK_ENTITY_ID_FIELD'),
				]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('TASK_ENTITY_USER_ID_FIELD'),
				]
			),
			new IntegerField(
				'FORM_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('TASK_ENTITY_FORM_ID_FIELD'),
				]
			),
			new IntegerField(
				'TASK_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('TASK_ENTITY_TASK_ID_FIELD'),
				]
			),
			new IntegerField(
				'CREATOR_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('TASK_ENTITY_CREATOR_ID_FIELD'),
				]
			),
			new Reference(
				'TASKS',
				FormTable::class,
				Join::on('this.FORM_ID', 'ref.ID')
			),
		];
	}
}