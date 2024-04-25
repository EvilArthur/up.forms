import { Event, Loc, Tag } from 'main.core';
import { EditableText } from '../editable-text';

export default class Question
{
	constructor(chapter_id, id, position, title, optionData, settingData, fieldData)
	{
		this.layout = {
			typeSelect: null,
		};
		this.titleObject = { value: title };
		this.chapterId = chapter_id;
		this.id = id;
		this.position = position;
		this.fieldData = fieldData;
		this.isDeleted = false;
		this.settingData = settingData;
		this.isHaveRightAnswerObject = { value: this.toBoolean(this.settingData.find(setting => setting.SETTINGS_ID === 1).VALUE) };
		this.fieldId = null;
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
							${this.renderAutocheck()}
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

	renderAutocheck()
	{
		const buttonNoCheck = Tag.render`<input class="form-check-input" type="radio" name="${this.position}_${this.titleObject.value}_checking"
								${!this.isHaveRightAnswerObject.value ? 'checked' : ''}>`;
		Event.bind(buttonNoCheck, 'change', () => {
			this.isHaveRightAnswerObject.value = false;
			this.render();
		});

		const buttonCheck = Tag.render`<input class="form-check-input" type="radio" name="${this.position}_${this.titleObject.value}_checking"
										${this.isHaveRightAnswerObject.value ? 'checked' : ''}>`;
		Event.bind(buttonCheck, 'change', () => {
			this.isHaveRightAnswerObject.value = true;
			this.render();
		});

		const wrap = Tag.render`<div class="container">
									<div class="form-check">
										${buttonNoCheck}
											<label class="form-check-label">
												Без проверки
											</label>
									</div>
									<div class="form-check">
										${buttonCheck}
											<label class="form-check-label">
												Тестовый
											</label>
									</div>
							</div>`;
		return wrap;
	}

	renderTypes()
	{
		if (!this.layout.typeSelect)
		{
			const wrap = Tag.render`
			<select class="form-select">
				${this.fieldData.map((field) => this.renderType(field))}
			</select>
		`;
			this.layout.typeSelect = wrap;
		}
		return this.layout.typeSelect;
	}

	renderType(field)
	{
		const wrap = Tag.render`
						<option value="${field.ID}">${Loc.getMessage(field.TITLE)}</option>
									`;
		if (this.fieldId === parseInt(field.ID))
		{
			wrap.setAttribute('selected', '');
		}
		return wrap;
	}

	renderBody()
	{
		const wrap = Tag.render`<div class="container">
								${this.renderAddOptionButton()}
								${this.renderOptions()}
								${this.renderClearButton()}
							  </div>`;
		this.layout.body?.replaceWith(wrap);
		this.layout.body = wrap;
		return this.layout.body;
	}

	renderOptions()
	{
		const wrap = Tag.render`<div class="container">
			${this.options.map((option) => option?.render())}
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
		const option = new Option(null, 'Новая опция', this.id, 'radio', this.isHaveRightAnswerObject);
		this.layout.options.append(option.render());
		this.options.push(option);
	}

	renderClearButton()
	{
		if (!this.isHaveRightAnswerObject.value)
		{
			return;
		}
		const wrap = Tag.render`<button class="btn btn-primary btn-sm">Очистить</button>`;
		Event.bind(wrap, 'click', this.onClearRadioButtonClickHandler.bind(this));
		return wrap;
	}

	onClearRadioButtonClickHandler()
	{
		this.options.forEach((option) => {
			if (!option)
			{
				return;
			}
			option.checked = false;
		});
		this.render();
	}

	getOptionData()
	{
		return this.options.map((options) => options?.getData());
	}

	getSettingData()
	{
		return [{
			'SETTINGS_ID': 1,
			'VALUE': this.isHaveRightAnswerObject.value,
		}];
	}

	getData()
	{
		if (this.isDeleted)
		{
			return null;
		}
		const data = {
			'TITLE': this.titleObject.value,
			'POSITION': this.position,
			'FIELD_ID': this.fieldId,
			'ID': this.id,
			'OPTION': this.getOptionData(),
			'SETTINGS': this.getSettingData(),
		};
		return data;
	}

	toBoolean(variable)
	{
		if (variable === 'true' || variable === true)
		{
			return true;
		}
		else if (variable === 'false' || variable === false)
		{
			return false;
		}
		return variable
	}
}
