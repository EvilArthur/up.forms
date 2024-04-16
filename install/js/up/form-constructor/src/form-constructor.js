import { Tag, Event } from 'main.core';
import { Constructor } from './constructor';
import {Settings} from './settings';

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
		this.construct = new Constructor(this.id);
		this.settings = new Settings(this.id);
		this.layout.main = this.construct.render()
		this.layout.wrap.append(this.renderHeader());
		this.layout.wrap.append(this.layout.main);
		this.layout.wrap.append(this.renderFooter());
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
			<button class="btn btn-primary">Сохранить</button>
		`;
		return this.renderSaveButton();
	}

	renderSaveButton()
	{
		const wrap = Tag.render`<button class="btn btn-primary">Сохранить</button>`
		Event.bind(wrap, 'click', this.onSaveButtonClickHandler.bind(this));
		return wrap;
	}

	onSaveButtonClickHandler()
	{
		const data = {
			'settings': this.settings.getData(),
		}
		console.log(data);
	}
}
