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
			wrap = Tag.render`
				<p class="mb-0">
					${Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_SHORT_TEXT_LAYOUT')}
				</p>`;
		}
		else
		{
			wrap = Tag.render`
				<input class="form-control" type="text"
 				placeholder="${Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_SHORT_TEXT_PLACEHOLDER')}"
 				 value="${this.title}">`;
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