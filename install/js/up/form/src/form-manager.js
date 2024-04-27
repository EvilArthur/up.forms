export class FormManager
{
	static getFormData(id, limit = 0, offset = 0)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.getFormData',
					{
						data: {
							id: id,
							limit: limit,
							offset: offset
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

	static createResponse(id)
	{
		console.log(1);
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.Form.createResponse',
					{
						data: {
							formId: id
						},
					})
				.then((response) => {
					const startTime = response.data.startTime;
					resolve(startTime);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		})
	}
}