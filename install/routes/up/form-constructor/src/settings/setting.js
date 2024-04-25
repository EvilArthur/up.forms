import { Event, Tag } from 'main.core';

export class Setting
{
	constructor(id, title, value = null)
	{
		this.title = title;
		this.value = value;
		this.id = id;
		this.input = null;
	}

	render()
	{
		const wrap = Tag.render`<div class="mb-3">
									<label class="form-label">${this.title}</label>
									${this.renderBindedInput()}
								</div>`;
		return wrap;
	}

	renderInput()
	{
		throw 'Error';
	}

	renderBindedInput()
	{
		const wrap = this.renderInput();
		Event.bind(wrap, 'change', () => this.onChangeInputHandler(wrap));
		return wrap;
	}

	onChangeInputHandler(input)
	{
		this.value = input.value;
	}

	getData()
	{
		return this.value === '' ? null : this.value;
	}

	getId()
	{
		return this.id;
	}
}