<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;

use Up\Forms\Repository\ResponseRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\TaskRepository;

class Form extends Controller
{
	public function getListAction()
	{
		return [
			'formList' => FormRepository::getForms(),
		];
	}

	public function deleteFormAction($id)
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

	public function deleteFormsAction($ids)
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

	public function saveAnswersAction($answers)
	{
		TaskRepository::closeTask($this->getCurrentUser()->getId(), $answers['FORM_ID']);
		return
		[
			'result' => ResponseRepository::saveResponse($answers)
		];
	}
}
