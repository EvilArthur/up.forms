import { Type } from 'main.core';

export class FormResults
{
	constructor(options = {})
	{
		this.gridId = options.gridId;
		this.id = options.formId;
		console.log(this.id)
		BX.addCustomEvent('onPullEvent', (module_id, command, params) =>
		{
			console.log(module_id)
			console.log(command)
			console.log(params)
			console.log(this.id)
			if (command === 'update' && parseInt(params.id) === this.id)
			{
				this.reload();
			}
		});
	}

	deleteResponses()
	{
		const gridId = this.gridId;
		BX.ready(async function()
		{
			const grid = BX.Main.gridManager.getById(gridId)?.instance;
			if (Type.isObject(grid))
			{
				const rowsCollectionWrapper: BX.Grid.Rows = grid.getRows();
				const selectedRowsIdsList: Array = rowsCollectionWrapper.getSelectedIds();
				await BX.ajax.runAction(
					'up:forms.response.deleteResponses',
					{
						data:
							{
								ids: selectedRowsIdsList,
							},
					},
				)
			}
		});
		this.reload();
	}

	deleteResponse(responseId)
	{
		const gridId = this.gridId;
		BX.ready(async function()
		{
			const grid = BX.Main.gridManager.getById(gridId)?.instance;
			if (Type.isObject(grid))
			{
				await BX.ajax.runAction(
					'up:forms.response.deleteResponse',
					{
						data:
							{
								id: responseId,
							},
					},
				)
			}
		});
		this.reload();
	}

	reload()
	{
		const gridId = this.gridId;
		BX.ready(function()
		{
			const grid = BX.Main.gridManager.getById(gridId)?.instance;
			if (Type.isObject(grid))
			{
				grid.reload();
			}
		});
	}

}
