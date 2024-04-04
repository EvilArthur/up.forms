<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Repository\AnswerRepository;
use Up\Forms\Repository\FormRepository;

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
		FormRepository::deleteForm($id);
	}

	public function saveAnswersAction($answers)
	{
		return
		[
			'result' => AnswerRepository::saveAnswers($answers)
		];

	}
}
