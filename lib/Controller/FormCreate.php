<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;
use Up\Forms\Repository\FormRepository;

class FormCreate extends Controller
{
	public function saveFormDataAction($formData)
	{
		if ((int) $formData['ID'] === 0)
		{
			$result = [
				'result' => FormRepository::createForm($formData),
			];
		}
		else
		{
			$result = [
				'result' => FormRepository::saveForm($formData),
			];
		}

		if(Loader::includeModule('pull'))
		{
			\CPullWatch::AddToStack('FORMS-UPDATE', [
				'module_id' => 'forms',
				'command' => 'update',
				'params' => []
			]);
		}

		return $result;
	}

	public function getFormDataAction($id)
	{

		$id = (int) $id;
		return [
			'result' => FormRepository::getForm($id),
		];
	}
}