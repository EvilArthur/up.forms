import {Tag, Event, Type} from 'main.core';
import {escape} from './escape';

export class EditableText
{
	constructor(element, textObject, renderFunction)
	{
		this.element = element;
		this.textObject = textObject;
		this.renderFunction = renderFunction;
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

		Event.bind(wrap, 'blur', this.onEditableTextEndChangeHandler.bind(this))
		Event.bind(wrap, 'keypress',
			(event) => {
				if (event.key === 'Enter') {
					this.onEditableTextEndChangeHandler();
				}
			});

		this.input = wrap

		this.element.replaceWith(this.input);
		this.input.focus();

	}

	onEditableTextEndChangeHandler() {
		const newTitle = escape(this.input.value.trim());
		this.textObject.value = newTitle;
		if (newTitle === '')
		{
			return;
		}
		this.input.replaceWith(this.renderFunction());
	}
}