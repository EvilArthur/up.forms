import { Type, Loc } from 'main.core';
export class FormList
{
	constructor(options = {})
	{
		if (options.action)
		{
			const newUrl = '/forms/'
			history.pushState({ path: newUrl }, 'Формы', newUrl);
			switch (options.action)
			{
				case 'create':
				{
					this.openSlider('/form/create/');
					break
				}
				case 'edit':
					if (options.formId)
					{
						this.openSlider('/form/edit/' . concat(options.formId, '/'));
					}
					break
				case 'result':
					if (options.formId)
					{
						this.openSlider('/form/results/' . concat(options.formId, '/'));
					}
					break
			}
		}
		this.gridId = options.gridId;
		BX.addCustomEvent('onPullEvent', (module_id, command, params) =>
		{
			if (command === 'update')
			{
				this.reload();
			}
		});
	}

	deleteForms()
	{
		BX.ready(function()
		{
			const grid = BX.Main.gridManager.getById('FORMS_LIST_GRID')?.instance;
			if (Type.isObject(grid))
			{
				const rowsCollectionWrapper: BX.Grid.Rows = grid.getRows();
				const selectedRowsIdsList: Array = rowsCollectionWrapper.getSelectedIds();
				BX.ajax.runAction(
					'up:forms.form.deleteForms',
					{
						data: {
							ids: selectedRowsIdsList,
						},
					},
				)
			}
		})

	}

	deleteForm(formId)
	{
		BX.ready(function()
		{
			const grid = BX.Main.gridManager.getById('FORMS_LIST_GRID')?.instance;
			if (Type.isObject(grid))
			{
				BX.ajax.runAction(
					'up:forms.form.deleteForm',
					{
						data: {
							id: formId,
						},
					},
				)
			}
		})
	}

	openForm(formId)
	{
		this.openSlider(`/form/view/${formId}/`);
	}

	editForm(formId)
	{
		this.openSlider(`/form/edit/${formId}/`);
	}

	createForm()
	{
		this.openSlider(`/form/create/`);
	}

	showResults(formId)
	{
		this.openSlider(`/form/results/${formId}/`);
	}

	createTask(formTitle, formId, userId)
	{
		BX.SidePanel.Instance.open(
			"/company/personal/user/" + userId + "/tasks/task/edit/0/?SCOPE=tasks_grid",
			{
				requestMethod: "post",
				requestParams:
					{
						'TITLE': Loc.getMessage('UP_FORMS_FORM_LIST_TASK_TITLE') + ' - ' + formTitle,
						'DESCRIPTION': `[URL=/form/view/` + formId + `/]${Loc.getMessage('UP_FORMS_FORM_LIST_TASK_DESCRIPTION')}[/URL]`,
						'TAGS': [Loc.getMessage('UP_FORMS_FORM_LIST_TASK_TAG')]
					},
				cacheable: false,
			})
	}


	createFastTask(formTitle, formId, userId)
	{
		BX.ajax.runAction(
			'up:forms.task.createFastTask',
			{
				data:
					{
						formTitle: formTitle,
						formId: formId,
						userId: userId
					},
			},
		)
	}

	reload()
	{
		BX.ready(function()
		{
			const grid = BX.Main.gridManager.getById('FORMS_LIST_GRID')?.instance;
			if (Type.isObject(grid))
			{
				grid.reload();
			}
		});
	}

	openSlider(url)
	{
		BX.SidePanel.Instance.open(url, {width: 1000});
	}

}

