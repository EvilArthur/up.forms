import {Tag, Type, Event} from 'main.core';
import {Question} from './question';

export class FormConstructor
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.questions = [
			{
				'title': 'Название 1'
			},
			{
				'title': 'Название 2'
			},
			{
				'title': 'Название 3'
			},
		]
		this.questionNumber = 1;
		if (!this.layout.wrap)
		{
			throw new Error(`TaskList: container is not found`);
		}
		this.layout.wrap.append(this.render());
	}

	render()
	{
		const wrap = Tag.render`
		<div class="container">
			<h1 class="text-center mt-5 mb-4">Заголовок формы</h1>
			<div class="container d-flex justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
				${this.renderAddQuestionButton()}
				<button type="button" class="btn btn-primary mx-1">Тт</button>
				<button type="button" class="btn btn-primary mx-1">P</button>
			</div>
			${this.renderQuestionList()}
			<div class="d-flex justify-content-center">
				${this.renderSaveFormButton()}
		 	</div>
		</div>
`
		return wrap
	}

	renderQuestionList()
	{
		this.questionNumber = 1;
		const wrap = Tag.render`
		<div class="container">
			${this.questions.map((questionData) => new Question(questionData, this.questionNumber++, this.questions).render())}
		</div>
		`
		this.layout.questionList?.replaceWith(wrap);
		this.layout.questionList = wrap;
		return this.layout.questionList
	}

	renderAddQuestionButton()
	{
		const wrap = Tag.render`
			<button type="button" class="btn btn-primary mx-1">+</button>
		`;
		Event.bind(wrap, 'click', this.onAddQuestionButtonClickHandler.bind(this));

		return wrap
	}

	onAddQuestionButtonClickHandler()
	{
		this.questions.push({
			'title': 'Новое название'
		})
		this.renderQuestionList();
	}

	renderSaveFormButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">Сохранить</button>
		`;
		Event.bind(wrap, 'click', this.onSaveFormButtonClickHandler.bind(this));

		return wrap
	}
	onSaveFormButtonClickHandler()
	{
		console.log(this.questions)
	}
}
