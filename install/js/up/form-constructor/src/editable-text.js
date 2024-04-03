import {Tag, Event, Type} from 'main.core';

export class EditableText
{
	constructor(element)
	{
		this.element = element;
		this.setupEditHandler();
	}

	setupEditHandler()
	{
		Event.bind(this.element, 'click', this.onEditableTextClickHandler.bind(this))
	}
	onEditableTextClickHandler()
	{
		const wrap = Tag.render`
		<input type="text" class="form-control form-control-sm w-50" value="${this.element.innerText}">
		`
		Event.bind(wrap, 'keypress',
			(event) => {
				if (event.key === 'Enter') {
					this.onEditableTextEndChangeHandler.bind(this);
				}
			});
		Event.bind(wrap, 'blur', this.onEditableTextEndChangeHandler.bind(this))
		this.input = wrap

		this.element.replaceWith(this.input);
		this.input.focus();

	}

	onEditableTextEndChangeHandler()
	{

		this.element.innerText = this.input.value;
		this.input.replaceWith(this.element)
	}
}