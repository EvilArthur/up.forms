<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/form-results.bundle.css',
	'js' => 'dist/form-results.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
