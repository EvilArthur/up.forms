<?php

use Bitrix\Main\Application;
use Bitrix\Main\DB\Connection;
use Bitrix\Main\Request;
use Up\Forms\Repository\TaskRepository;

AddEventHandler('tasks', 'OnTaskAdd', 'onAfterUpdate');

function onAfterUpdate(int $taskId, array $arFields)
{
	if (in_array('формы', $arFields['TAGS']) )
	{
		$pattern = '/\[URL=\/form\/view\/(\d+)\/]/';

		if (preg_match($pattern, $arFields['DESCRIPTION'], $matches))
		{
			TaskRepository::createTask(
				$taskId,
				$arFields['RESPONSIBLE_ID'],
				$arFields['CREATED_BY'],
				$matches[1]
			);
		}
	}
}

function request(): Request
{
return Application::getInstance()->getContext()->getRequest();
}

function db(): Connection
{
return Application::getConnection();
}

if (file_exists(__DIR__ . '/module_updater.php'))
{
include(__DIR__ . '/module_updater.php');
}

