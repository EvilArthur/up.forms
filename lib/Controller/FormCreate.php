<?php

namespace Up\Forms\Controller;

use Bitrix\Bizproc\Error;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Loader;
use Up\Forms\Exception\InvalidValueException;
use Up\Forms\Repository\FieldRepository;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\FormSettingsRepository;

class FormCreate extends Controller
{
	public function saveFormDataAction($formData)
	{
		try
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
		}
		catch (InvalidValueException $e)
		{
			$this->addError(new Error($e->getMessage()));
			return null;
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

		$formData = FormRepository::getForm($id, $filter)->collectValues(recursive: true);
		$formData = $this->xssEscape($formData);
		return [
			'result' => $formData,
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


	private function xssEscape(array $rawData)
	{
		foreach ($rawData as $key => $data)
		{
			if (is_array($data))
			{
				$rawData[$key] = $this->xssEscape($data);
				continue;
			}
			$rawData[$key] = htmlspecialcharsbx($data);
		}
		return $rawData;
	}
}