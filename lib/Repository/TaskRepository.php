<?php
namespace Up\Forms\Repository;

use Bitrix\Main\Loader;
use Up\Forms\Integration\Task;
use Up\Forms\Model\TaskTable;

Class TaskRepository
{
	public static function createTask(int $taskId, int $userId, int $creatorId, int $formId)
	{
		$task = TaskTable::createObject();
		$task->setTaskId($taskId);
		$task->setUserId($userId);
		$task->setCreatorId($creatorId);
		$task->setFormId($formId);
		$task->save();
	}

	public static function getByFormAndUserIds(int $userId, int $formId)
	{
		return TaskTable::query()
						->setSelect(['ID', 'USER_ID', 'CREATOR_ID', 'FORM_ID', 'TASK_ID'])
						->setFilter([
							'=USER_ID' => $userId,
							'=FORM_ID' => $formId,
									])
						->fetchAll();
	}

	public static function closeTask(int $userId, int $formId)
	{
		$task = TaskRepository::getByFormAndUserIds($userId, $formId);

		if (!empty($task))
		{
			Task::completeTask($task[0]['TASK_ID'], $task[0]['CREATOR_ID']);
			self::deleteTask($task[0]['ID']);
		}
	}
	public static function deleteTask(int $taskId)
	{
		$task = TaskTable::getByPrimary($taskId)->fetchObject();
		$task->delete();
	}
}


