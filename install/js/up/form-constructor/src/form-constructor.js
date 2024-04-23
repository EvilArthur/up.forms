import { Tag, Event } from 'main.core';
import { Constructor } from './constructor';
import {Settings} from './settings';
import { FormManager } from './form-manager';

export class FormConstructor
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.id = options.id;
		if (!this.layout.wrap)
		{
			throw new Error(`TaskList: container is not found`);
		}
		this.formData = {
			CHAPTER: [],
		};
		this.isLoading = true;
		this.layout.wrap.append(this.render())
		this.loadFormData();
	}


	render()
	{
		let wrap
		if (this.isLoading)
		{
			wrap = Tag.render`
			<div class="container d-flex justify-content-center">
				<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
					<span class="sr-only"></span>
				</div>
			</div>
			`;
		}
		else
		{
			console.log(this.formData);
			this.construct = new Constructor(this.formData, this.fieldData);
			this.settings = new Settings(this.formData.SETTINGS, this.allSettingsData);
			this.layout.header = this.renderHeader();
			this.layout.main = this.construct.render();
			this.layout.footer = this.renderFooter();
			wrap = Tag.render`<div></div>`
			wrap.append(this.layout.header);
			wrap.append(this.layout.main);
			wrap.append(this.layout.footer);
		}
		this.layout.form?.replaceWith(wrap);
		this.layout.form = wrap;
		return wrap;
	}

	async loadFormData()
	{
		this.fieldData = await FormManager.getFieldData();
		this.allSettingsData = await FormManager.getSettingsData();
		if (this.id !== 0)
		{
			this.formData = await FormManager.getFormData(this.id);
		}
		else
		{
			this.formData.TITLE = 'Новая форма'
			this.formData.CHAPTER[0] = {
				'TITLE': 'Заголовок раздела',
				'DESCRIPTION': 'Описание раздела',
				'POSITION': 1,
				'QUESTION': [],
				'ID': null,
			};
			this.formData.SETTINGS = [];
		}
		this.isLoading = false
		this.render();
	}

	renderHeader()
	{
		const wrap = Tag.render`
		<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
			<li class="nav-item">
				${this.renderConstructorTab()}
			</li>
			<li class="nav-item">
				${this.renderSettingTab()}
			</li>
		</ul>`;
		return wrap;
	}

	renderConstructorTab()
	{
		const wrap = Tag.render`<button class="nav-link active" data-toggle="tab" role="tab">Вопросы</button>`;
		Event.bind(wrap, 'click', this.onConstructorTabClickHandler.bind(this));
		this.layout.constructorTab = wrap;
		return this.layout.constructorTab;
	}

	onConstructorTabClickHandler()
	{
		this.layout.constructorTab.classList.add('active');
		this.layout.settingTab.classList.remove('active');
		const wrap = this.construct.render()
		this.layout.main?.replaceWith(wrap);
		this.layout.main = wrap;
	}

	renderSettingTab()
	{
		const wrap = Tag.render`<button class="nav-link" data-toggle="tab" role="tab">Настройки</button>`;
		Event.bind(wrap, 'click', this.onSettingTabClickHandler.bind(this));
		this.layout.settingTab = wrap;
		return this.layout.settingTab;
	}

	onSettingTabClickHandler()
	{
		this.layout.settingTab.classList.add('active');
		this.layout.constructorTab.classList.remove('active');
		const wrap = this.settings.render()
		this.layout.main?.replaceWith(wrap);
		this.layout.main = wrap;
	}

	renderFooter()
	{
		const wrap = Tag.render`
			<div class="d-flex justify-content-center">${this.renderSaveButton()}</div>
		`;
		return wrap;
	}

	renderSaveButton()
	{
		const wrap = Tag.render`<button class="btn btn-primary">Сохранить</button>`
		Event.bind(wrap, 'click', this.onSaveButtonClickHandler.bind(this));
		return wrap;
	}

	onSaveButtonClickHandler()
	{
		const data = this.settings.getData();
		const form = this.construct.getData();
		form.SETTINGS = data;
		form.ID = this.id;
		console.log(form);
		return
		FormManager.saveFormData({ formData: form })
			.then((response) => {
				console.log(response);
				BX.SidePanel.Instance.close();
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
