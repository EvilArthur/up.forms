import {Tag, Event } from 'main.core';
import {Setting} from './setting';

export class Checkbox extends Setting
{
	renderInput()
	{
		const checked = this.value ? 'checked' : '';
		const wrap = Tag.render`
			<input class="form-check-input" type="checkbox" ${checked}>
		`
		this.input = wrap;
		return this.input;
	}

	onChangeInputHandler(input)
	{
		this.value = input.checked;
	}

	getData()
	{
		return this.input.checked
	}

	getType()
	{
		return 'checkbox'
	}
}