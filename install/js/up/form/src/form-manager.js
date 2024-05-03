export class FormManager
{
	static getFormData(id, limit, offset, responseId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.getFormData',
					{
						data: {
							id: id,
							limit: limit,
							offset: offset,
							responseId: responseId
						},
					})
				.then((response) => {
					const result = response.data.result;
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static saveAnswerData(data)
	{
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
					reject(error.errors);
				});
		})
	}

	static createResponse(id)
	{
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
					reject(error);
				});
		})
	}

	static getAnswersByResponseId(id, limit, offset)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.Response.getAnswersByResponseId',
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
					reject(error);
				});
		})
	}
}