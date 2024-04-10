import {Tag, Event, Type} from 'main.core';
import { Option } from '../../form-constructor/src/option';

export class Question
{
	constructor(chapter_id, field_id, id, position, title, optionData)
	{
		this.layout = {}
		this.layout.wrap = null
		this.layout.input = null
		this.title = title
		this.chapter_id = chapter_id;
		this.field_id = field_id;
		this.id = id;
		this.position = position;
		this.options = optionData;
		this.selectedValue = null;
	}
	render(): HTMLElement
	{
		const wrap = Tag.render`
		<div class="mb-3">
			<label class="form-label">${this.title}</label>
			${this}
			${this.renderInput()}
		</div>
		`
		this.layout.wrap = wrap
		return this.layout.wrap;
	}

	renderInput()
	{
		let input = null
		if (this.field_id === 1)
		{
			input = this.renderShortTextInput();
		}
		else if(this.field_id === 2)
		{
			input = this.renderRadios();
		}
		this.layout.input = input;
		return this.layout.input;
	}
	renderShortTextInput()
	{
		const wrap = Tag.render`
			<input class="form-control" type="text">
		`
		Event.bind(wrap, 'change', this.onShortTextInputChangeHandler.bind(this))
		return wrap
	}

	onShortTextInputChangeHandler(event)
	{
		this.selectedValue = event.target.value;
	}

	renderRadios()
	{
		const wrap = Tag.render`
		<div class="container">
			${this.options.map((option) => this.renderRadio(option.ID, option.Value))}
			${this.renderClearRadioButton()}
		</div>`
		this.layout.input?.replaceWith(wrap);
		this.layout.input = wrap;

		return this.layout.input;
	}

	renderRadio(id, value)
	{
		const wrap = Tag.render`
			<div class="form-check">
				<input class="form-check-input" type="radio" name="${this.title}_${this.id}" value="${id}">
				<label class="form-check-label">${value}</label>
			</div>
		`
		Event.bind(wrap, 'change', this.onRadioChangeHandler.bind(this))
		return wrap;
	}

	onRadioChangeHandler(event)
	{
		this.selectedValue = event.target.value;
	}

	renderClearRadioButton()
	{
		const wrap = Tag.render`
		<button class="btn btn-primary btn-sm">Очистить</button>`;
		Event.bind(wrap, 'click', this.onClearRadioButtonClickHandler.bind(this));
		return wrap;
	}

	onClearRadioButtonClickHandler()
	{
		this.renderRadios();
	}

	getAnswer()
	{
		return {
			'id': this.id,
			'answer':this.selectedValue,
		}
	}
}
