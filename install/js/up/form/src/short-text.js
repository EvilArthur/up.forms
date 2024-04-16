import { Event, Tag } from 'main.core';

export class ShortText
{
	constructor()
	{
		this.subAnswer = [];
	}

	render()
	{
		const wrap = Tag.render`
			<input class="form-control" type="text">
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