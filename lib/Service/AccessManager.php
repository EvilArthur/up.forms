<?php
namespace Up\Forms\Service;


use Up\Forms\Model\AcceptedUserTable;

class AccessManager
{
	public static function checkAccessRights(int $userId)
	{
		$currentUser = AcceptedUserTable::getByPrimary($userId)->fetchObject();
		if ($currentUser === null)
		{
			return false;
		}
		return true;
 	}
}