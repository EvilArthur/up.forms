import { Event, Tag } from 'main.core';
import { Question } from './question';

export class Form
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.questions = [];
		this.formData = {
			'title': 'Название формы',
			'questions': [
				{
					'id': 1,
					'title': 'Вопрос 1',
					'description': ' Описание 1',
					'type': 1,
				},
				{
					'id': 2,
					'title': 'Вопрос 2',
					'description': ' Описание 2',
					'type': 1,
				},
				{
					'id': 3,
					'title': 'Вопрос 3',
					'description': ' Описание 3',
					'type': 1,
				},
			],
		};
		this.layout.wrap.append(this.render());
	}

	render()
	{
		const wrap = Tag.render`
		<div class="container">
			<h1 class="text-center mt-5 mb-4">${this.formData.title}</h1>
			${this.renderQuestionList()}
			${this.renderSubmitButton()}
		</div>
		`;
		return wrap;
	}

	renderQuestionList()
	{
		const wrap = Tag.render`
		<form>
			${this.formData.questions.map((questionData) => {
				let question = null
				if (questionData.type === 1)
				{
					question = new Question(questionData);
				}
				this.questions.push(question);
				return question.render();
		})}
		</form>
		`;
		return wrap;
	}

	renderSubmitButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">Подтвердить</button>
		`;
		Event.bind(wrap, 'click', this.onSubmitButtonClickHandler.bind(this));

		return wrap;
	}

	onSubmitButtonClickHandler()
	{

		console.log(this.questions.map((question) => {
			return question.getAnswer();
		}));
	}
}
