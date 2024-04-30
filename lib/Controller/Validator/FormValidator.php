<?php

namespace Up\Forms\Controller\Validator;
use Bitrix\Main\Error;
use Up\Forms\Model\EO_Question;
use Up\Forms\Model\QuestionTable;

class FormValidator
{
	public static function validateAnswerData($answersData)
	{
		$questions = \Up\Forms\Repository\QuestionRepository::getQuestionsByChapterId((int) $answersData['CHAPTER_ID']);
		$isTimeUp = \CUtil::JsObjectToPhp($answersData['IS_TIME_UP']);
		$errors = [];
		foreach ($answersData['ANSWER'] as $answerData)
		{
			/** @var EO_Question $question */
			$question = $questions->getByPrimary((int) $answerData['ID']);
			if (!$question)
			{
				return [new Error('Что то пошло не так')];
			}

			$questionSettings = $question->getSettings();
			$isRequiredQuestion = \CUtil::JsObjectToPhp($questionSettings->getByPrimary(['QUESTION_ID' => $question->getId(), 'SETTINGS_ID' => 2])->getValue());
			if ($isRequiredQuestion && !$isTimeUp &&
				(empty($answerData['SUBANSWER']) || ($question->getFieldId() === 1 && $answerData['SUBANSWER'][0] === '')))
			{
				$errors[] = new Error('Вы не ответили на все обязательные вопросы');
			}

			foreach ($answerData['SUBANSWER'] as $subanswer)
			{
				if ($question->getFieldId() !== 1 && !in_array((int)$subanswer, $question->getOption()->getIdList()))
				{
					return [new Error('Что то пошло не так')];
				}
			}
		}
		return $errors;
	}
}