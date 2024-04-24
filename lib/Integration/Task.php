<?php
namespace Up\Forms\Integration;


use Bitrix\Main\Loader;

class Task
{
	public static function completeTask(int $taskId, int $userId)
	{
		if(Loader::includeModule('tasks'))
		{
			$oTask = \CTaskItem::getInstance($taskId, $userId);
			$oTask->complete();
		}
	}

	public static function createFastTask(string $formTitle, int $formId, int $userId)
	{
		if(Loader::includeModule('tasks'))
		{
			$fields =
				[
					'TITLE' => 'Пройти форму - ' . $formTitle,
					'DESCRIPTION' => '[URL=/form/view/' . $formId . '/]Форма доступна по ссылке[/URL]',
					'TAGS' => ['формы'],
					'RESPONSIBLE_ID' => $userId,
				];
			\CTaskItem::add($fields, $userId);
		}
	}
}