<?php

use Bitrix\Main\ModuleManager;
use Bitrix\Main\Config\Option;

function __formsMigrate(int $nextVersion, callable $callback)
{
	global $DB;
	$moduleId = 'up.forms';

	if (!ModuleManager::isModuleInstalled($moduleId))
	{
		return;
	}

	$currentVersion = intval(Option::get($moduleId, '~database_schema_version', 0));

	if ($currentVersion < $nextVersion)
	{
		include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/update_class.php');
		$updater = new \CUpdater();
		$updater->Init('', 'mysql', '', '', $moduleId, 'DB');

		$callback($updater, $DB, 'mysql');
		Option::set($moduleId, '~database_schema_version', $nextVersion);
	}
}

// __formsMigrate(2, function($updater, $DB)
// {
// 	if ($updater->CanUpdateDatabase() && !$updater->TableExists(''))
// 	{
// 		$DB->query
// 		('
//
// 		');
// 	}
// });
