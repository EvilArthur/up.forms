import { Event, Loc, Tag } from 'main.core';

export class FormList
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.formList = [];
		this.isLoading = true;
		if (!this.layout.wrap)
		{
			throw new Error(`Forms: container is not found`);
		}
		this.layout.wrap.append(this.render());
		this.layout.wrap.append(this.renderFormTable());
		this.loadFormsData();
		BX.addCustomEvent('onPullEvent', (module_id, command, params) => {
			if (command === 'update')
			{
				this.reload();
			}
		});
		BX.PULL.extendWatch('FORMS-UPDATE');
	}

	async loadFormsData()
	{
		try
		{
			this.formList = await this.loadList();
			this.isLoading = false;
			this.layout.form = this.renderFormTable();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	render()
	{
		const wrap = Tag.render`
			<nav class="navbar navbar-expand-lg bg-body-tertiary mb-10">
				<div class="container-fluid">
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<div class="container-fluid justify-content-start">
								${this.renderOpenCreateButton()}
							</div>
						</ul>
						<form class="d-flex" role="search">
							<input class="form-control me-2" type="search" placeholder="Название формы..." aria-label="Search">
							<button class="btn btn-outline-success" type="submit">Поиск</button>
						</form>
					</div>
				</div>
			</nav>`;
		return wrap;
	}

	renderFormTable()
	{
		let wrap;
		if (this.isLoading)
		{
			wrap = Tag.render
				`
				<div class="container d-flex justify-content-center">
					<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
						<span class="sr-only"></span>
					</div>
				</div>
				`;
		}
		else
		{
			wrap = Tag.render
				`
				<table class="table" id="form-list-app">
					<tbody>
						${this.formList.map((form) => {
					return this.renderForm(form);
				})}
					</tbody>
				</table>
				`;
		}
		this.layout.form?.replaceWith(wrap);
		this.layout.form = wrap;
		return this.layout.form;
	}

	renderForm(form)
	{
		return Tag.render
			`
			<tr>
				<td class="align-middle">${form.Title}</td>
				<td>${this.renderOpenEditButton(form.ID)}</td>
				<td>${this.renderOpenFormButton(form.ID)}</td>
				<td><button class="btn btn-info">${Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_RESULTS')}</button></td>
				<td>${this.renderDeleteButton(form.ID)}</td>
			</tr>
			`;
	}

	renderOpenEditButton(formId)
	{
		const wrap = Tag.render
			`
			<button class="btn btn-primary">${Loc.getMessage('UP_FORMS_FORM_LIST_EDIT')}</button>
			`;
		Event.bind(wrap, 'click', () => {
			this.openSlider(`/form/edit/${formId}/`);
		});

		return wrap;
	}

	renderOpenCreateButton()
	{
		const wrap = Tag.render
			`
			<button class="btn btn-success">Добавить Форму</button>
			`;
		Event.bind(wrap, 'click', () => {
			this.openSlider(`/form/create/`);
		});

		return wrap;
	}

	renderOpenFormButton(formId)
	{
		const wrap = Tag.render
			`
			<button class="btn btn-success">${Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_LINK')}</button>
			`;
		Event.bind(wrap, 'click', () => {
			this.openSlider(`/form/view/${formId}/`);
		});

		return wrap;
	}

	renderDeleteButton(formId)
	{
		const wrap = Tag.render
			`
			<td><button class="btn btn-danger">${Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_DELETE')}</button></td>
			`;
		Event.bind(wrap, 'click', () => {
			this.onRemoveFormButtonClickHandler(formId);
		});

		return wrap;
	}

	onRemoveFormButtonClickHandler(formId)
	{
		console.log(formId);
		BX.ajax.runAction(
			'up:forms.form.deleteForm',
			{
				data: {
					id: formId,
				},
			},
		).then(() => this.reload());
	}

	loadList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.form.getList',
					{},
				)
				.then((response) => {
					const formList = response.data.formList;
					resolve(formList);
				})
				.catch((error) => {
					console.error(error);
					reject(error);
				});
		});
	}

	reload()
	{
		this.isLoading = true;
		this.layout.form = this.renderFormTable();
		this.loadFormsData();
	}

	openSlider(url)
	{
		BX.SidePanel.Instance.open(url);
	}

}
