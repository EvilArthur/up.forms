import { Tag, Event, Type } from 'main.core';
import { Option } from '../../form-constructor/src/option';
import { Radio } from './radio';
import {ShortText} from './short-text';
import {Checkbox} from './checkbox';

export class Question
{
	constructor(chapter_id, field_id, id, position, title, optionData, isRequired, answer = false)
	{
		this.layout = {};
		this.layout.wrap = null;
		this.layout.input = null;
		this.title = title;
		this.chapter_id = parseInt(chapter_id);
		this.field_id = parseInt(field_id);
		this.id = parseInt(id);
		this.position = parseInt(position);
		this.options = optionData;
		this.isRequired = this.toBoolean(isRequired);
		this.field = null;
		this.answer = answer
	}

	render(): HTMLElement
	{
		const wrap = Tag.render`
		<div class="mb-3">
			<label class="form-label">${this.title}</label>
			${this}
			${this.renderInput()}
			${this.renderRequired()}
		</div>
		`;
		this.layout.wrap = wrap;
		return this.layout.wrap;
	}

	renderInput()
	{
		if (this.field_id === 1)
		{
			this.field = new ShortText(this.answer);
		}
		else if (this.field_id === 2)
		{
			this.field = new Radio(this.options, this.title, this.id, this.answer);
		}
		else if (this.field_id === 3)
		{
			this.field = new Checkbox(this.options, this.title, this.id, this.answer);
		}
		this.layout.input = this.field.render();
		return this.layout.input;
	}

	renderRequired()
	{
		if (!this.isRequired)
		{
			return null;
		}
		const wrap = Tag.render`<div class="recuired-question"><lable class="recuired-question">обязательный вопрос</lable></div>`
		return wrap;
	}

	getAnswer()
	{
		return {
			'ID': this.id,
			'SUBANSWER': this.field.getAnswer(),

		};
	}

	toBoolean(variable)
	{
		if (variable === 'true' || variable === true)
		{
			return true;
		}
		else if (variable === 'false' || variable === false)
		{
			return false;
		}
		return variable
	}
}
