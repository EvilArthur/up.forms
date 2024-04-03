<?php

/**
 * @var array $arResult
 */

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>

	<nav class="navbar navbar-expand-lg bg-body-tertiary mb-10">
	<div class="container-fluid">

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">

				<form class="container-fluid justify-content-start">
					<button type="button" class="btn btn-success">Добавить Форму</button>
				</form>


			</ul>
			<form class="d-flex" role="search">
				<input class="form-control me-2" type="search" placeholder="Название формы..." aria-label="Search">
				<button class="btn btn-outline-success" type="submit">Поиск</button>
			</form>
		</div>
	</div>
</nav>
<div class="container ">
	<table class="table">
		<tbody>
			<?php foreach ($arResult['FORMS'] as $form): ?>
				<tr>
					<td class="align-middle"><?= htmlspecialcharsbx($form->getTitle())?></td>
					<td><button class="btn btn-primary">Редактировать</button></td>
					<td><button class="btn btn-success">Публичная ссылка</button></td>
					<td><button class="btn btn-info">Результаты</button></td>
					<td><button class="btn btn-danger">Удалить</button></td>
				</tr>
			<?php endforeach; ?>
		</tbody>
	</table>
</div>


<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>