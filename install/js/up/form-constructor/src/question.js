import { Event, Tag } from 'main.core';
import { EditableText } from './editable-text';

export class Question
{
	constructor(questionData)
	{
		this.layout = null;
		this.title = null
		this.questionData = questionData
		this.isDeleted = false;
	}

	render(): HTMLElement
	{
		if (this.isDeleted)
		{
			return Tag.render``;
		}
		const wrap = Tag.render`
		<div class="container mb-3">
			${this.renderEditableTitle()}
			<div class="container d-flex justify-content-center align-items-center ps-0">
				<input class="form-control me-2" type="text">
				 ${this.renderAddQuestionButton()}
			</div>
		</div>
		`;
		this.layout = wrap;
		return this.layout;
	}

	renderAddQuestionButton(): HTMLElement
	{
		const wrap = Tag.render`
			<button type="button" class="btn btn-danger">Удалить</button>
		`;
		Event.bind(wrap, 'click', this.onRemoveQuestionButtonClickHandler.bind(this));

		return wrap;
	}

	onRemoveQuestionButtonClickHandler()
	{
		this.isDeleted = true
		this.layout.remove();
	}

	renderEditableTitle(): HTMLElement
	{
		const wrap = Tag.render`
		<label class="form-label">${this.questionData.title}</label>
		`;
		new EditableText(wrap);
		this.title = wrap
		return this.title;
	}

	getData()
	{
		return {
			'title': this.title.innerText,
			'description': this.questionData.description,
			'position': this.questionData.position,
			'type': this.questionData.type
		}
	}
}
