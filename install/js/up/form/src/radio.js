import { Options } from './options';

export class Radio extends Options
{
	constructor(options, questionName, questionId)
	{
		super(options, questionName, questionId);
		this.type = 'radio';
	}

	onButtonChangeHandler(event)
	{
		this.subAnswer = [event.target.value];
	}
}