<?php
namespace Up\Forms\Repository;


use Up\Forms\Model\AnswerTable;

Class AnswerRepository
{
	public static function getAnswersByResponseId(int $responseId, array $filter)
	{
		return AnswerTable::query()
			->setSelect(['ID', 'QUESTION_ID', 'RESPONSE_ID', 'SUBANSWER'])
			->setFilter(['=RESPONSE_ID' => $responseId])
			->setLimit($filter['LIMIT'])
			->setOffset($filter['OFFSET'])
			->setOrder(['QUESTION_ID' => 'asc'])->fetchCollection();
	}
}