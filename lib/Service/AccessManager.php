<?php
namespace Up\Forms\Service;


use Up\Forms\Model\AcceptedUserTable;
use Up\Forms\Model\EO_AcceptedUser;

class AccessManager
{
	public static function checkAccessRights(int $userId): bool
	{
		$currentUser = AcceptedUserTable::getByPrimary($userId)->fetchObject();
		if ($currentUser === null)
		{
			return false;
		}
		return true;
	}

	public static function addAccessForUser(int $userId, int $adminId)
	{
		if (!self::checkAccessRights($adminId))
		{
			return false;
		}

		$user = AcceptedUserTable::createObject();
		$user->setId($userId);
		$user->save();
		return true;
	}

	public static function removeAccessForUser(int $userId, int $adminId)
	{
		if (!self::checkAccessRights($adminId))
		{
			return false;
		}

		$user = AcceptedUserTable::getByPrimary($userId)->fetchObject();
		$user->delete();
		return true;
	}
}