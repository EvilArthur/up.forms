import { Event, Tag } from 'main.core';

export class Options
{
	constructor(options, questionName, questionId, answer)
	{
		this.layout = {};
		this.options = options;
		this.questionName = questionName
		this.questionId = questionId
		this.type = null;
		this.subAnswer = [];
		this.answer = answer
	}

	render()
	{
		const wrap = Tag.render`
		<div class="test-question">
			${this.options.map((option) => this.renderButton(option.ID, option.TITLE, this.type))}
			${this.renderClearButton()}
		</div>`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;

		return this.layout.wrap;
	}

	renderButton(id, value, type)
	{
		this.value = '';
		if (this.answer && this.answer.SUBANSWER.length !== 0)
		{
			this.answer.SUBANSWER.forEach((subAnswer) =>
			{
				if (Number(subAnswer.VALUE) === Number(id))
				{
					this.value = 'checked';
					this.subAnswer.push(id);
				}
			});
		}
		const wrap = Tag.render`
			<div class="form-check">
				<input class="form-check-input" type="${type}" name="${this.questionName}_${this.questionId}" value="${id}" ${this.value}>
				<label class="form-check-label">${value}</label>
			</div>
		`;
		Event.bind(wrap, 'change', this.onButtonChangeHandler.bind(this));
		return wrap;
	}

	onButtonChangeHandler(event)
	{
		throw 'This is abstract class function';
	}

	renderClearButton()
	{
		const wrap = Tag.render`
		<button class="btn clear-from-correct-answer">Очистить</button>`;
		Event.bind(wrap, 'click', this.onClearRadioButtonClickHandler.bind(this));
		return wrap;
	}

	onClearRadioButtonClickHandler()
	{
		this.subAnswer = [];
		this.render();
	}

	getAnswer()
	{
		return this.subAnswer;
	}
}
