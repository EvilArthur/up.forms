import { Options } from './options';

export class Checkbox extends Options
{
	constructor(options)
	{
		super(options);
		this.type = 'checkbox';
	}

	onButtonChangeHandler(event)
	{
		if (event.target.checked)
		{
			this.subAnswer.push(event.target.value)
		}
		else
		{
			const index = this.subAnswer.indexOf(event.target.value);
			if (index !== -1) {
				this.subAnswer.splice(index, 1);
			}
		}
	}
}