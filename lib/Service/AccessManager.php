<?php
namespace Up\Forms\Service;


use Bitrix\Main\UserGroupTable;
use Up\Forms\Model\AcceptedUserTable;
use Up\Forms\Model\EO_AcceptedUser;

class AccessManager
{
	public static function checkAccessRights(int $userId): bool
	{
		if (self::isAdmin($userId))
		{
			return true;
		}
		$currentUser = AcceptedUserTable::getByPrimary($userId)->fetchObject();
		if ($currentUser === null)
		{
			return false;
		}
		return true;
	}

	public static function addAccessForUser(int $userId, int $adminId)
	{
		if (!self::isAdmin($adminId))
		{
			return false;
		}

		$user = AcceptedUserTable::createObject();
		$user->setId($userId);
		$user->save();
		return true;
	}

	public static function isAdmin(int $id)
	{
		$user = UserGroupTable::getByPrimary(['USER_ID' => $id, 'GROUP_ID' => 1])->fetchObject();

		if ($user === null)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	public static function removeAccessForUser(int $userId, int $adminId)
	{
		if (!self::isAdmin($adminId))
		{
			return false;
		}

		$user = AcceptedUserTable::getByPrimary($userId)->fetchObject();
		$user->delete();
		return true;
	}
}