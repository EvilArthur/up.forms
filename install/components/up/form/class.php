<?php

use Up\Forms\Model\EO_Response;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\ResponseRepository;

class FormComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$now = new DateTime();
		if (!$this->fetchCurrentResponse())
		{
			$this->fetchLastTry();
		}
		$this->fetchFormSettings();
		$this->prepareTemplateParams();

		if (!is_null($this->arResult['MAX_TRY'])
			&& $this->arResult['TRY'] >= $this->arResult['MAX_TRY']
			&& is_null($this->arResult['CURRENT_RESPONSE']))
		{
			$this->setTemplateName('max.try');
		}
		if (!is_null($this->arResult['START_TEST_TIME']) && $now < $this->arResult['START_TEST_TIME'])
		{
			$this->setTemplateName('not.ready');
		}
		else if (!is_null($this->arResult['END_TEST_TIME']) && $now > $this->arResult['END_TEST_TIME'])
		{
			$this->setTemplateName('closed');
		}
		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['ID'] = (int) $arParams['ID'];
		if ($arParams['ID'] <= 0)
		{
			$response = new \Bitrix\Main\Engine\Response\Redirect('404');
			$response->setStatus('404');
		}
		return $arParams;
	}

	protected function prepareTemplateParams()
	{
		$startTestTime = $this->arResult['SETTINGS']
							->getByPrimary(['SETTINGS_ID' => 1, 'FORM_ID' => $this->arParams['ID']])
							->getValue();
		if ($startTestTime)
		{
			$this->arResult['START_TEST_TIME'] = new DateTime($startTestTime);
		}

		$endTestTime = $this->arResult['SETTINGS']
			->getByPrimary(['SETTINGS_ID' => 2, 'FORM_ID' => $this->arParams['ID']])
			->getValue();
		if ($endTestTime)
		{
			$this->arResult['END_TEST_TIME'] = new DateTime($endTestTime);
		}

		$maxTry = $this->arResult['SETTINGS']
			->getByPrimary(['SETTINGS_ID' => 5, 'FORM_ID' => $this->arParams['ID']])
			->getValue();
		$this->arResult['MAX_TRY'] = $maxTry;

		$timer = $this->arResult['SETTINGS']
			->getByPrimary(['SETTINGS_ID' => 3, 'FORM_ID' => $this->arParams['ID']])
			->getValue();

		$this->arResult['IS_ACTIVE'] = $timer = $this->arResult['SETTINGS']
			->getByPrimary(['SETTINGS_ID' => 6, 'FORM_ID' => $this->arParams['ID']])
			->getValue();

		$this->arResult['TIMER'] = $timer;
		/** @var EO_Response $response */
		$response = $this->arResult['CURRENT_RESPONSE'];
		if ($response)
		{
			$this->arResult['TRY'] = $response->getTryNumber();
			$this->arResult['START_RESPONSE_TIME'] = $response->getStartTime()->getTimestamp();
		}

 	}

	protected function fetchFormSettings()
	{
		$settings = FormRepository::getFormSettings($this->arParams['ID']);
		$this->arResult['SETTINGS'] = $settings;
	}

	protected function fetchCurrentResponse()
	{
		global $USER;
		$currentResponse = ResponseRepository::getCurrentResponse($USER->GetID(), $this->arParams['ID']);
		$this->arResult['CURRENT_RESPONSE'] = $currentResponse;
		return $currentResponse;
	}

	protected function fetchLastTry()
	{
		$this->arResult['TRY'] = ResponseRepository::getLastTry($this->arParams['ID']) ? : 0;
	}
}