<?php
namespace Up\Forms\Model;

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ORM\Data\DataManager;
use Bitrix\Main\ORM\Fields\IntegerField;

/**
 * Class UserTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * </ul>
 *
 * @package Up\Forms\Model;
 **/

class AcceptedUserTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_accepted_user';
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
					'title' => Loc::getMessage('USER_ENTITY_ID_FIELD'),
				]
			),
		];
	}
}