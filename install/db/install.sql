CREATE TABLE up_field (
	                      ID int not null auto_increment,
	                      TITLE varchar(300),
	                      PRIMARY KEY (ID)
);

CREATE TABLE up_option (
	                       ID int not null auto_increment,
	                       TITLE varchar(300),
	                       PRIMARY KEY (ID)
);

CREATE TABLE up_question_option(
	                               QUESTION_ID int,
	                               OPTION_ID int,
	                               PRIMARY KEY (QUESTION_ID, OPTION_ID)
);

CREATE TABLE up_question (
	                         ID int not null auto_increment,
	                         CHAPTER_ID int not null,
	                         FIELD_ID int not null,
	                         POSITION int not null,
	                         TITLE text,
	                         DESCRIPTION text,
	                         PRIMARY KEY (ID)
);

CREATE TABLE up_chapter (
	                        ID int not null auto_increment,
	                        FORM_ID int not null,
	                        TITLE varchar(300),
	                        DESCRIPTION text,
	                        PRIMARY KEY (ID)
);

CREATE TABLE up_form (
	                     ID int not null auto_increment,
	                     CREATOR_ID int not null,
	                     TITLE varchar(300),
	                     PRIMARY KEY (ID)
);

CREATE TABLE up_response (
	                     ID int not null auto_increment,
	                     FORM_ID int not null,
	                     USER_ID int not null,
	                     TRY_NUMBER int not null,
	                     PRIMARY KEY (ID)
);

CREATE TABLE up_answer (
	                       ID int not null auto_increment,
	                       QUESTION_ID int not null,
	                       RESPONSE_ID int not null,
	                       PRIMARY KEY (ID)
);

CREATE TABLE up_sub_answer (
	                        ID int not null auto_increment,
	                        ANSWER_ID int not null,
	                        VALUE text,
	                        PRIMARY KEY (ID)
);

CREATE TABLE up_form_form_settings (
	                        FORM_ID int not null,
	                        SETTINGS_ID int not null,
	                        VALUE varchar(30),
	                        PRIMARY KEY (FORM_ID, SETTINGS_ID)
);

CREATE TABLE up_form_settings (
	                        ID int not null auto_increment,
	                        TITLE varchar(30),
	                        TYPE_ID int not null,
	                        PRIMARY KEY (ID)
);

CREATE TABLE up_form_settings_type (
	                        ID int not null auto_increment,
	                        TITLE varchar(30),
	                        PRIMARY KEY (ID)
);

CREATE TABLE up_task (
	                       ID int not null auto_increment,
	                       USER_ID int not null,
	                       FORM_ID int not null,
	                       TASK_ID int not null,
	                       CREATOR_ID int not null,
	                       PRIMARY KEY (ID)
);