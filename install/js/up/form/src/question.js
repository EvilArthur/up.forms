import { Tag, Event, Type } from 'main.core';
import { Option } from '../../form-constructor/src/option';
import { Radio } from './radio';
import {ShortText} from './short-text';
import {Checkbox} from './checkbox';

export class Question
{
	constructor(chapter_id, field_id, id, position, title, optionData)
	{
		this.layout = {};
		this.layout.wrap = null;
		this.layout.input = null;
		this.title = title;
		this.chapter_id = chapter_id;
		this.field_id = field_id;
		this.id = id;
		this.position = position;
		this.options = optionData;
		this.field = null
	}

	render(): HTMLElement
	{
		const wrap = Tag.render`
		<div class="mb-3">
			<label class="form-label">${this.title}</label>
			${this}
			${this.renderInput()}
		</div>
		`;
		this.layout.wrap = wrap;
		return this.layout.wrap;
	}

	renderInput()
	{
		if (this.field_id === 1)
		{
			this.field = new ShortText();
		}
		else if (this.field_id === 2)
		{
			this.field = new Radio(this.options);
		}
		else if (this.field_id === 3)
		{
			this.field = new Checkbox(this.options);
		}
		this.layout.input = this.field.render();
		return this.layout.input;
	}

	getAnswer()
	{
		return {
			'ID': this.id,
			'SUBANSWER': this.field.getAnswer(),
		};
	}
}
