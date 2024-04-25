<?php
namespace Up\Forms\Repository;

use Bitrix\Main\ORM\Query\Query;
use Bitrix\Main\ORM\Query\QueryHelper;
use Up\Forms\Model\ChapterTable;
use Up\Forms\Model\EO_Chapter;
use Up\Forms\Model\EO_Form;
use Up\Forms\Model\EO_FormFormSettings;
use Up\Forms\Model\EO_FormFormSettings_Collection;
use Up\Forms\Model\EO_Option;
use Up\Forms\Model\EO_Question;
use Up\Forms\Model\EO_QuestionQuestionSettings;
use Up\Forms\Model\FormFormSettingsTable;
use Up\Forms\Model\FormTable;
use Up\Forms\Model\OptionTable;
use Up\Forms\Model\QuestionQuestionSettingsTable;
use Up\Forms\Model\QuestionTable;
use Up\Forms\Model\ResponseTable;
use Bitrix\Main\Application;

class FormRepository
{
	public static function createForm($formData)
	{
		Application::getConnection()->startTransaction();
		try
		{
			$form = self::fillFormByData($formData);
			$result = $form->save();
			Application::getConnection()->commitTransaction();

			return $result->getErrors();
		}
		catch (\Throwable $error)
		{
			Application::getConnection()->rollbackTransaction();
			throw $error;
		}

	}

	public static function saveForm($formData)
	{
		Application::getConnection()->startTransaction();
		try
		{
			self::deleteForm($formData['ID']);

			$form = self::fillFormByData($formData);
			$result = $form->save();
			Application::getConnection()->commitTransaction();

			return $result->getErrors();
		}
		catch (\Throwable $error)
		{
			Application::getConnection()->rollbackTransaction();
			throw $error;
		}
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

	public static function getForms(array $filter = null): \Bitrix\Main\ORM\Objectify\Collection
	{
		$query = new Query(FormTable::getEntity());
		$query->addSelect('TITLE');
		$query->addSelect('CREATOR_ID');
		$query->addSelect('DATE');
		$query->addSelect('IS_ACTIVE');
		$query->addSelect('SETTINGS');
		$query->addSelect('SETTINGS.SETTINGS');
		$query->addSelect('SETTINGS.SETTINGS.TYPE');
		$query->whereLike('TITLE', '%' . $filter['TITLE'] . '%');
		$query->whereIn('CREATOR_ID', $filter['USERS']);
		$query->setOrder($filter['SORT']);
		$query->setLimit($filter['LIMIT']);
		$query->setOffset($filter['OFFSET']);

		return QueryHelper::decompose($query);


		// return FormTable::query()
		// 				->setSelect(['ID', 'TITLE', 'CREATOR_ID', 'DATE', 'IS_ACTIVE'])
		// 				->whereLike('TITLE', '%' . $filter['TITLE'] . '%')
		// 				->whereIn('CREATOR_ID', $filter['USERS'])
		// 				->setOrder($filter['SORT'])
		// 				->setLimit($filter['LIMIT'])
		// 				->setOffset($filter['OFFSET'])
		// 				->fetchAll();
	}

	public static function deleteForm(int $id): \Bitrix\Main\ORM\Data\Result
	{
		$form = self::getForm($id);

		return $form->delete();
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

	private static function fillFormByData(array $formData): EO_Form
	{
		global $USER;

		$form = FormTable::createObject();
		if ((int) $formData['ID'] > 0)
		{
			$form->setId($formData['ID']);
		}

		$form->setCreatorId($USER->GetID());
		$form->setTitle($formData['TITLE']);

		foreach ($formData['CHAPTER'] as $chapterData)
		{
			if ($chapterData === null)
			{
				continue;
			}
			$chapter = self::fillChapterByData($chapterData);
			$form->addToChapter($chapter);
		}

		foreach ($formData['SETTINGS'] as $formSettingData)
		{
			$setting = self::fillFormSettingByData($formSettingData, $formData['ID']);
			$form->addToSettings($setting);
		}

		return $form;
	}

	private static function fillChapterByData(array $chapterData): EO_Chapter
	{
		$chapter = ChapterTable::createObject();
		if(!is_null($chapterData['ID']))
		{
			$chapter->setId($chapterData['ID']);
		}

		$chapter->setTitle($chapterData['TITLE']);
		$chapter->setDescription($chapterData['DESCRIPTION']);

		foreach ($chapterData['QUESTION'] as $questionData)
		{
			if ($questionData === null)
			{
				continue;
			}
			$question = self::fillQuestionByData($questionData);
			$chapter->addToQuestion($question);
		}

		return $chapter;
	}

	private static function fillQuestionByData(array $questionData): EO_Question
	{
		$question = QuestionTable::createObject();
		if (!is_null($questionData['ID']))
		{
			$question->setId($questionData['ID']);
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
			$option = self::fillOptionByData($optionData);
			$question->addToOption($option);
		}

		foreach ($questionData['SETTINGS'] as $settingData)
		{
			$setting = self::fillQuestionSettingData($settingData, $questionData['ID']);
			$question->addToSettings($setting);
		}

		return $question;
	}

	private static function fillOptionByData(array $optionData): EO_Option
	{
		$option = OptionTable::createObject();
		if (!is_null($optionData['ID']))
		{
			$option->setId($optionData['ID']);
		}

		$option->setTitle($optionData['TITLE']);
		$option->setIsRightAnswer($optionData['IS_RIGHT_ANSWER']);

		return $option;
	}

	private static function fillQuestionSettingData(array $settingData, ?int $questionId): EO_QuestionQuestionSettings
	{
		$setting = QuestionQuestionSettingsTable::createObject();
		$setting->setSettingsId($settingData['SETTINGS_ID']);

		if (!is_null($questionId))
		{
			$setting->setQuestionId($questionId);
		}
		$setting->setValue($settingData['VALUE']);

		return $setting;
	}

	private static function fillFormSettingByData(array $settingData, int $formId): EO_FormFormSettings
	{
		$setting = FormFormSettingsTable::createObject();
		$setting->setSettingsId($settingData['ID']);
		if ($formId > 0)
		{
			$setting->setFormId($formId);
		}

		$setting->setValue($settingData['VALUE']);
		return $setting;
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