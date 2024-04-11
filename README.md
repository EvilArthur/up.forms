# Bitrix module Forms

1. Закидываем содержимое репозитория по пути `/{pathToProject}/local/modules/up.forms`(данную папку предварительно нужно создать)

2. Переходим в браузере по пути  `/{pathToProject}/bitrix/admin/partner_modules.php?lang=ru`, там появится список модулей, нужный нам - Forms, нажимаем слева от названия на три полоски, появится пункт установить, устанавливаем

3. В Корне проект меняем содержимое файла `${pathToProject}/.htaccess` 

"Эти строки удалить"

```
-RewriteCond %{REQUEST_FILENAME} !/bitrix/urlrewrite.php$
-RewriteRule ^(.*)$ /bitrix/urlrewrite.php [L]

```

"Эти строки добавить где были предыдущие"

```
+RewriteCond %{REQUEST_FILENAME} !/index.php$
+RewriteRule ^(.*)$ /index.php [L]
```

4. Добавляем путь до файл с роутами `forms.php`, переходим в `/{pathToProject}/bitrix/.settings.php` файл:

```php
'routing' => ['value' => [
	'config' => ['forms.php']
]],
```
5. Создаем Файл  `/{pathToProject}/local/php_interface/init.php` c содержимым

```php
<?php

\Bitrix\Main\Loader::includeModule('up.forms');
```

6. Символические ссылки

для linux систем
```
ln -s /{pathToProject}/local/modules/up.forms/install/routes/  /{pathToProject}/local/
ln -s /{pathToProject}/local/modules/up.forms/install/components/up  /{pathToProject}/local/components
ln -s /{pathToProject}/local/modules/up.forms/install/js/ /{pathToProject}/local/
```

для windows систем

```
mklink "C:\{pathToProject}\local\components\up" "C:\{pathToProject}\local\modules\up.forms\install\components\up"
mklink "C:\{pathToProject}\local\routes\forms.php" "C:\{pathToProject}\local\modules\up.forms\install\routes\forms.php"
mklink "C:\{pathToProject}\local\js\up" "C:\{pathToProject}\local\modules\up.forms\install\js\up"
```


7. В корне проекта в файле `${pathToProject}/index.php` добавляем

```
require_once __DIR__ . '/bitrix/routing_index.php'; 
```
8. Иницализируем Composer в папке `/{pathToProject}/bitrix/`

``` 
 COMPOSER=composer-bx.json composer install    
```

9. Создаем анотации для ORM находясь в папке `/{pathToProject}/bitrix/`

```
   php bitrix.php orm:annotate -m up.forms 
```