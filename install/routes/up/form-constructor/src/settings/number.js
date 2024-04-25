import {Tag, Event } from 'main.core';
import {Setting} from './setting';

export class Number extends Setting
{
	renderInput()
	{
		const wrap = Tag.render`
			<input type="number" class="form-control w-25" value="${this.value != null ? this.value : ''}">
		`
		Event.bind(wrap, 'change', () => this.onChangeInputHandler(wrap))
		this.input = wrap;
		return this.input;
	}

	getType()
	{
		return 'number'
	}
}