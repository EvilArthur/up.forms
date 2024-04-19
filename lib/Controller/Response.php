<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\ResponseRepository;

class Response extends Controller
{
	public function deleteResponseAction($id)
	{
		ResponseRepository::deleteResponse($id);
	}

	public function deleteResponsesAction($ids)
	{
		ResponseRepository::deleteResponses($ids);
	}
}
