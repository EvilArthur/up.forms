<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

	$routes->get('/forms/', new PublicPageController('/local/modules/up.forms/views/test.php'));

	$routes->get('/form/', new PublicPageController('/local/modules/up.forms/views/form.php'));
	$routes->post('/form/', new PublicPageController('/local/modules/up.forms/views/form-result.php'));

	$routes->get('/form/create/', new PublicPageController('/local/modules/up.forms/views/form-create.php'));
};