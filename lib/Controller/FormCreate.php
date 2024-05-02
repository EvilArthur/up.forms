<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;
use Up\Forms\Controller\Validator\FormCreateValidator;
use Up\Forms\Repository\FieldRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\FormSettingsRepository;
use Up\Forms\Repository\QuestionRepository;

class FormCreate extends Controller
{
	public function saveFormDataAction($formData)
	{
		if ($errors = FormCreateValidator::validateFormData($formData))
		{
			foreach ($errors as $error)
			{
				$this->addError($error);
			}

			return null;
		}

		$userId = $this->getCurrentUser()->getId();

		if ((int)$formData['ID'] === 0)
		{
			$result = FormRepository::createForm($formData, $userId);
		}
		else
		{
			$result = [
				'ID' => FormRepository::saveForm($formData, $userId),
			];
		}

		if (Loader::includeModule('pull'))
		{
			\CPullWatch::AddToStack('FORMS-UPDATE', [
				'module_id' => 'forms',
				'command' => 'update',
				'params' => [],
			]);
		}

		return $result;
	}

	public function getFormDataAction($id, $responseId, $limit = 0, $offset = 0)
	{
		$id = (int)$id;
		$limit = (int)$limit;
		$offset = (int)$offset;

		if ($limit === 0 & $offset === 0)
		{
			$filter = null;
		}
		else
		{
			$filter = [
				'LIMIT' => $limit,
				'OFFSET' => $offset,
				'RESPONSE_ID' => $responseId
			];
		}

		$formData = FormRepository::getForm($id, $filter)->collectValues(recursive: true);
		$formData = $this->xssEscape($formData);

		return [
			'result' => $formData,
		];
	}

	public function getFieldDataAction()
	{
		return [
			'result' => FieldRepository::getFields(),
		];
	}

	public function getSettingsDataAction()
	{
		return [
			'result' => FormSettingsRepository::getSettings(),
		];
	}

	public function getQuestionDataAction(int $id, int $limit, int $offset)
	{
		$questionCollection = QuestionRepository::getQuestionsByChapterId($id, ['LIMIT' => $limit, 'OFFSET' => $offset, 'RESPONSE_ID' => false]);
		$questionsData = [];
		foreach ($questionCollection as $question)
		{
			$questionsData[] = $question->collectValues(recursive: true);
		}

		return [
			'result' => $questionsData,
		];
	}

	public function deleteQuestionAction(int $id)
	{
		return ['result' => QuestionRepository::deleteQuestion($id)];
	}

	private function xssEscape(array $rawData)
	{
		foreach ($rawData as $key => $data)
		{
			if (is_array($data))
			{
				$rawData[$key] = $this->xssEscape($data);
				continue;
			}
			$rawData[$key] = htmlspecialcharsbx($data);
		}

		return $rawData;
	}
}