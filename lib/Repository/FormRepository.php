<?php
namespace Up\Forms\Repository;

use Bitrix\Main\Config\Configuration;
use Bitrix\Main\DB\Exception;
use Bitrix\Main\ORM\Query\Query;
use Bitrix\Tasks\Util\Db;
use Up\Forms\Model\AnswerTable;
use Up\Forms\Model\ChapterTable;
use Up\Forms\Model\FormTable;
use Up\Forms\Model\OptionTable;
use Up\Forms\Model\QuestionTable;

class FormRepository
{
	public static function createForm($formData)
	{
		\db()->startTransaction();
		try
		{
			$form = FormTable::createObject();
			$form->setCreatorId(1);
			$form->setTitle($formData['Title']);
			foreach ($formData['chapters'] as $chapterData)
			{

				$chapter = ChapterTable::createObject();
				$chapter->setTitle($chapterData['title']);
				$chapter->setDescription($chapterData['description']);
				foreach ($chapterData['questions'] as $questionData)
				{
					if ($questionData === null)
					{
						continue;
					}
					$question = QuestionTable::createObject();
					$question->setTitle($questionData['Title']);
					$question->setPosition($questionData['Position']);
					$question->setFieldId($questionData['Field_ID']);
					foreach ($questionData['Options'] as $optionData)
					{
						if ($optionData === null)
						{
							continue;
						}
						$option = OptionTable::createObject();
						$option->setValue($optionData['Value']);

						$option->save();

						$question->addToOptions($option);
					}
					$chapter->addToQuestion($question);
				}
				$form->addToChapter($chapter);
			}
			$result = $form->save()->getErrors();
			\db()->commitTransaction();
			return $result;
		}
		catch (\Throwable $error)
		{
			db()->rollbackTransaction();
			throw $error;
		}

	}

	public static function saveForm($formData)
	{
		$form = FormTable::getById($formData['ID'])->fetchObject();
		$form->setTitle($formData['Title']);
		$form->removeAllChapter();
		foreach ($formData['chapters'] as $chapterData)
		{
			$chapter = ChapterTable::wakeUpObject(
				[
					'ID' => $chapterData['ID'],
				]);
			$chapter->removeAllQuestion();
			foreach ($chapterData['questions'] as $questionData)
			{
				if ($questionData === "undefined")
				{
					continue;
				}
				if ($questionData['ID'] === "undefined")
				{
					$question = QuestionTable::createObject();
					$question->setTitle($questionData['Title']);
					$question->setPosition($questionData['Position']);
					$question->setFieldId($questionData['Field_ID']);
				}
				else
				{
					$question = QuestionTable::wakeUpObject(
						[
							'ID' => $questionData['ID'],
						]
					);
					$question->setTitle($questionData['Title']);
					$question->setPosition($questionData['Position']);
					$question->setFieldId($questionData['Field_ID']);
				}
				$chapter->addToQuestion($question);
			}
			$form->addToChapter($chapter);
		}
		$result = $form->save();
		return $result->isSuccess();
	}

	public static function getForm(int $id): array
	{
		$form = FormTable::getById($id)->fetchObject();
		$formList = $form->collectValues();
		$chapters = $form->fillChapter();
		foreach ($chapters as $chapter)
		{
			$chapterList = $chapter->collectValues();
			$questions = $chapter->fillQuestion();
			foreach ($questions as $question)
			{
				$questionList = $question->collectValues();
				$chapterList['questions'][] = $questionList;
			}
			$formList['chapters'][] = $chapterList;
		}
		return $formList;
	}

	public static function getForms()
	{
		return FormTable::query()
						->setSelect(['Id', 'Title',])
						->fetchAll();
	}

	public static function deleteForm(int $id)
	{
		$form = FormTable::getByPrimary($id)->fetchObject();
		$form->delete();
	}

	public static function getFormWithAnswers(int $id)
	{
		$form = FormTable::getById($id)->fetchObject();
		$form->fillChapter()->fillQuestion()->fillAnswer();
		var_dump($form);
		die();

		// $question = AnswerTable::getById(1)->fetchObject();
		// var_dump($question->fillQuestionId());
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
								'Field_ID': 1,
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