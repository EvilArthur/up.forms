<?php

use Bitrix\Main\UserTable;
use Up\Forms\Model\FormTable;
use Up\Forms\Repository\AnswerRepository;

class FormResultsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchFormColumns();
		$this->fetchFormRows();
		$this->includeComponentTemplate();
	}

	protected function fetchFormColumns()
	{
		$columns[] = ['id' => 'USER', 'name' => 'Пользователь', 'default' => true];
		$questions = FormTable::getByPrimary($this->arParams['ID'])->fetchObject()->fillChapter()->fillQuestion();

		foreach ($questions as $question)
		{
			$columns[] = [
				'id' => $question->getId(),
				'name' => $question->getTitle(),
				'default' => true
			];
		}

		$this->arResult['COLUMNS'] = $columns;
	}

	protected function fetchFormRows()
	{
		$answers = AnswerRepository::getAnswersByFormId($this->arParams['ID']);
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
			$answers['USER'] = UserTable::getByPrimary(1)->fetchObject()->getName();
			$row = [
				'id' => (int)$userId,
				'columns' => $answers
			];
			$rows[] = $row;
		}

		$this->arResult['ROWS'] = $rows;
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['ID'] = (int) $arParams['ID'];
		if ($arParams['ID'] <= 0)
		{
			$response = new \Bitrix\Main\Engine\Response\Redirect('404');
			$response->setStatus('404');
		}
		return $arParams;
	}

}