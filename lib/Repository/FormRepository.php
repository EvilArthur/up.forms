<?php

namespace Up\Forms\Repository;

use Bitrix\Main\Application;
use Bitrix\Main\ORM\Query\Query;
use Bitrix\Main\ORM\Query\QueryHelper;
use Bitrix\Main\Type\DateTime;
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

class FormRepository
{
	public static function createForm($formData)
	{
		Application::getConnection()->startTransaction();
		try
		{
			$form = self::fillFormByData($formData);
			$id = $form->save()->getId();
			foreach ($form->getChapter() as $chapter)
			{
				$chapterId = $chapter->getId();
			}
			Application::getConnection()->commitTransaction();

			return ['ID' => $id, 'CHAPTER_ID' => $chapterId];
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
			$form = self::fillFormByData($formData);
			$form->setDate(new DateTime());
			$result = $form->save();
			Application::getConnection()->commitTransaction();

			return $result->getId();
		}
		catch (\Throwable $error)
		{
			Application::getConnection()->rollbackTransaction();
			throw $error;
		}
	}

	public static function getForm(int $id, $filter = null)/*: EO_Form*/
	{
		$form = FormTable::getByPrimary($id, [
			'select' => [
				'TITLE',
				'CHAPTER',
				'SETTINGS.SETTINGS_ID',
				'SETTINGS.VALUE',
			],
		])->fetchObject();

		$chapters = $form->getChapter();
		$chapterId = 0;
		foreach ($chapters as $chapter)
		{
			$chapterId = $chapter->getId();
		}

		$questions = QuestionRepository::getQuestionsByChapterId($chapterId, $filter);

		foreach ($questions as $question)
		{
			$form->getChapter()->getByPrimary($chapterId)->addToQuestion($question);
			$question->unsetChapter();
			$question->setChapterId($chapterId);
		}

		return $form;
	}

	public static function getForms(array $filter = null)
	{
		$query = new Query(FormTable::getEntity());
		$query->addSelect('TITLE')->addSelect('CREATOR_ID')->addSelect('DATE')->addSelect('SETTINGS')->addSelect(
				'SETTINGS.SETTINGS'
			)->addSelect('SETTINGS.SETTINGS.TYPE')->whereLike('TITLE', '%' . $filter['TITLE'] . '%')->whereIn(
				'CREATOR_ID',
				$filter['USERS']
			)->setOrder($filter['SORT'])->setLimit($filter['LIMIT'])->setOffset($filter['OFFSET']);

		return QueryHelper::decompose($query, false);
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
		return FormFormSettingsTable::getByPrimary(['FORM_ID' => $id])->fetchCollection();
	}

	public static function getMaxNumberOfTry(int $id): ?int
	{
		$setting = FormFormSettingsTable::getByPrimary(['FORM_ID' => $id, 'SETTINGS_ID' => 5])->fetchObject();
		$maxTry = $setting->getValue();

		return $maxTry ? (int)$maxTry : null;
	}

	public static function getFormName(int $id): string
	{
		return FormTable::getByPrimary($id, ['select' => ['TITLE']])->fetchObject()->getTitle();
	}

	private static function fillFormByData(array $formData): EO_Form
	{
		global $USER;

		if ((int)$formData['ID'] > 0)
		{
			$form = FormTable::wakeUpObject(['ID' => $formData['ID']]);
		}
		else
		{
			$form = FormTable::createObject();
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

		if (!is_null($chapterData['ID']))
		{
			$chapter = ChapterTable::wakeUpObject(['ID' => $chapterData['ID']]);
		}
		else
		{
			$chapter = ChapterTable::createObject();
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

		if (!is_null($questionData['ID']))
		{
			$question = QuestionTable::wakeUpObject(['ID' => $questionData['ID']]);
			$question->removeAllOption();
		}
		else
		{
			$question = QuestionTable::createObject();
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

		if (!is_null($optionData['ID']))
		{
			$option = OptionTable::wakeUpObject(['ID' => $optionData['ID']]);
		}
		else
		{
			$option = OptionTable::createObject();
		}

		if ($optionData['TITLE'] === '')
		{

		}
		$option->setTitle($optionData['TITLE']);
		$option->setIsRightAnswer($optionData['IS_RIGHT_ANSWER']);

		return $option;
	}

	private static function fillQuestionSettingData(array $settingData, ?int $questionId): EO_QuestionQuestionSettings
	{
		if (!is_null($questionId))
		{
			$setting = QuestionQuestionSettingsTable::wakeUpObject(
				['SETTINGS_ID' => $settingData['SETTINGS_ID'], 'QUESTION_ID' => $questionId]
			);
		}
		else
		{
			$setting = QuestionQuestionSettingsTable::createObject();
			$setting->setSettingsId($settingData['SETTINGS_ID']);
		}
		$setting->setValue($settingData['VALUE']);

		return $setting;
	}

	private static function fillFormSettingByData(array $settingData, ?int $formId): EO_FormFormSettings
	{

		if ($formId && $formId > 0)
		{
			$setting = FormFormSettingsTable::wakeUpObject(['SETTINGS_ID' => $settingData['ID'], 'FORM_ID' => $formId]);
		}
		else
		{
			$setting = FormFormSettingsTable::createObject();
			$setting->setSettingsId($settingData['ID']);
		}

		$setting->setValue($settingData['VALUE']);

		return $setting;
	}
}
