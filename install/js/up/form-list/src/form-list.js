import { Loc, Tag, Event } from 'main.core';

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
		this.loadFormsData();
		BX.addCustomEvent("onPullEvent", (module_id,command,params) => {
			if (command === 'update')
			{
				this.isLoading = true;
				this.layout.form = this.render();
				this.loadFormsData();
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
			this.layout.form = this.render();
		}
		catch (error)
		{
			console.log(error);
		}
	}

	render()
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
							return this.renderForm(form)
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
				<td>${this.renderOpenConstructorButton(form.ID)}</td>
				<td><a href="/form/view/${form.ID}/" class="btn btn-success">${Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_LINK')}</a></td>
				<td><button class="btn btn-info">${Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_RESULTS')}</button></td>
				<td>${this.renderDeleteButton(form.ID)}</td>
			</tr>
			`;
	}

	renderOpenConstructorButton(formId)
	{
		const wrap = Tag.render
			`
			<button class="btn btn-primary">${Loc.getMessage('UP_FORMS_FORM_LIST_EDIT')}</button>
			`;
		Event.bind(wrap, 'click', () => {
			this.onOpenConstructorButtonClickHandler(formId);
		});

		return wrap;
	}

	onOpenConstructorButtonClickHandler(formId)
	{
		BX.SidePanel.Instance.open(`/form/edit/${formId}/`);
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
		console.log(formId)
		BX.ajax.runAction(
			'up:forms.form.deleteForm',
			{
				data: {
					id: formId
				}
			}
		).then(() => this.reload())
	}

	loadList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.form.getList',
					{}
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
		this.formList = [];
		this.layout.wrap.append(this.render());
		this.loadFormsData();
	}

}
