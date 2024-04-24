<?php
namespace Up\Forms\Repository;

use Up\Forms\Model\FormTable;


Class QuestionRepository
{
	public static function GetQuestionsByFormId(int $formId)
	{
		$form = FormTable::getByPrimary($formId, [
			'select' =>
				[
					'TITLE',
					'CHAPTER',
					'CHAPTER.QUESTION',
					'CHAPTER.QUESTION.OPTION',
					'CHAPTER.QUESTION.FIELD'
				]
		])->fetchObject()->collectValues(recursive: true);

		return $form;
	}
}