<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\UserRepository;
use Up\Forms\Service\AccessManager;

class User extends Controller
{
	public function getAllUsersAction()
	{
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			return [
				'result' => UserRepository::getAllUsers(),
			];
		}
	}

	public function getAcceptedUsersAction()
	{
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			return [
				'result' => UserRepository::getAcceptedUsers(),
			];
		}
	}

	public function addAccessForUserAction(int $userId)
	{
		AccessManager::addAccessForUser($userId, $this->getCurrentUser()->getId());
	}

	public function removeAccessForUserAction(int $userId)
	{
		AccessManager::removeAccessForUser($userId, $this->getCurrentUser()->getId());
	}
}