<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Up\Forms\Repository\AnswerRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\QuestionRepository;
use Up\Forms\Repository\ResponseRepository;
use Up\Forms\Service\AccessManager;

class Response extends Controller
{
	public function deleteResponseAction($id)
	{
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			ResponseRepository::deleteResponse($id);
		}

	}

	public function deleteResponsesAction($ids)
	{
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			ResponseRepository::deleteResponses($ids);
		}
	}

	public function getAnswersByResponseIdAction($id, $limit, $offset)
	{
		if (AccessManager::checkAccessRights($this->getCurrentUser()->getId()))
		{
			$id = (int)$id;
			$filter = ['LIMIT' => (int)$limit, 'OFFSET' => (int)$offset];
			$result = ResponseRepository::getResponseWithAnswersById($id, $filter)->collectValues(recursive: true);
			return [
				'result' => $result,
			];
		}
	}
}
