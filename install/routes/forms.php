<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;
use Up\Forms\Service\FormManager;

return function (RoutingConfigurator $routes) {

	$routes->get('/forms/', new PublicPageController('/local/modules/up.forms/views/main.php'));

	$routes->get('/test/', new PublicPageController('/local/modules/up.forms/views/index.php'));

	$routes->get('/form/view/{id}/', new PublicPageController('/local/modules/up.forms/views/form.php'));

	$routes->get('/form/create/', new PublicPageController('/local/modules/up.forms/views/form-create.php'));
	$routes->get('/form/create/done/', new PublicPageController('/local/modules/up.forms/views/form-create-done.php'));

	$routes->get('/form/edit/{id}/', new PublicPageController('/local/modules/up.forms/views/form-create.php'));
	$routes->get('/form/edit/{id}/done/', new PublicPageController('/local/modules/up.forms/views/form-create-done.php'));
};