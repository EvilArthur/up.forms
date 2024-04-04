import {Tag, Event, Type} from 'main.core';

export class EditableText
{
	constructor(element, dataObject, titleProperty)
	{
		this.element = element;
		this.dataObject = dataObject;
		this.titleProperty = titleProperty;
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
		const newTitle = this.input.value;
		this.element.innerText = newTitle;
		this.dataObject[this.titleProperty] = newTitle; // Обновляем Title в dataObject
		this.input.replaceWith(this.element);
	}
}