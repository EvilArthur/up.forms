import { Options } from './options';

export class Radio extends Options
{
	constructor(options)
	{
		super(options);
		this.type = 'radio';
	}

	onButtonChangeHandler(event)
	{
		this.subAnswer = [event.target.value];
	}
}