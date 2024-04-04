<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Repository\FormRepository;

class FormCreate extends Controller
{
	public function saveFormDataAction($formData)
	{
		if ((int) $formData['ID'] === 0)
		{
			return [
				'result' => FormRepository::createForm($formData),
			];
		}
		return [
			'result' => FormRepository::saveForm($formData),
		];
	}

	public function getFormDataAction($id)
	{
		$id = (int) $id;
		return [
			'result' => FormRepository::getForm($id),
		];
	}
}