<?php
namespace Up\Forms\Service;

use Bitrix\Main\UserTable;

class AnswerManager
{
	public static function prepareAnswersForGrid($answers, int $countOfItemsOnPage)
	{
		$rows = [];
		$userAnswers = [];

		foreach ($answers as $answer)
		{
			$userId = $answer->getUserId();
			$questionId = $answer->getQuestionId();
			$userAnswer = $answer->getAnswer();

			if (!isset($userAnswers[$userId]))
			{
				$userAnswers[$userId] = [];
			}

			$userAnswers[$userId][$questionId] = $userAnswer;
		}
		foreach ($userAnswers as $userId => $answers)
		{
			//TODO Убрать Получение пользователей из цикла
			$answers['USER'] = UserTable::getByPrimary(1)->fetchObject()->getName();
			$row = [
				'id' => (int)$userId,
				'columns' => $answers
			];
			$rows[] = $row;
		}
		if (count($rows) > $countOfItemsOnPage)
		{
			array_pop($rows);
		}

		return $rows;
	}
}