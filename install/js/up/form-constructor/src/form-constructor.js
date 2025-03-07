import { Tag, Event, Loc } from 'main.core';
import { Constructor } from './constructor';
import { Settings } from './settings';
import { FormManager } from './form-manager';

export class FormConstructor
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.layout.error = null;
		this.id = options.id;
		this.formData = {
			CHAPTER: [],
		};
		this.isLoading = true;
		this.layout.wrap.append(this.render());
		this.loadFormData();
	}

	render()
	{
		let wrap;
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
			this.construct = new Constructor(this.formData, this.fieldData, this.saveForm.bind(this));
			this.settings = new Settings(this.formData.SETTINGS, this.allSettingsData);
			this.layout.header = this.renderHeader();
			this.layout.main = this.construct.render();
			this.layout.footer = this.renderFooter();
			wrap = Tag.render`<div id="inner-container"></div>`;
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
			this.formData = await FormManager.getFormData(this.id, 10);
		}
		else
		{
			this.formData.TITLE = Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_FORM_DEFAULT_TITLE');
			this.formData.ID = null;
			this.formData.CHAPTER[0] = {
				'TITLE': Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_CHAPTER_DEFAULT_TITLE'),
				'DESCRIPTION': Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_CHAPTER_DEFAULT_DESCRIPTION'),
				'POSITION': 1,
				'QUESTION': [],
				'ID': null,
			};
			this.formData.SETTINGS = [{SETTINGS_ID: 6, VALUE: 'true'}];
		}
		this.isLoading = false;
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
		const wrap = Tag.render`
			<button class="nav-link active" data-toggle="tab" role="tab">
				${Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_QUESTIONS_TAB')}
			</button>`;
		Event.bind(wrap, 'click', this.onConstructorTabClickHandler.bind(this));
		this.layout.constructorTab = wrap;
		return this.layout.constructorTab;
	}

	onConstructorTabClickHandler()
	{
		this.layout.constructorTab.classList.add('active');
		this.layout.settingTab.classList.remove('active');
		const wrap = this.construct.render();
		this.layout.main?.replaceWith(wrap);
		this.layout.main = wrap;
	}

	renderSettingTab()
	{
		const wrap = Tag.render`
			<button class="nav-link" data-toggle="tab" role="tab">
				${Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_SETTINGS_TAB')}
			</button>`;
		Event.bind(wrap, 'click', this.onSettingTabClickHandler.bind(this));
		this.layout.settingTab = wrap;
		return this.layout.settingTab;
	}

	onSettingTabClickHandler()
	{
		this.layout.settingTab.classList.add('active');
		this.layout.constructorTab.classList.remove('active');
		const wrap = this.settings.render();
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
		const wrap = Tag.render`
			<button class="btn btn-primary submit-button">
				${Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_SAVE_BUTTON')}
			</button>`;
		this.layout.saveButtonObject = {
			isActive: true,
			wrap: wrap,
		};
		Event.bind(wrap, 'click', () => this.onSaveButtonClickHandler(this.layout.saveButtonObject));

		return this.layout.saveButtonObject.wrap;
	}

	onSaveButtonClickHandler(button)
	{
		if (!button.isActive)
		{
			return;
		}
		button.wrap.classList.add('disabled');
		button.isActive = false;
		const formData = this.prepareData();
		this.renderErrors([]);
		FormManager.saveFormData({ formData: formData})
			.then((response) => {
				const url = BX.SidePanel.Instance.getCurrentUrl();
				BX.SidePanel.Instance.close();
				setTimeout(() => BX.SidePanel.Instance.destroy(url), 1000);
			})
			.catch((errors) => {
				this.displayErrors(errors);
			});
	}

	async saveForm()
	{
		const formData = this.prepareData();
		this.renderErrors([]);
		const result = await FormManager.saveFormData({ formData: formData })
			.catch((errors => {
				this.displayErrors(errors);
			}));
		if (!result)
		{
			return false;
		}
		const id = parseInt(result.id);
		const chapterId = parseInt(result.chapterId);
		if (id !== this.id)
		{
			this.id = id;
			this.construct.id = id;
			this.construct.chapterId = chapterId;
			const newUrl = '/form/edit/'.concat(this.id, '/');
			window.history.pushState(
				{ path: newUrl },
				Loc.getMessage('UP_FORMS_FORM_CONSTRUCTOR_MODULE_NAME'),
				newUrl);
			BX.SidePanel.Instance.pageUrl = window.history.url;
		}
		return true;
	}

	prepareData()
	{
		const settings = this.settings.getData();
		const form = this.construct.getData();
		form.IS_FIRST_PAGE = this.construct.currentPage === 1;
		if (this.id)
		{
			form.ID = this.id;
		}
		form.SETTINGS = settings;
		return form
	}

	displayErrors(errors)
	{
		this.layout.wrap.prepend(this.renderErrors(errors));
		this.layout.saveButtonObject.wrap.classList.remove('disabled');
		this.layout.saveButtonObject.isActive = true;
	}

	renderErrors(errors)
	{
		const wrap = Tag.render`<div class="container">
									${errors.map((error) => this.renderError(error.message))}
								</div>`;
		this.layout.error?.replaceWith(wrap);
		this.layout.error = wrap;
		return this.layout.error;
	}

	renderError(message)
	{
		const wrap = Tag.render`<div class="alert alert-danger" role="alert">
								${message}
							</div>`;
		return wrap;
	}
}
