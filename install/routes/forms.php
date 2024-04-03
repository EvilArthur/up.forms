<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;
use Up\Forms\Service\FormManager;

return function (RoutingConfigurator $routes) {

	$routes->get('/forms/', new PublicPageController('/local/modules/up.forms/views/main.php'));

	$routes->get('/test/', function () {
		FormManager::createForm();
	});

	$routes->get('/form/', new PublicPageController('/local/modules/up.forms/views/form.php'));
	$routes->post('/form/', new PublicPageController('/local/modules/up.forms/views/form-result.php'));

	$routes->get('/form/create/', new PublicPageController('/local/modules/up.forms/views/form-create.php'));
	$routes->get('/form/create/done/', new PublicPageController('/local/modules/up.forms/views/form-create-done.php'));
};