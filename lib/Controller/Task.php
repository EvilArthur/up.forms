<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;


class Task extends Controller
{
	public function createFastTaskAction(string $formTitle, int $formId, int $userId)
	{
		\Up\Forms\Integration\Task::createFastTask($formTitle, $formId, $userId);
	}
}