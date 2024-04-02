import {Tag, Event, Type} from 'main.core';

export class Question
{
	constructor(questionData, questionNumber, questions = [])
	{
		this.layout = null
		this.questionData = questionData
		this.questionNumber = questionNumber
		this.questions = questions
		this.title = null
		this.id = questionNumber - 1
	}
	render(): HTMLElement
	{
		if (this.questions[this.id] === null)
		{
			return Tag.render``;
		}
		const wrap = Tag.render`
		<div class="mb-3">
			${this.renderEditableTitle()}
			<div class="container d-flex justify-content-center align-items-center">
				<input class="form-control me-2" id="question-${this.questionNumber}" type="text"
				 placeholder="Ответ ${this.questionNumber}" name="answer-${this.questionNumber}">
				 ${this.renderAddQuestionButton()}
			</div>
		</div>
		`
		this.layout = wrap
		return this.layout;
	}

	renderAddQuestionButton(): HTMLElement
	{
		const wrap = Tag.render`
			<button type="button" class="btn btn-danger">Удалить</button>
		`;
		Event.bind(wrap, 'click', this.onRemoveQuestionButtonClickHandler.bind(this));


		return wrap
	}

	onRemoveQuestionButtonClickHandler()
	{
		this.questions[this.id] = null
		this.layout.remove();
	}

	renderEditableTitle(): HTMLElement
	{
		const wrap = Tag.render`
		<label for="question-${this.questionNumber}" class="form-label">${this.questionData.title}</label>
		`

		Event.bind(wrap, 'click', this.onEditableTitleClickHandler.bind(this));

		this.title?.replaceWith(wrap);
		this.title = wrap;
		return this.title
	}

	onEditableTitleClickHandler()
	{
		const wrap = Tag.render`
		<input type="text" class="form-control form-control-sm w-25" value="${this.questionData.title}">
		`
		Event.bind(wrap, 'keypress',
			(event) => {
				if (event.key === 'Enter') {
					this.onEditableTitleEndChangeHandler();
				}
			});
		Event.bind(wrap, 'blur', this.onEditableTitleEndChangeHandler.bind(this))

		this.title?.replaceWith(wrap);
		this.title = wrap;
		this.title.focus();

	}

	onEditableTitleEndChangeHandler()
	{
		this.questionData.title = this.title.value;
		Event.unbindAll(this.title, 'keypress');
		Event.unbindAll(this.title, 'blur');
		this.renderEditableTitle();
	}


}
