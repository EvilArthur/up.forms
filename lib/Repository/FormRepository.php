<?php
namespace Up\Forms\Repository;

use Up\Forms\Model\ChapterTable;
use Up\Forms\Model\EO_FormFormSettings_Collection;
use Up\Forms\Model\FormFormSettingsTable;
use Up\Forms\Model\FormTable;
use Up\Forms\Model\OptionTable;
use Up\Forms\Model\QuestionQuestionSettingsTable;
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
						$option->setIsRightAnswer($optionData['IS_RIGHT_ANSWER']);
						$question->addToOption($option);
					}
					foreach ($questionData['SETTINGS'] as $questionSettingData)
					{
						$questionSetting = QuestionQuestionSettingsTable::createObject();
						$questionSetting->setSettingsId($questionSettingData['SETTINGS_ID']);
						$questionSetting->setValue($questionSettingData['VALUE']);
						$question->addToSettings($questionSetting);
					}
					$chapter->addToQuestion($question);
				}
				$form->addToChapter($chapter);
			}
			foreach ($formData['SETTINGS'] as $formSettingData)
			{
				$formSetting = FormFormSettingsTable::createObject();
				$formSetting->setSettingsId($formSettingData['ID']);
				$formSetting->setValue($formSettingData['VALUE']);
				$form->addToSettings($formSetting);
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
				]
			);
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
					$question->removeAllSettings();
				}
				$question->setTitle($questionData['TITLE']);
				$question->setPosition($questionData['POSITION']);
				$question->setFieldId($questionData['FIELD_ID']);
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
					$option->setIsRightAnswer($optionData['IS_RIGHT_ANSWER']);
					$option->save();

					$question->addToOption($option);
				}
				foreach ($questionData['SETTINGS'] as $questionSettingData)
				{
					if ($questionData['ID'] === null)
					{
						$questionSetting = QuestionQuestionSettingsTable::createObject();
						$questionSetting->setSettingsId($questionSettingData['SETTINGS_ID']);
					}
					else
					{
						$questionSetting = QuestionQuestionSettingsTable::wakeUpObject(
							['QUESTION_ID' => $questionData['ID'], 'SETTINGS_ID' => $questionSettingData['SETTINGS_ID']]);
					}
					$questionSetting->setValue($questionSettingData['VALUE']);
					$question->addToSettings($questionSetting);
				}
				$chapter->addToQuestion($question);
			}
			$form->addToChapter($chapter);
		}
		$form->removeAllSettings();
		foreach ($formData['SETTINGS'] as $formSettingData)
		{
			$formSetting = FormFormSettingsTable::wakeUpObject(
				['FORM_ID' => $formData['ID'], 'SETTINGS_ID' => $formSettingData['ID']]
			);
			$formSetting->setValue($formSettingData['VALUE']);
			$form->addToSettings($formSetting);
		}
		$result = $form->save();

		return $result->getErrors();
	}

	public static function getForm(int $id)/*: EO_Form*/
	{
		$form = FormTable::getByPrimary($id, [
			'select' => [
				'TITLE',
				'CHAPTER',
				'CHAPTER.QUESTION',
				'CHAPTER.QUESTION.OPTION',
				'CHAPTER.QUESTION.SETTINGS',
				'SETTINGS.SETTINGS_ID',
				'SETTINGS.VALUE',
			],
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
		$questions = $form->fillChapter()->fillQuestion();
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

	public static function getFormSettings(int $id): EO_FormFormSettings_Collection
	{
		$settings = FormFormSettingsTable::getByPrimary(['FORM_ID' => $id])->fetchCollection();
		return $settings;
	}

	public static function getMaxNumberOfTry(int $id): ?int
	{
		$setting = FormFormSettingsTable::getByPrimary(['FORM_ID' => $id, 'SETTINGS_ID' => 5])->fetchObject();
		$maxTry = $setting->getValue() === '' ? null : (int) $setting->getValue();

		return $maxTry;
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