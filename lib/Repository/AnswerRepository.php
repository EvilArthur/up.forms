<?php
namespace Up\Forms\Repository;

use Up\Forms\Model\AnswerTable;

Class AnswerRepository
{
	public static function saveAnswers($answersData)
	{
		$answers = AnswerTable::createCollection();
		foreach ($answersData as $answerData)
		{
			$answer = AnswerTable::createObject();
			$answer->setAnswer($answerData['answer']);
			$answer->setQuestionId($answerData['id']);
			$answer->setUserId(1);
			$answers->add($answer);
		}
		return $answers->save()->getErrors();
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