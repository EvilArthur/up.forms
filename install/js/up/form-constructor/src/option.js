import { Event, Tag } from 'main.core';
import { EditableText } from './editable-text';

export class Option
{
	constructor(id, value, questionName)
	{
		this.id = id;
		this.questionName = questionName;
		this.labelObject = { value: value };
		this.layout = {};
		this.isDeleted = false;
	}

	render()
	{
		const wrap = Tag.render`
		<div class="form-check">
			${this.renderEditableLabel()}
			${this.renderDeleteButton()}
		</div>`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;
		return this.layout.wrap;
	}

	renderEditableLabel()
	{
		const wrap = Tag.render`<label class="form-check-label">${this.labelObject.value}</label>`;
		new EditableText(wrap, this.labelObject);
		return wrap;
	}

	renderRadioButton()
	{
		const wrap = Tag.render`<input class="form-check-input" type="radio" name="${this.questionName}" value="${this.id}" autocomplete="off">`;
		this.layout.radioButton = wrap;
		return this.layout.radioButton;
	}

	renderDeleteButton()
	{
		if (this.isDeleted)
		{
			return Tag.render``;
		}
		const wrap = Tag.render`
			<button type="button" class="btn-close"></button>
		`;
		Event.bind(wrap, 'click', this.onDeleteButtonClickHandler.bind(this));
		return wrap;
	}

	onDeleteButtonClickHandler()
	{
		this.isDeleted = true;
		this.layout.wrap.remove();
	}

	getData()
	{
		if (this.isDeleted)
			return null;
		return {
			ID: this.id,
			Value: this.labelObject.value,
		};
	}
}