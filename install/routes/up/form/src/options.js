import { Event, Tag } from 'main.core';

export class Options
{
	constructor(options)
	{
		this.layout = {};
		this.options = options;
		this.type = null;
		this.selectedValue = null;

	}

	render()
	{
		const wrap = Tag.render`
		<div class="container">
			${this.options.map((option) => this.renderButton(option.ID, option.Value, this.type))}
			${this.renderClearButton()}
		</div>`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;

		return this.layout.wrap;
	}

	renderButton(id, value, type)
	{
		const wrap = Tag.render`
			<div class="form-check">
				<input class="form-check-input" type="${type}" name="${this.title}_${this.id}" value="${id}">
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
		<button class="btn btn-primary btn-sm">Очистить</button>`;
		Event.bind(wrap, 'click', this.onClearRadioButtonClickHandler.bind(this));
		return wrap;
	}

	onClearRadioButtonClickHandler()
	{
		this.selectedValue = null;
		this.render();
	}

	getAnswer()
	{
		return this.selectedValue;
	}
}
