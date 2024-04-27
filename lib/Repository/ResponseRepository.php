<?php
namespace Up\Forms\Repository;

use Bitrix\Main\ORM\Query\Query;
use Bitrix\Main\ORM\Query\QueryHelper;
use Up\Forms\Model\AnswerTable;
use Up\Forms\Model\ResponseTable;
use Up\Forms\Model\SubanswerTable;

Class ResponseRepository
{
	public static function saveResponse($responseData)
	{

		global $USER;
		db()->lock('saveAnswer', 30);
		$try = self::getLastTry($responseData['FORM_ID']);
		$maxTry = FormRepository::getMaxNumberOfTry($responseData['FORM_ID']);
		if (!is_null($maxTry) && $try >= $maxTry)
		{
			return ['Все попытки потрачены'];
		}
		$response = ResponseTable::createObject();
		$response->setUserId($USER->GetID());
		$response->setFormId($responseData['FORM_ID']);
		$response->setTryNumber($try + 1);
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
		db()->unlock('saveAnswer');
		return  $result->getErrors();
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

	public static function getLastTry($formID)
	{
		global $USER;
		$try = ResponseTable::getList(['select' => ['LAST_TRY'],
									   'filter' => ['USER_ID' => $USER->GetID(),
										   			'FORM_ID' => $formID]]);
		return $try->fetchAll()[0]['LAST_TRY'];

	}
}
