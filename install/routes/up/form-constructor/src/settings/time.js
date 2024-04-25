import {Tag, Event } from 'main.core';
import {Setting} from './setting';

export class Time extends Setting
{
	renderInput()
	{
		const wrap = Tag.render`
			<input type="time" class="form-control w-25" value="${this.value != null ? this.value : ''}">
		`
		Event.bind(wrap, 'change', () => this.onChangeInputHandler(wrap))
		this.input = wrap;
		return this.input;
	}

	getType()
	{
		return 'time'
	}
}