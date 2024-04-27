<?php

namespace Up\Forms\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;
use Up\Forms\Repository\FieldRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\FormSettingsRepository;

class FormCreate extends Controller
{
	public function saveFormDataAction($formData)
	{
		if ((int) $formData['ID'] === 0)
		{
			$result = [
				'result' => FormRepository::createForm($formData),
			];
		}
		else
		{
			$result = [
				'result' => FormRepository::saveForm($formData),
			];
		}

		if(Loader::includeModule('pull'))
		{
			\CPullWatch::AddToStack('FORMS-UPDATE', [
				'module_id' => 'forms',
				'command' => 'update',
				'params' => []
			]);
		}

		return $result;
	}

	public function getFormDataAction($id, $limit = 0, $offset = 0)
	{
		$id = (int) $id;
		$limit = (int) $limit;
		$offset = (int) $offset;
		if ($limit === 0 & $offset === 0)
		{
			$filter = null;
		}
		else
		{
			$filter =
				[
					'LIMIT' => $limit,
					'OFFSET' => $offset,
				];
		}
		return
			[
				'result' => FormRepository::getForm($id, $filter)->collectValues(recursive: true),
			];
	}

	public function getFieldDataAction()
	{
		return [
			'result' => FieldRepository::getFields(),
		];
	}

	public function getSettingsDataAction()
	{
		return [
			'result' => FormSettingsRepository::getSettings(),
		];
	}
}