<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;
use Up\Forms\Service\FormManager;

return function (RoutingConfigurator $routes) {

	$routes->get('/forms/', new PublicPageController('/local/modules/up.forms/views/main.php'));

	$routes->get('/test/', function () {
		\Up\Forms\Repository\FormRepository::saveForm(
			json_decode('{
    "ID": 3,
    "Title": "Название",
    "Creator_ID": 1,
    "chapters": [
        {
            "ID": 3,
            "Form_ID": 3,
            "Title": "Заголовок раздела",
            "Description": "Описание раздела",
            "questions": [
                {
                    "Title": "Название 1",
                    "Position": 1,
                    "Field_ID": 1,
                    "ID": 1
                },
                {
                    "Title": "Название 2",
                    "Position": 2,
                    "Field_ID": 1,
                    "ID": 2
                },
                {
                    "Title": "Название 3",
                    "Position": 3,
                    "Field_ID": 1,
                    "ID": 3
                },
                "undefined",
                {
                    "Title": "Название",
                    "Position": 5,
                    "Field_ID": 1,
                    "ID": null
                }
            ]
        }
    ]
}',
				true
			)
		);
	});

	$routes->get('/form/', new PublicPageController('/local/modules/up.forms/views/form.php'));
	$routes->post('/form/', new PublicPageController('/local/modules/up.forms/views/form-result.php'));

	$routes->get('/form/create/', new PublicPageController('/local/modules/up.forms/views/form-create.php'));
	$routes->get('/form/create/done/', new PublicPageController('/local/modules/up.forms/views/form-create-done.php'));

	$routes->get('/form/edit/{id}/', new PublicPageController('/local/modules/up.forms/views/form-create.php'));
};