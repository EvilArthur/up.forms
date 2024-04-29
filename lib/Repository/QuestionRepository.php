<?php
namespace Up\Forms\Repository;

use Bitrix\Main\ORM\Query\QueryHelper;
use Up\Forms\Model\QuestionTable;

Class QuestionRepository
{
	public static function getQuestionsByChapterId(int $chapterId, $filter = null)
	{
		if($filter === null)
		{
			return QueryHelper::decompose
			(
				QuestionTable::query()
							 ->setSelect(['ID', 'CHAPTER_ID', 'FIELD_ID', 'POSITION', 'TITLE', 'DESCRIPTION','OPTION', 'SETTINGS'])
							 ->setFilter([['=CHAPTER_ID' => $chapterId]])
							 ->setOrder(['POSITION' => 'asc']),
				false
			);
		}
		else
		{
			return QueryHelper::decompose
			(
				QuestionTable::query()
							 ->setSelect(['ID', 'CHAPTER_ID', 'FIELD_ID', 'POSITION', 'TITLE', 'DESCRIPTION', 'OPTION', 'SETTINGS'])
							 ->setFilter([['=CHAPTER_ID' => $chapterId]])
							 ->setOrder(['POSITION' => 'asc'])
							 ->setLimit($filter['LIMIT'])
							 ->setOffset($filter['OFFSET']),
			false
			);
		}
	}
}