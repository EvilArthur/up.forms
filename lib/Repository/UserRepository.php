<?php
namespace Up\Forms\Repository;

use Bitrix\Main\UserTable;
use Up\Forms\Model\AcceptedUserTable;

Class UserRepository
{
	public static function getAllUsers()
	{
		return UserTable::query()->setSelect(['ID', 'NAME', 'LAST_NAME', 'LOGIN'])->fetchAll();
	}

	public static function getAcceptedUsers()
	{
		return AcceptedUserTable::query()->setSelect(['ID'])->fetchAll();

	}
}