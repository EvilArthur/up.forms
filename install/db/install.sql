CREATE TABLE UP_Field (
	                      ID int not null auto_increment,
	                      Title varchar(100),
	                      PRIMARY KEY (ID)
);

CREATE TABLE UP_Question (
	                         ID int not null auto_increment,
	                         Form_ID int not null,
	                         Field_ID int not null,
	                         Position int not null,
	                         Title varchar(300),
	                         PRIMARY KEY (ID)
);

CREATE TABLE UP_Form (
	                     ID int not null auto_increment,
	                     Creator_ID int not null,
	                     Title varchar(100),
	                     PRIMARY KEY (ID)
);

CREATE TABLE Up_Answer (
	                       ID int not null auto_increment,
	                       Question_ID int not null,
	                       User_ID int not null,
	                       Answer varchar(100),
	                       PRIMARY KEY (ID)
);