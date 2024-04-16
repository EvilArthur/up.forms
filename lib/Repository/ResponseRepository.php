<?php
namespace Up\Forms\Repository;

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

	public static function getAnswersByFormId(int $id, array $filter = null)
	{
		// if ($filter === null)
		// {
		// 	// $a =  FormTable::query()
		// 	// 	->addSelect(['*', 'Chapter'])
		// 	// 	->addSelect(['*', 'Question'])->exec();
		// 	// $b = 0;
		//
		// }
		return FormTable::getByPrimary($id)->fetchObject()->fillChapter()->fillQuestion()->fillAnswer();
	}
}

/*
[
    {
		"id": 32,
        "answer": "123"
    },
    {
		"id": 33,
        "answer": "321"
    },
    {
		"id": 34,
        "answer": "14"
    }
]*/