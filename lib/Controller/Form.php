<?php

namespace Up\Forms\Controller;

use Bitrix\Bizproc\Error;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;

use Up\Forms\Controller\Validator\FormValidator;
use Up\Forms\Repository\ResponseRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\TaskRepository;
use Up\Forms\Service\AccessManager;

class Form extends Controller
{
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
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			FormRepository::deleteForm($id);
		}
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
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			FormRepository::deleteForms($ids);
		}
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

		if (\CUtil::JsObjectToPhp($answers['IS_COMPLETED']))
		{
			TaskRepository::closeTask($this->getCurrentUser()->getId(), $answers['FORM_ID']);
		}
		$result = ResponseRepository::saveResponse($this->getCurrentUser()->getId(), $answers);
		if (Loader::includeModule('pull'))
		{
			\CPullWatch::AddToStack('FORM-COMPLETED', [
				'module_id' => 'forms',
				'command' => 'update',
				'params' => ['id' =>  $answers['FORM_ID']],
			]);
		}
		return
		[
			'result' => $result
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
