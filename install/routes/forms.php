<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;
use Up\Tasks\Service\FormManager;

return function (RoutingConfigurator $routes) {

	$routes->get('/form/', new PublicPageController('/local/modules/up.forms/views/form.php'));
	$routes->post('/form/', new PublicPageController('/local/modules/up.forms/views/form-result.php'));
};