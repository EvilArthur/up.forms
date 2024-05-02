import { Options } from './options';

export class Radio extends Options
{
	constructor(options, questionName, questionId, answer)
	{
		super(options, questionName, questionId, answer);
		this.type = 'radio';
	}

	onButtonChangeHandler(event)
	{
		this.subAnswer = [event.target.value];
	}
}