import {Tag, Type, Event} from 'main.core';
import {Question} from './question';
import { EditableText } from './editable-text';

export class FormConstructor
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.formData = {
			'title' : 'Название формы',
			'chapters': [
				{
					'title': 'Название раздела',
					'description': 'Описание раздела',
					'questions': [
						{
							'title': 'Название 1',
							'description': 'Описание 1',
							'position': 1,
							'type' : 1,
						},
						{
							'title': 'Название 2',
							'description': 'Описание 2',
							'position': 2,
							'type' : 1,
						},
						{
							'title': 'Название 3',
							'description': 'Описание 3',
							'position': 3,
							'type' : 1,
						},
					]
				}
			]
		}
		this.questions = []
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
			<div class="container d-flex justify-content-center">
				${this.renderEditableTitle()}
			</div>
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
		console.log(this.formData)
		const wrap = Tag.render`
		<div class="container">
			${this.formData.chapters[0].questions.map((questionData) => {
				let question = null
				if (questionData.type === 1)
				{
					question = new Question(questionData);
				}
				this.questions.push(question);
				return question.render();
			})}
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
		const hardCodeChapter = {
			'title': 'Заголовок раздела',
			'description': 'Описание раздела',
			'position': 1,
			'questions': this.questions.map((question) => {
				if (!question.isDeleted)
				{
					return question.getData();
				}
			})
		}
		const hardCodeForm = {
			'title': this.title.innerText,
			'chapters': [
				hardCodeChapter
			]
		}
		console.log(hardCodeForm)
	}

	renderEditableTitle(): HTMLElement
	{
		const wrap = Tag.render`
		<h1 class="text-center mt-5 mb-4">${this.formData.title}</h1>
		`;
		new EditableText(wrap);
		this.title = wrap
		return this.title;
	}
}
