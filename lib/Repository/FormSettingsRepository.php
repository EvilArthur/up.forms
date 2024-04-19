<?php

namespace Up\Forms\Repository;

use Up\Forms\Model\FormSettingsTable;

class FormSettingsRepository
{
	public static function getSettings()
	{
		$settings = FormSettingsTable::getList();

		return $settings->fetchAll();
	}
}