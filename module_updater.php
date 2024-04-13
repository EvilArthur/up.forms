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

__formsMigrate(3, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('Up_Chapter'))
	{
		$DB->query
		('
			CREATE TABLE Up_Chapter (
			ID int not null auto_increment,
			Form_ID int not null,
			Title varchar(100),
			Description text,
			PRIMARY KEY (ID)
			);
		');
	}
});
__formsMigrate(4, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists(''))
	{
		$DB->query
		('
			ALTER TABLE Up_Question CHANGE Form_ID Chapter_ID int not null;
		');
	}
});
__formsMigrate(5, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('Up_Option'))
	{
		$DB->query
		('
			CREATE TABLE Up_Option (
			ID int not null auto_increment,
			Value varchar(100),
			PRIMARY KEY (ID)
			);
		');
	}
});

__formsMigrate(6, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists(''))
	{
		$DB->query
		("
			INSERT INTO Up_Field (Title)
			VALUES ('UP_FORMS_FORM_CONSTRUCTOR_QUESTION_TYPE_1'),
				   ('UP_FORMS_FORM_CONSTRUCTOR_QUESTION_TYPE_2');
		");
	}
});

__formsMigrate(7, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('Up_Question_Option'))
	{
		$DB->query
		('
			CREATE TABLE Up_Question_Option(
			Question_ID int,
			Option_ID int,
			primary key (Question_ID, Option_ID)
			);
		');
	}
});

__formsMigrate(8, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists(''))
	{
		$DB->query
		("
			INSERT INTO UP_Field (Title)
			VALUES ('UP_FORMS_FORM_CONSTRUCTOR_QUESTION_TYPE_3');
		");
	}
});