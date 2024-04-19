<?php
namespace Up\Forms\Repository;

use Up\Forms\Model\ChapterTable;


Class QuestionRepository
{
	public static function GetQuestionsByFormId(int $formId)
	{
		// $form = ChapterTable::getByPrimary($id, ['select' =>
		// 										  ['TITLE',
		// 										   'CHAPTER',
		// 										   'CHAPTER.QUESTION',
		// 										   'CHAPTER.QUESTION.OPTION']
		// ])->fetchObject();
		//
		// return $form;
	}
}