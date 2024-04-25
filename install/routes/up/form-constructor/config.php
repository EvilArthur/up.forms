<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/form-constructor.bundle.css',
	'js' => 'dist/form-constructor.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
