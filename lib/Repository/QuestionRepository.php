<?php
namespace Up\Forms\Repository;

use Bitrix\Main\ORM\Query\QueryHelper;
use Up\Forms\Model\ChapterTable;
use Up\Forms\Model\EO_Question_Collection;
use Up\Forms\Model\FormTable;
use Up\Forms\Model\QuestionTable;

Class QuestionRepository
{
	public static function getQuestionsByFormId(int $formId)
	{
		$chapters = QueryHelper::decompose(
			ChapterTable::query()
						->setSelect(['ID', 'FORM_ID', 'QUESTION', 'QUESTION.OPTION', 'QUESTION.FIELD_ID'])
						->setFilter([['=FORM_ID' => $formId]])
		);
		foreach ($chapters as $chapter)
		{
			return $chapter->getQuestion();
		}
	}

	public static function getQuestionsByChapterId(int $chapterId, $filter = null)
	{
		if (is_numeric($filter['RESPONSE_ID']))
		{
			$selectFields = ['ID', 'CHAPTER_ID', 'FIELD_ID', 'POSITION', 'TITLE', 'DESCRIPTION', 'OPTION', 'SETTINGS', 'ANSWER', 'ANSWER.SUBANSWER'];
			$selectedFilter = [['=CHAPTER_ID' => $chapterId], ['=ANSWER.RESPONSE_ID' => $filter['RESPONSE_ID']]];
		}
		else
		{
			$selectFields = ['ID', 'CHAPTER_ID', 'FIELD_ID', 'POSITION', 'TITLE', 'DESCRIPTION', 'OPTION', 'SETTINGS'];
			$selectedFilter = [['=CHAPTER_ID' => $chapterId]];
		}

		if ($filter === null)
		{
			return QueryHelper::decompose
			(
				QuestionTable::query()
							 ->setSelect($selectFields)
							 ->setFilter($selectedFilter)
							 ->setOrder(['ID' => 'asc']),
				false
			);
		}
		else
		{
			return QueryHelper::decompose
			(
				QuestionTable::query()
							 ->setSelect($selectFields)
							 ->addSelect('ANSWER')
							 ->setFilter($selectedFilter)
							 ->setOrder(['ID' => 'asc'])
							 ->setLimit($filter['LIMIT'])
							 ->setOffset($filter['OFFSET']),
			false
			);
		}
	}

	public static function deleteQuestion(int $id)
	{
		$question = QuestionTable::wakeUpObject(['ID' => $id]);
		$question->fillOption();
		return $question->delete()->isSuccess();

	}
}