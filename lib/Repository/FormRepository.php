<?php
namespace Up\Forms\Repository;

use Bitrix\Main\DB\Exception;
use Bitrix\Main\ORM\Query\Query;
use Up\Forms\Model\ChapterTable;
use Up\Forms\Model\FormTable;
use Up\Forms\Model\QuestionTable;

class FormRepository
{
	public static function saveForm($formData)
	{
		$form = FormTable::createObject();
		$form->setCreatorId(1);
		foreach ($formData['chapters'] as $chapterData)
		{

			$chapter = ChapterTable::createObject();
			$chapter->setTitle($chapterData['title']);
			$chapter->setDescription($chapterData['description']);
			foreach ($chapterData['questions'] as $questionData)
			{
				$question = QuestionTable::createObject();
				$question->setTitle($questionData['title']);
				$question->setPosition($questionData['position']);
				$question->setFieldId($questionData['type']);
				$chapter->addToQuestion($question);
			}
			$form->addToChapter($chapter);
		}

		return $form->save()->getErrors();

	}
}

/*{
	'title': 'Название формы',
				'chapters': [
					{
						'title': 'Название раздела',
						'description': 'Описание раздела',
						'questions': [
							{
								'title': 'Название 1',
								'description': 'Описание 1',
								'position': 1,
								'type': 1,
							},
							{
								'title': 'Название 2',
								'description': 'Описание 2',
								'position': 2,
								'type': 1,
							},
							{
								'title': 'Название 3',
								'description': 'Описание 3',
								'position': 3,
								'type': 1,
							},
						],
					},
				],
			};*/