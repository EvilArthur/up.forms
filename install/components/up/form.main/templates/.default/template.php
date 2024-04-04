<?php

/**
 * @var array $arResult
 */
\Bitrix\Main\UI\Extension::load('up.form-list');
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>

	<nav class="navbar navbar-expand-lg bg-body-tertiary mb-10">
	<div class="container-fluid">

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<div class="container-fluid justify-content-start">
					<a type="button" class="btn btn-success" href="/form/create/">Добавить Форму</a>
				</div>
			</ul>
			<form class="d-flex" role="search">
				<input class="form-control me-2" type="search" placeholder="Название формы..." aria-label="Search">
				<button class="btn btn-outline-success" type="submit">Поиск</button>
			</form>
		</div>
	</div>
</nav>

<div class="container" id="main-container">
</div>


<script>
	BX.ready(function() {
		window.FormConstructor = new BX.Up.Forms.FormList({
			container: document.getElementById('main-container')
		});
	});
</script>




<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>