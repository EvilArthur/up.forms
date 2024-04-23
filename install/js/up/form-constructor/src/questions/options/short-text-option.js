import { Event, Loc, Tag } from 'main.core';

export class ShortTextOption
{
	constructor(id, title, isHaveRightAnswerObject)
	{
		this.id = id;
		this.field = null;
		this.title = title;
		this.isHaveRightAnswerObject = isHaveRightAnswerObject;
	}
	render()
	{
		let wrap
		if (!this.isHaveRightAnswerObject.value)
		{
			wrap = Tag.render`<p class="text-decoration-underline mb-0">Короткий ответ</p>`;
		}
		else
		{
			wrap = Tag.render`<input class="form-control" type="text" placeholder="Введите правильный ответ" value="${this.title}">`;
			Event.bind(wrap, 'change', () => {this.title = wrap.value})
		}
		this.field = wrap
		return this.field;
	}

	getData()
	{
		if (this.isHaveRightAnswerObject.value)
		{
			return {
				'ID': this.id,
				'TITLE': this.field.value,
				'IS_RIGHT_ANSWER': true
			}
		}
		return {
			'ID': this.id,
			'TITLE': this.title,
			'IS_RIGHT_ANSWER': null
		};
	}
}