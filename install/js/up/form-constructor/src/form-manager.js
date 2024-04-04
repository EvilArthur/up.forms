export class FormManager
{
	static getFormData(id)
	{
		id = 3
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.getFormData',
					{
						data: {
							id: id
						},
					})
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

	static saveFormData(data)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.saveFormData',
					{
						data: data,
					})
				.then((response) => {
					const result = response.data.result;
					resolve(result);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
	})
	}
}