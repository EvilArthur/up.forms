<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/form-list.bundle.css',
	'js' => 'dist/form-list.bundle.js',
	'rel' => [
		'main.core',
		'main.ui.grid',
	],
	'skip_core' => false,
];
