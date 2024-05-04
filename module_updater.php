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

__formsMigrate(2, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_field'))
	{
		$DB->query
		("
			INSERT INTO up_field (TITLE)
			VALUES('UP_FORMS_FORM_CONSTRUCTOR_QUESTION_TYPE_1'),
				   ('UP_FORMS_FORM_CONSTRUCTOR_QUESTION_TYPE_2'),
				   ('UP_FORMS_FORM_CONSTRUCTOR_QUESTION_TYPE_3');
		");
	}
});

__formsMigrate(3, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_form_form_settings'))
	{
		$DB->query
		("
			CREATE TABLE up_form_form_settings (
	                        FORM_ID int not null,
	                        SETTINGS_ID int not null,
	                        VALUE varchar(30),
	                        PRIMARY KEY (FORM_ID, SETTINGS_ID)
			);
		");
	}
});

__formsMigrate(4, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_form_settings'))
	{
		$DB->query
		("
			CREATE TABLE up_form_settings (
	                        ID int not null auto_increment,
	                        TITLE varchar(30),
	                        TYPE_ID int not null,
	                        PRIMARY KEY (ID)
			);
		");
	}
});

__formsMigrate(5, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_form_settings_type'))
	{
		$DB->query
		("
			CREATE TABLE up_form_settings_type (
	                        ID int not null auto_increment,
	                        TITLE varchar(30),
	                        PRIMARY KEY (ID)
			);
		");
	}
});

__formsMigrate(6, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_form_settings_type'))
	{
		$DB->query
		("
			INSERT INTO up_form_settings_type (TITLE)
			VALUES('datetime-local'),
				   ('time'),
				   ('checkbox'),
				   ('number');
		");
	}
});

__formsMigrate(8, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_form_settings_type'))
	{
		$DB->query
		("
			INSERT INTO up_form_settings(TITLE, TYPE_ID)
			VALUES ('Время начала доступа к тесту', '1'),
				   ('Время конца доступа к тесту', '1'),
				   ('Таймер на прохождение', '2'),
				   ('Анонимная форма', '3'),
				   ('Количество попыток', '4')
		");
	}
});

__formsMigrate(9, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_question_option'))
	{
		$DB->query
		("
			DROP TABLE up_question_option;
		");
	}
});

__formsMigrate(10, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_option'))
	{
		$DB->query
		("
			ALTER TABLE up_option
			ADD QUESTION_ID int not null;
		");
	}
});

__formsMigrate(11, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_question_settings'))
	{
		$DB->query
		("
			CREATE TABLE up_question_settings (
	                        ID int not null auto_increment,
	                        TITLE varchar(30),
	                        PRIMARY KEY (ID)
			);
		");
	}
});

__formsMigrate(12, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_question_question_settings'))
	{
		$DB->query
		("
			CREATE TABLE up_question_question_settings (
	                        QUESTION_ID int not null,
	                        SETTINGS_ID int not null,
	                        VALUE varchar(30),
	                        PRIMARY KEY (QUESTION_ID, SETTINGS_ID)
			);
		");
	}
});

__formsMigrate(13, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_question_settings'))
	{
		$DB->query
		("
			INSERT INTO up_question_settings(TITLE)
			VALUES ('Тип проверки'),
				   ('Обязательный вопрос')
		");
	}
});

__formsMigrate(14, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_option'))
	{

		$DB->query
		("
			ALTER TABLE up_option
			ADD IS_RIGHT_ANSWER varchar(30);
		");
	}
});

__formsMigrate(15, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_task'))
	{
		$DB->query
		("
			CREATE TABLE up_task (
				ID int not null auto_increment,
				USER_ID int not null,
				FORM_ID int not null,
				TASK_ID int not null,
				CREATOR_ID int not null,
				PRIMARY KEY (ID)
			);
		");
	}
});

__formsMigrate(16, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_form'))
	{
		$DB->query
		("
			ALTER TABLE up_form
				ADD IS_ACTIVE bool,
				ADD DATE TIMESTAMP;
		");
	}
});
__formsMigrate(17, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_response'))
	{
		$DB->query
		("
			ALTER TABLE up_response
			ADD COMPLETED bool,
			ADD START_TIME timestamp,
			ADD COMPLETED_TIME timestamp null;
		");
	}
});


__formsMigrate(18, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_form_settings_type'))
	{
		$DB->query
		("
			INSERT INTO up_form_settings(TITLE, TYPE_ID)
			VALUE ('Форма активна', '3');
		");
	}
});

__formsMigrate(19, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_form'))
	{
		$DB->query
		("
			ALTER TABLE up_form
				DROP COLUMN IS_ACTIVE;
		");
		$DB->query
		("
			ALTER TABLE up_form
				MODIFY COLUMN DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
		");
	}
});

__formsMigrate(20, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_accepted_user'))
	{
		$DB->query
		("
			CREATE TABLE up_accepted_user(
				ID int not null,
				PRIMARY KEY (ID)
			);
		");
	}
});

__formsMigrate(21, function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_form_settings'))
	{
		$DB->query
		("
			UPDATE up_form_settings
			SET TITLE = 
				CASE 
					WHEN ID = 1 THEN 'UP_FORMS_FORM_SETTINGS_1'
					WHEN ID = 2 THEN 'UP_FORMS_FORM_SETTINGS_2'
					WHEN ID = 3 THEN 'UP_FORMS_FORM_SETTINGS_3'
					WHEN ID = 4 THEN 'UP_FORMS_FORM_SETTINGS_4'
					WHEN ID = 5 THEN 'UP_FORMS_FORM_SETTINGS_5'
					WHEN ID = 6 THEN 'UP_FORMS_FORM_SETTINGS_6'
				END
			WHERE ID IN (1, 2, 3, 4, 5, 6);
		");
	}
});

// __formsMigrate(22, function($updater, $DB)
// {
// 	if ($updater->CanUpdateDatabase() && $updater->TableExists('up_accepted_user'))
// 	{
// 		$DB->query
// 		("
// 			INSERT INTO up_accepted_user VALUE
// 				(1);
// 		");
// 	}
// });