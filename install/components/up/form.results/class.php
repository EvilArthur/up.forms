<?php

use Up\Forms\Model\FormTable;

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
		$answers = FormTable::getByPrimary($this->arParams['ID'])->fetchObject()->fillChapter()->fillQuestion()->fillAnswer();

		$rows = [];
		$userAnswers = [];

		foreach ($answers as $answer)
		{
			$userId = $answer->getUserId();
			$questionId = $answer->getQuestionId();
			$userAnswer = $answer->getAnswer();

			// Если ответы для данного пользователя еще не собраны, создаем запись в массиве
			if (!isset($userAnswers[$userId]))
			{
				$userAnswers[$userId] = [];
			}

			// Добавляем ответ в массив ответов для данного пользователя
			$userAnswers[$userId][$questionId] = $userAnswer;
		}

		// Преобразуем массив ответов пользователей в желаемый формат $rows
		foreach ($userAnswers as $userId => $answers) {
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