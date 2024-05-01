<?php

namespace Up\Forms\Controller\Validator;

use Bitrix\Main\Error;

class FormCreateValidator
{
	public static function validateFormData(array $formData)
	{
		$errors = [];
		if ($formData['TITLE'] === '')
		{
			$errors[] = new Error('Название формы не может быть пустым');
		}
		foreach ($formData['CHAPTER'] as $chapterData)
		{
			self::validateChapterData($chapterData, $errors, \CUtil::JsObjectToPhp($formData['IS_FIRST_PAGE']));
			
		}
		foreach ($formData['SETTINGS'] as $settingsData)
		{
			self::validateFormSettingsData($settingsData, $errors);
		}
		return $errors;
	}

	private static function validateChapterData(array $chapterData, array &$errors, $isFirstPage)
	{
		if (empty($chapterData['QUESTION']) && $isFirstPage)
		{
			$errors[] = new Error('Нельзя создать форму без вопросов');
		}
		foreach ($chapterData['QUESTION'] as $questionData)
		{
			self::validateQuestionData($questionData, $errors);
		}
	}

	private static function validateQuestionData(array $questionData, array &$errors)
	{
		if ($questionData['TITLE'] === '')
		{
			$errors[] = new Error('Название вопроса не может быть пустым');
		}
		if (empty($questionData['OPTION']))
		{
			$errors[] = new Error('Нельзя создать вопрос с выбором без вариантов');
		}
		$isAtLeastOneSelected = false;
		foreach ($questionData['OPTION'] as $optionData)
		{
			self::validateOptionData($optionData, $errors, $questionData['FIELD_ID']);
			if (\CUtil::JsObjectToPhp($optionData['IS_RIGHT_ANSWER']))
			{
				$isAtLeastOneSelected = true;
			}
		}
		if (\CUtil::JsObjectToPhp($questionData['SETTINGS'][0]['VALUE']) && !$isAtLeastOneSelected)
		{
			$errors[] = new Error('Для тестовых вопросов хотя бы один вариант должен быть правильным');
		}
		
	}

	private static function validateOptionData(array $optionData, array &$errors, int $questionTypeId)
	{
		if ($optionData['TITLE'] === '' && $questionTypeId !== 1)
		{
			$errors[] = new Error('Название опции не может быть пустым');
		}
	}

	private static function validateFormSettingsData(array $settingsData, array &$errors)
	{
		$value = $settingsData['VALUE'];
		if (is_null($value))
		{
			return;
		}
		switch ((int) $settingsData['ID'])
		{
			case 1:
				if (\DateTime::createFromFormat('Y-m-d\TH:i', $value) === false)
				{
					$errors[] = new Error('Дата создания задана неверно');
				}
				break;
			case 2:
			{
				$date = \DateTime::createFromFormat('Y-m-d\TH:i', $value);
				if ($date === false)
				{
					$errors[] = new Error('Дата завершения задана неверно');
				}
				if ($date < new \DateTime())
				{
					$errors[] = new Error('Дата завершения теста не может быть раньше текущей даты');
				}
				break;
			}
			case 3:
			{
				if (!preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $value))
				{
					$errors[] = new Error('Таймер задан неверно');
				}
				if ($value === '00:00')
				{
					$errors[] = new Error('Таймер не может быть меньше минуты');
				}
				break;
			}
			case 4:
			{
				if ($value !== 'true' && $value !== 'false')
				{
					$errors[] = new Error('Что-то пошло не так');
				}
				break;
			}
			case 5:
			{
				if ((int) $value <= 0)
				{
					$errors[] = new Error('Количество попыток должно быть больше 0');
				}
				break;
			}
		}
	}
}
