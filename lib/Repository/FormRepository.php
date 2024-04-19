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
			global $USER;
			$form = FormTable::createObject();
			$form->setCreatorId($USER->GetID());
			$form->setTitle($formData['TITLE']);
			foreach ($formData['CHAPTER'] as $chapterData)
			{

				$chapter = ChapterTable::createObject();
				$chapter->setTitle($chapterData['TITLE']);
				$chapter->setDescription($chapterData['DESCRIPTION']);
				foreach ($chapterData['QUESTION'] as $questionData)
				{
					if ($questionData === null)
					{
						continue;
					}
					$question = QuestionTable::createObject();
					$question->setTitle($questionData['TITLE']);
					$question->setPosition($questionData['POSITION']);
					$question->setFieldId($questionData['FIELD_ID']);
					foreach ($questionData['OPTION'] as $optionData)
					{
						if ($optionData === null)
						{
							continue;
						}
						$option = OptionTable::createObject();
						$option->setTitle($optionData['TITLE']);

						$option->save();

						$question->addToOption($option);
					}
					$chapter->addToQuestion($question);
				}
				$form->addToChapter($chapter);
			}
			$result = $form->save()->getErrors();
			db()->commitTransaction();
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
		$form->setTitle($formData['TITLE']);
		$form->removeAllChapter();
		foreach ($formData['CHAPTER'] as $chapterData)
		{
			$chapter = ChapterTable::wakeUpObject(
				[
					'ID' => $chapterData['ID'],
				]);
			$chapter->removeAllQuestion();
			foreach ($chapterData['QUESTION'] as $questionData)
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
					$question->removeAllOption();
				}
				$question->setTitle($questionData['TITLE']);
				$question->setPosition($questionData['POSITION']);
				$question->setFieldId($questionData['FIELD_ID']);
				/*$options = OptionTable::createCollection();*/
				foreach ($questionData['OPTION'] as $optionData)
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
						$option = OptionTable::wakeUpObject(
							[
								'ID' => $optionData['ID'],
							]
						);

					}
					$option->setTitle($optionData['TITLE']);
					$option->save();
					/*$options->add($option);*/

					$question->addToOption($option);
				}
				/*$question->set('Options', $options);*/
				$chapter->addToQuestion($question);
			}
			$form->addToChapter($chapter);
		}
		$result = $form->save();
		return $result->getErrors();
	}

	public static function getForm(int $id)/*: EO_Form*/
	{
		$form = FormTable::getByPrimary($id, ['select' =>
												  ['TITLE',
												   'CHAPTER',
												   'CHAPTER.QUESTION',
												   'CHAPTER.QUESTION.OPTION']
		])->fetchObject();

		return $form;
	}

	public static function getForms(array $filter = null): array
	{
		if ($filter === null)
		{
			return FormTable::query()
							->setSelect(['ID', 'TITLE', 'CREATOR_ID'])
							->fetchAll();
		}
		return FormTable::query()
						->setSelect(['ID', 'TITLE', 'CREATOR_ID'])
						->whereLike('TITLE', '%' . $filter['TITLE'] . '%')
						->whereIn('CREATOR_ID', $filter['USERS'])
						->setLimit($filter['LIMIT'])
						->setOffset($filter['OFFSET'])
						->fetchAll();
	}

	public static function deleteForm(int $id): void
	{
		$form = FormTable::getById($id)->fetchObject();
		$questions =  $form->fillChapter()->fillQuestion();
		$questions->fillOption();
		$questions->fillAnswer();

		$form->delete();
	}

	public static function deleteForms(array $ids): void
	{
		foreach ($ids as $id)
		{
			self::deleteForm($id);
		}
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