<?php

namespace Up\Forms\Controller;

use Bitrix\Bizproc\Error;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;

use Up\Forms\Controller\Validator\FormValidator;
use Up\Forms\Repository\ResponseRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\TaskRepository;

class Form extends Controller
{
	public function getListAction(): array
	{
		return [
			'formList' => FormRepository::getForms(),
		];
	}

	public function deleteFormAction(int $id): void
	{
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::AddToStack('FORMS-UPDATE', [
				'module_id' => 'forms',
				'command' => 'update',
				'params' => []
			]);
		}
		FormRepository::deleteForm($id);
	}

	public function deleteFormsAction(array $ids): void
	{
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::AddToStack('FORMS-UPDATE', [
				'module_id' => 'forms',
				'command' => 'update',
				'params' => []
			]);
		}
		FormRepository::deleteForms($ids);
	}

	public function saveAnswersAction(array $answers): ?array
	{
		if ($errors = FormValidator::validateAnswerData($answers))
		{
			foreach ($errors as $error)
			{
				$this->addError($error);
			}
			return null;
		}
		TaskRepository::closeTask($this->getCurrentUser()->getId(), $answers['FORM_ID']);
		return
		[
			'result' => ResponseRepository::saveResponse($this->getCurrentUser()->getId(), $answers)
		];
	}

	public function createResponseAction(int $formId): ?array
	{
		$response = ResponseRepository::createResponse($this->getCurrentUser()->getId(), $formId)->getStartTime()->getTimestamp();
		if (!$response)
		{
			$this->addError(new Error('Что-то пошло не так'));
			return null;
		}
		return
		[
			'startTime' => $response
		];
	}
}
