import { Event, Tag, Loc } from 'main.core';
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
					this.openSlider('/form/create/', 1000);
					break
				}
				case 'edit':
					if (options.formId)
					{
						this.openSlider('/form/edit/' . concat(options.formId, '/', 1000));
					}
					break
				case 'result':
					if (options.formId)
					{
						this.openSlider('/form/results/' . concat(options.formId, '/', false));
					}
					break
			}
		}
		this.gridId = options.gridId;
		this.isLoading = true;
		this.users = {};
		this.acceptedIds = {};

		this.acceptedUsers = {};
		this.notAcceptedUsers = {};
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
		this.openSlider(`/form/view/${formId}/`, 1000);
	}

	openAccess()
	{
		this.popupReload()
		var layout = this.popupLayout
		BX.ready(function () {
			var popup = BX.PopupWindowManager.create
			(
				"popup-message",
				BX('element'),
				{
					content: layout,
					width: 500, // ширина окна
					height: 200, // высота окна
					zIndex: 100, // z-index
					closeIcon: { opacity: 1 },
					// titleBar: 'Заголовок окна',
					closeByEsc: true, // закрытие окна по esc
					darkMode: false, // окно будет светлым или темным
					autoHide: false, // закрытие при клике вне окна
					draggable: false, // можно двигать или нет
					resizable: false, // можно ресайзить
					min_height: 100, // минимальная высота окна
					min_width: 100, // минимальная ширина окна
					lightShadow: true, // использовать светлую тень у окна
					angle: false, // появится уголок
					overlay:
						{
							backgroundColor: 'black',
							opacity: 500
						},
					events:
						{
							onPopupClose: function() {
							}
						}
				}
			);
			popup.show();
		});
	}

	async loadFormData()
	{
		try
		{
			this.users = await this.getAllUsers();
			this.acceptedIds = await this.getAcceptedIds()

			console.log(this.users);
			console.log(this.acceptedIds);

			this.prepareUsers()

			this.isLoading = false;
			this.popupLayout = this.render();
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
			wrap = Tag.render`
			<div class="container">
				${this.renderNotAcceptedUsersList()}
				${this.renderAcceptedUsersList()}
			</div>`;
		}

		this.popupLayout?.replaceWith(wrap);
		this.popupLayout = wrap;
		return this.popupLayout;
	}

	getAllUsers()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.User.getAllUsers',
					{})
				.then((response) => {
					const result = response.data.result;
					resolve(result);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	getAcceptedIds()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.User.getAcceptedUsers',
					{})
				.then((response) => {
					const result = response.data.result;
					resolve(result);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	prepareUsers()
	{
		this.users.forEach(user =>
		{
			if (this.acceptedIds.some(acceptedId => acceptedId.ID === user.ID))
			{
				this.acceptedUsers.push(user);
			}
			else
			{
				this.notAcceptedUsers.push(user);
			}
		});
	}

	renderNotAcceptedUsersList()
	{
		return Tag.render
			`
			<div class="dropdown">
				<button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Добавить редактора
				</button>
				<ul class="dropdown-menu">
					${this.notAcceptedUsers.map((user) => {return this.renderAddUserAccessBtn(user)})}
				</ul>
			</div>
			`
	}

	renderAcceptedUsersList()
	{
		return Tag.render
			`
			<div class="dropdown">
				<button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Удалить редактора
				</button>
				<ul class="dropdown-menu">
					${this.acceptedUsers.map((user) => {return this.renderRemoveUserAccessBtn(user)})}
				</ul>
			</div>
			`
	}

	renderAddUserAccessBtn(user)
	{
		const wrap = Tag.render
			`
				<li><button class="dropdown-item" href="#">${user.NAME}   ${user.LAST_NAME}</button></li>
			`;
		Event.bind(wrap, 'click', () => this.onAddUserAccessBtnClickHandler(user.ID));
		return wrap;
	}

	renderRemoveUserAccessBtn(user)
	{
		const wrap = Tag.render
			`
				<li><button class="dropdown-item" href="#">${user.NAME}   ${user.LAST_NAME}</button></li>
			`;
		Event.bind(wrap, 'click', () => this.onRemoveUserAccessBtnClickHandler(user.ID));
		return wrap;
	}


	onAddUserAccessBtnClickHandler(id)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.User.addAccessForUser',
					{
						data: {
							userId: id,
						},
					})
				.then(() => {
					this.popupReload()
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	onRemoveUserAccessBtnClickHandler(id)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.User.removeAccessForUser',
					{
						data: {
							userId: id,
						},
					})
				.then(() => {
					this.popupReload()
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		})
	}

	popupReload()
	{
		this.isLoading = true;
		this.users = {};
		this.acceptedIds = {};
		this.acceptedUsers = [];
		this.notAcceptedUsers = [];
		this.popupLayout = this.render();
		this.loadFormData();
	}

	editForm(formId)
	{
		this.openSlider(`/form/edit/${formId}/`, 1000);
	}

	createForm()
	{
		this.openSlider(`/form/create/`, 1000);
	}

	showResults(formId)
	{
		this.openSlider(`/form/results/${formId}/`, false);
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

	openSlider(url, width = false)
	{
		if (width === false)
		{
			BX.SidePanel.Instance.open(url);
		}
		else
		{
			BX.SidePanel.Instance.open(url, {width: width});
		}

	}
}

