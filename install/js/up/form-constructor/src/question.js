import { Event, Loc, Tag } from 'main.core';
import { EditableText } from './editable-text';
import { Option } from './option';

export class Question
{
	constructor(chapter_id, field_id, id, position, title, optionData, fieldData)
	{
		this.layout = {};
		this.titleObject = {value: title};
		this.chapter_id = chapter_id;
		this.field_id = field_id;
		this.id = id;
		this.position = position;
		this.fieldData = fieldData;
		this.isDeleted = false;
		this.optionsData = optionData;
		this.options = optionData.map((option) => {
			return new Option(option.id, option.value)
		});
	}

	render(): HTMLElement
	{
		if (this.isDeleted)
		{
			return Tag.render``;
		}
		const wrap = Tag.render`
			<div class="card mb-3 mt-3">
				<div class="card-header">
				<div class="container">
					<div class="row">
						<div class="col text-left">
							${this.renderEditableTitle()}
						</div>
						<div class="col">
						</div>
						<div class="col text-end">
							${this.renderTypes()}
						</div>
						<div class="col text-end">
							${this.renderRemoveQuestionButton()}
						</div>
					</div>
				</div>
				</div>
				<div class="card-body">
					${this.renderBody()}
				</div>
				<div class="card-footer">
					<p>"Обязетльный вопрос"</p>
				</div>
			</div>`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;
		return this.layout.wrap;
	}

	renderRemoveQuestionButton(): HTMLElement
	{
		const wrap = Tag.render`
			<button type="button" class="btn btn-danger">Удалить</button>
		`;
		Event.bind(wrap, 'click', this.onRemoveQuestionButtonClickHandler.bind(this));
		return wrap;
	}

	onRemoveQuestionButtonClickHandler()
	{
		this.isDeleted = true;
		this.layout.wrap.remove();
	}

	renderEditableTitle(): HTMLElement
	{
		const wrap = Tag.render`
		<h3 class="form-label">${this.titleObject.value}</h3>
		`;
		new EditableText(wrap, this.titleObject);
		this.layout.title = wrap;
		return this.layout.title;
	}

	renderTypes()
	{
		const wrap = Tag.render`
			<select class="form-select" aria-label="Default select example">
				${this.fieldData.map((field) => this.renderType(field))}
			</select>
		`;
		Event.bind(wrap, 'change', () => {
			this.onChangeTypesHandler(wrap.value);
		});
		return wrap;
	}

	onChangeTypesHandler(value)
	{
		this.field_id = parseInt(value);
		this.render();
	}

	renderType(field)
	{
		const wrap = Tag.render`
						<option value="${field.ID}">${Loc.getMessage(field.Title)}</option>
									`;
		if (this.field_id === parseInt(field.ID))
		{
			wrap.setAttribute('selected', '');
		}
		return wrap;
	}

	renderBody()
	{
		let wrap;
		console.log(this.field_id);
		if (this.field_id === 1)
		{
			wrap = Tag.render`<p class="text-decoration-underline mb-0">Краткий ответ</p>`;

		}
		else if (this.field_id === 2)
		{
			wrap = Tag.render`<div class="container">
								${this.renderAddOptionButton()}
								${this.renderOptions()}
							  </div>`;
		}
		this.layout.body?.replaceWith(wrap);
		this.layout.body = wrap;
		return this.layout.body;
	}

	renderOptions()
	{
		const wrap = Tag.render`<div class="container">
			${this.optionsData.map((option) => {
				const radio = new Option(option.ID, option.Value, this.id);
				this.options.push(radio);
				return radio.render();
			})}
		</div>`;
		this.layout.options?.replaceWith(wrap);
		this.layout.options = wrap;
		return this.layout.options;
	}

	renderAddOptionButton()
	{
		const wrap = Tag.render`<button class="btn btn-primary btn-sm">+</button>`;
		Event.bind(wrap, 'click', this.onAddOptionButtonClickHandler.bind(this));
		return wrap;
	}

	onAddOptionButtonClickHandler()
	{
		const option = new Option(null, 'Новая опция', this.id)
		this.layout.body.append(option.render());
		this.options.push(option);
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
		this.renderOptions();
	}

	getData()
	{
		if (this.isDeleted)
		{
			return null;
		}
		const data = {
			'Title': this.titleObject.value,
			'Position': this.position,
			'Field_ID': this.field_id,
			'ID': this.id,
			'Options': this.options.map((options) => options.getData())
		};
		return data;
	}
}
