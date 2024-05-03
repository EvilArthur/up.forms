import {Tag } from 'main.core';
import {Setting} from './setting';

export class Checkbox extends Setting
{
	renderInput()
	{
		const checked = this.value === 'true' || this.value === true ? 'checked' : '';
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