<?php

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>


<div class="container w-50">
	<h1 class="text-center mt-5 mb-4">Заголовок формы</h1>
	<form action="/form/" method="post">
		<div class="mb-3">
			<label for="question-1" class="form-label">Вопрос 1</label>
			<input class="form-control" id="question-1" type="text" placeholder="Ответ 1" name="answer-1">
		</div>
		<div class="mb-3">
			<label for="question-2" class="form-label">Вопрос 2</label>
			<input class="form-control" id="question-2" type="text" placeholder="Ответ 2" name="answer-2">
		</div>
		<div class="mb-3">
			<label for="question-3" class="form-label">Вопрос 3</label>
			<input class="form-control" id="question-3" type="text" placeholder="Ответ 3" name="answer-3">
		</div>
		<button type="submit" class="btn btn-primary">Подтвердить</button>
	</form>
</div>



<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>