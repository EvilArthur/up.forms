<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Service\AccessManager;

class Task extends Controller
{
	public function createFastTaskAction(string $formTitle, int $formId, int $userId)
	{
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			\Up\Forms\Integration\Task::createFastTask($formTitle, $formId, $userId);
		}
	}
}