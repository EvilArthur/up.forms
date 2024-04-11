<?php
namespace Up\Forms\Repository;

use Bitrix\Main\Config\Configuration;
use Bitrix\Main\DB\Exception;
use Bitrix\Main\ORM\Query\Query;
use Bitrix\Tasks\Util\Db;
use Up\Forms\Model\AnswerTable;
use Up\Forms\Model\ChapterTable;
use Up\Forms\Model\EO_Form;
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
				foreach ($chapterData['Question'] as $questionData)
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
			foreach ($chapterData['Question'] as $questionData)
			{
				if ($questionData === null)
				{
					continue;
				}
				if ($questionData['ID'] === null)
				{
					$question = QuestionTable::createObject();
				}
				else
				{
					$question = QuestionTable::wakeUpObject(
						[
							'ID' => $questionData['ID'],
						]
					);
				}
				$question->setTitle($questionData['Title']);
				$question->setPosition($questionData['Position']);
				$question->setFieldId($questionData['Field_ID']);
				$question->removeAllOptions();
				foreach ($questionData['Options'] as $optionData)
				{
					if ($optionData === null)
					{
						continue;
					}
					if ($optionData['ID'] === null)
					{
						$option = OptionTable::createObject();
					}
					else
					{
						$option = OptionTable::wakeObject(
							[
								'ID' => $optionData['ID'],
							]
						);

					}
					$option->setValue($optionData['Value']);

					$option->save();

					$question->addToOptions($option);
				}
				$chapter->addToQuestion($question);
			}
			$form->addToChapter($chapter);
		}
		$result = $form->save();
		return $result->getErrors();
	}

	public static function getForm(int $id): EO_Form
	{
		$form = FormTable::getById($id)->fetchObject();
		$form->fillChapter()->fillQuestion()->fillOptions();
		return $form;
	}

	public static function getForms(): array
	{
		return FormTable::query()
						->setSelect(['Id', 'Title',])
						->fetchAll();
	}

	public static function deleteForm(int $id): void
	{
		$form = FormTable::getById($id)->fetchObject();
		$questions =  $form->fillChapter()->fillQuestion();
		$questions->fillOptions();
		$questions->fillAnswer();

		$form->delete();
	}

	public static function getFormWithAnswers(int $id)
	{
		$form = FormTable::getById($id)->fetchObject();

		var_dump($form->fillChapter()->fillQuestion()->getTitleList());
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