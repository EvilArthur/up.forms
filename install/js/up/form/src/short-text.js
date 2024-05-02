import { Event, Tag } from 'main.core';

export class ShortText
{
	constructor(answer)
	{
		this.answer = answer;
		this.subAnswer = [];
		this.value = '';
	}

	render()
	{
		console.log(this.answer);
		if (this.answer && this.answer.SUBANSWER.length !== 0)
		{
			this.value = this.answer.SUBANSWER[0].VALUE;
			this.subAnswer.push(this.answer.SUBANSWER[0].VALUE);
		}
		else
		{
			this.value = '';
		}

		const wrap = Tag.render`
			<input class="form-control" type="text" value="${this.value}">
		`;
		Event.bind(wrap, 'change', this.onChangeHandler.bind(this));
		return wrap;
	}

	onChangeHandler(event)
	{
		this.subAnswer = [event.target.value];
	}

	getAnswer()
	{
		return this.subAnswer;
	}
}