<?php
namespace Up\Forms\Repository;

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
		$response = ResponseTable::createObject();
		$response->setUserId($responseData['USER_ID']);
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
		$query->addSelect('ANSWER.SUBANSWER');
		$query->setFilter(['=FORM_ID' => $id]);
		$query->setLimit($filter['LIMIT']);
		$query->setOffset($filter['OFFSET']);
		$result = QueryHelper::decompose($query);

		// $form = FormTable::getByPrimary(
		// 	$id,
		// 	[
		// 		'select' =>
		// 			[
		// 				'TITLE',
		// 				'RESPONSE',
		// 				'RESPONSE.ANSWER',
		// 				'RESPONSE.ANSWER.SUBANSWER'
		// 			],
		//
		//
		// 	]
		// )->fetchObject()->collectValues(recursive: true);

		return $result;
	}
}
