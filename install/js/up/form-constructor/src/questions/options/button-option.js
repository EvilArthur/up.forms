import { Event, Tag, Loc } from 'main.core';
import { EditableText } from '../../editable-text';

export class Option
{
	constructor(id, title, questionName, questionId, isRightAnswer,isHaveRightAnswerObject)
	{
		this.id = id;
		this.questionName = questionName;
		this.questionId = questionId;
		this.labelObject = { value: title };
		this.layout = {};
		this.isDeleted = false;
		this.checked = isRightAnswer;
		this.isHaveRightAnswerObject = isHaveRightAnswerObject;
	}

	render()
	{
		if (this.isDeleted)
		{
			return;
		}
		const wrap = Tag.render`
		<div class="form-check inner-question-options-wrap">
			${this.getBindedButton()}
			${this.renderEditableLabel()}
			${this.renderDeleteButton()}
		</div>`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;
		return this.layout.wrap;
	}

	renderEditableLabel()
	{
		if (this.labelObject.value === '')
		{
			this.labelObject.value = Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_OPTION_DEFAULT_TITLE');
		}
		const wrap = Tag.render`<label class="form-check-label question-option-title">${this.labelObject.value}</label>`;
		new EditableText(wrap, this.labelObject, this.renderEditableLabel.bind(this));
		this.layout.label?.replaceWith(wrap)
		this.layout.label = wrap;
		return this.layout.label;
	}

	renderButton()
	{
		if (!this.isHaveRightAnswerObject.value)
		{
			return;
		}
		const wrap = Tag.render`<input class="form-check-input" type="${null}"
 						name="${this.questionName}" value="${this.id} ${this.checked ? 'checked' : ''}">`;
		this.layout.button = wrap;
		return this.layout.button;
	}

	getBindedButton()
	{
		const wrap = this.renderButton();
		Event.bind(wrap, 'change', this.onChangeButtonHandler.bind(this))
		return wrap
	}

	onChangeButtonHandler()
	{
		this.checked = !this.checked;
	}

	renderDeleteButton()
	{
		if (this.isDeleted)
		{
			return Tag.render``;
		}
		const wrap = Tag.render`
			<button type="button" class="btn-close"></button>
		`;
		Event.bind(wrap, 'click', this.onDeleteButtonClickHandler.bind(this));
		return wrap;
	}

	onDeleteButtonClickHandler()
	{
		this.isDeleted = true;
		this.layout.wrap.remove();
	}

	getData()
	{
		if (this.isDeleted)
			return null;
		return {
			'ID': this.id,
			'TITLE': this.layout.label.innerText,
			'IS_RIGHT_ANSWER': this.isHaveRightAnswerObject.value ? this.layout.button.checked : null
		};
	}
}