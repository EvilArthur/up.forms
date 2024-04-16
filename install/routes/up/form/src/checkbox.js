import { Options } from './options';

export class Checkbox extends Options
{
	constructor(options)
	{
		super(options);
		this.selectedValue = [];
		this.type = 'checkbox';
	}

	onButtonChangeHandler(event)
	{
		if (event.target.checked)
		{
			this.selectedValue.push(event.target.value)
		}
		else
		{
			const index = this.selectedValue.indexOf(event.target.value);
			if (index !== -1) {
				this.selectedValue.splice(index, 1);
			}
		}
	}
}