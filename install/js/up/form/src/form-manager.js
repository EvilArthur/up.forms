export class FormManager
{
	static getFormData(id)
	{
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

	static saveAnswerData(data)
	{
		console.log(data);
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.Form.saveAnswers',
					{
						data: {
							answers: data
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
		})
	}
}