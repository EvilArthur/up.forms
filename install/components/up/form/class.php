<?php

class FormComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$now = new DateTime();
		$this->fetchLastTry();
		$this->fetchFormSettings();
		$this->prepareTemplateParams();
		if (!is_null($this->arResult['max_try']) && $this->arResult['try'] >= $this->arResult['max_try'])
		{
			$this->setTemplateName('max.try');
		}
		if (!is_null($this->arResult['startTestTime']) && $now < $this->arResult['startTestTime'])
		{
			$this->setTemplateName('not.ready');
		}
		else if (!is_null($this->arResult['endTestTime']) && $now > $this->arResult['endTestTime'])
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
		$startTestTime = $this->arResult['settings']
							->getByPrimary(['SETTINGS_ID' => 1, 'FORM_ID' => $this->arParams['ID']])
							->getValue();
		if ($startTestTime)
		{
			$this->arResult['startTestTime'] = new DateTime($startTestTime);
		}

		$endTestTime = $this->arResult['settings']
			->getByPrimary(['SETTINGS_ID' => 2, 'FORM_ID' => $this->arParams['ID']])
			->getValue();
		if ($endTestTime)
		{
			$this->arResult['endTestTime'] = new DateTime($endTestTime);
		}

		$maxTry = $this->arResult['settings']
			->getByPrimary(['SETTINGS_ID' => 5, 'FORM_ID' => $this->arParams['ID']])
			->getValue();
		$this->arResult['max_try'] = $maxTry;

		$timer = $this->arResult['settings']
			->getByPrimary(['SETTINGS_ID' => 3, 'FORM_ID' => $this->arParams['ID']])
			->getValue();
		$this->arResult['timer'] = $timer;
 	}

	protected function fetchFormSettings()
	{
		$settings = \Up\Forms\Repository\FormRepository::getFormSettings($this->arParams['ID']);
		$this->arResult['settings'] = $settings;
	}

	protected function fetchLastTry()
	{
		$try = \Up\Forms\Repository\ResponseRepository::getLastTry($this->arParams['ID']);
		$this->arResult['try'] = (int) $try;
	}
}