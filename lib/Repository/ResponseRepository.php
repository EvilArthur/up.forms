<?php
namespace Up\Forms\Repository;

use Bitrix\Main\ORM\Query\Query;
use Bitrix\Main\ORM\Query\QueryHelper;
use Bitrix\Main\Type\DateTime;
use Up\Forms\Model\AnswerTable;
use Up\Forms\Model\EO_Response;
use Up\Forms\Model\EO_Response_Query;
use Up\Forms\Model\ResponseTable;
use Up\Forms\Model\SubanswerTable;

Class ResponseRepository
{
	public static function saveResponse(int $userId, array $responseData)
	{
		db()->lock('saveAnswer', 30);
		$response = self::getCurrentResponse($userId, $responseData['FORM_ID']);
		if(!$response)
		{
			return;
		}
		$response->fillAnswer()->fillSubanswer();
		foreach ($responseData['ANSWER'] as $answerData)
		{
			if ($answer = $response->getAnswer()->getByPrimary($answerData['ID']))
			{
				$answer->delete();
			}
			$response->addToAnswer(self::fillAnswerByData($answerData));
		}
		if (\CUtil::JsObjectToPhp($responseData['IS_COMPLETED']))
		{
			$response->setCompleted(true);
			$response->setCompletedTime(new DateTime());
		}
		$result = $response->save();

		db()->unlock('saveAnswer');
		return  $result->getErrors();
	}

	public static function createResponse(int $userId, int $formId)
	{
		db()->lock('createResponse', 30);
		$try = self::getLastTry($formId);
		$maxTry = FormRepository::getMaxNumberOfTry($formId);

		if (!is_null($maxTry) && $try >= $maxTry)
		{
			db()->unlock('creteResponse');
			return null;
		}
		if (!is_null(self::getCurrentResponse($userId, $formId)))
		{
			db()->unlock('creteResponse');
			return null;
		}
		$response = ResponseTable::createObject();
		$response->setUserId($userId);
		$response->setFormId($formId);
		$response->setTryNumber($try + 1);
		$response->setStartTime(new DateTime());
		$response->setCompleted(false);

		$response->save();
		db()->unlock('creteResponse');
		return $response;
	}

	public static function getResponsesByFormId(int $id, array $filter = null)
	{

		$query = new Query(ResponseTable::getEntity());
		$query->addSelect('ANSWER');
		$query->addSelect('USER_ID');
		$query->addSelect('ANSWER.SUBANSWER');
		$query->addSelect('ANSWER.QUESTION');
		$query->addSelect('ANSWER.QUESTION.OPTION');
		$query->addSelect('ANSWER.QUESTION.FIELD');
		$query->setFilter(
			[
				['=FORM_ID' => $id]
			]
		);
		$query->whereIn('USER_ID', $filter['USERS']);
		$query->setOrder($filter['SORT']);
		$query->setLimit($filter['LIMIT']);
		$query->setOffset($filter['OFFSET']);

		return QueryHelper::decompose($query, false, true);
	}

	public static function deleteResponse(int $id): void
	{
		$response = ResponseTable::getById($id)->fetchObject();
		$answers = $response->fillAnswer()->fillSubanswer();

		$response->delete();
	}

	public static function deleteResponses(array $ids): void
	{
		foreach ($ids as $id)
		{
			self::deleteResponse($id);
		}
	}

	public static function getLastTry($formId): ?int
	{
		global $USER;
		$try = ResponseTable::getList(['select' => ['LAST_TRY'],
									   'filter' => ['USER_ID' => $USER->GetID(),
										   			'FORM_ID' => $formId]]);

		$try = $try->fetchAll()[0]['LAST_TRY'];
		if (is_null($try))
		{
			$try = 0;
		}
		return $try;
	}

	public static function getCurrentResponse(int $userId, int $formId): ?EO_Response
	{
		$response = ResponseTable::query()
								 ->setSelect(['ID', 'FORM_ID', 'USER_ID', 'TRY_NUMBER', 'START_TIME', 'COMPLETED_TIME'])
								 ->setFilter(['COMPLETED' => 0, 'USER_ID' => $userId, 'FORM_ID' => $formId])
								 ->fetchObject();
		return $response;
	}

	private static function fillAnswerByData(array $answerData)
	{
		$answer = AnswerTable::createObject();
		$answer->setQuestionId($answerData['ID']);
		foreach ($answerData['SUBANSWER'] as $subanswerData)
		{
			$subanswer = SubanswerTable::createObject();
			$subanswer->setValue($subanswerData);
			$answer->addToSubanswer($subanswer);
		}
		return $answer;
	}
}
