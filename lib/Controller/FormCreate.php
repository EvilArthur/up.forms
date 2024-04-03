<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Repository\FormRepository;

class FormCreate extends Controller
{
	public function saveFormDataAction($formData)
	{
		return [
			'result' => FormRepository::saveForm($formData),
		];
	}

	public function getFormDataAction($id)
	{
		return [
			'result' => FormRepository::getForm($id),
		];
	}
}