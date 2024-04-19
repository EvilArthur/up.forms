import {Tag, Event } from 'main.core';
import {Setting} from './setting';

export class Datetime extends Setting
{
	renderInput()
	{
		const wrap = Tag.render`
			<input type="datetime-local" class="form-control w-25" value="${this.value != null ? this.value : ''}">
		`
		Event.bind(wrap, 'change', () => this.onChangeInputHandler(wrap))
		this.input = wrap;
		return this.input;
	}

	getType()
	{
		return 'datetime-local'
	}
}