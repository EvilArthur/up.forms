<?php
namespace Up\Forms\Repository;

use Bitrix\Lists\Api\Response\Response;
use Bitrix\Main\ORM\Query\Query;

use Bitrix\Main\ORM\Query\QueryHelper;
use Up\Forms\Model\AnswerTable;
use Up\Forms\Model\FormTable;
use Up\Forms\Model\ResponseTable;
use Up\Forms\Model\SubanswerTable;

Class ResponseRepository
{
	public static function saveResponse($responseData)
	{
		global $USER;
		$response = ResponseTable::createObject();
		$response->setUserId($USER->GetID());
		$response->setFormId($responseData['FORM_ID']);
		$response->setTryNumber($responseData['TRY_NUMBER']);
		foreach ($responseData['ANSWER'] as $answerData)
		{
			$answer = AnswerTable::createObject();
			$answer->setQuestionId($answerData['ID']);
			foreach ($answerData['SUBANSWER'] as $subanswerData)
			{
				$subanswer = SubanswerTable::createObject();
				$subanswer->setValue($subanswerData);
				$answer->addToSubanswer($subanswer);
			}
			$response->addToAnswer($answer);
		}
		$result = $response->save();
		return  $result->getErrors();
	}

	public static function getResponsesByFormId(int $id, array $filter = null)
	{

		$query = new Query(ResponseTable::getEntity());
		$query->addSelect('ANSWER');
		$query->addSelect('USER_ID');
		$query->addSelect('ANSWER.SUBANSWER');
		$query->setFilter(
			[
				['=FORM_ID' => $id]
			]
		);
		$query->whereIn('USER_ID', $filter['USERS']);
		$query->setLimit($filter['LIMIT']);
		$query->setOffset($filter['OFFSET']);

		return QueryHelper::decompose($query);
	}

	public static function deleteResponse(int $id)
	{
		$response = ResponseTable::getById($id)->fetchObject();
		$answers = $response->fillAnswer()->fillSubanswer();

		$response->delete();
	}

	public static function deleteResponses(array $ids)
	{
		foreach ($ids as $id)
		{
			self::deleteResponse($id);
		}
	}
}
