import { Event, Loc, Tag } from 'main.core';
import {Option} from './button-option';

export class CheckboxOption extends Option
{
	renderButton()
	{
		if (!this.isHaveRightAnswerObject.value)
		{
			return;
		}
		const wrap = Tag.render`<input class="form-check-input" type="checkbox" name="${this.questionName}_${this.questionId}" value="${this.id}" ${this.checked ? 'checked' : ''}>`;
		this.layout.button = wrap;
		return this.layout.button;
	}
}