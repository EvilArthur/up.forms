<?php
namespace Up\Forms\Repository;



use Bitrix\Main\ORM\Query\QueryHelper;
use Up\Forms\Model\OptionTable;


Class OptionRepository
{
	public static function getOptionsByQuestionId(int $questionId)
	{
		return QueryHelper::decompose
		(
			OptionTable::query()
						 ->setFilter([['=QUESTION_ID' => $questionId]])
						 ->setOrder(['ID' => 'asc']),
			false
		);
	}
}