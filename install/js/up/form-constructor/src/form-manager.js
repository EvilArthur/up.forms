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
							offset: offset,
							responseId: false
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

	static saveFormData(data)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.saveFormData',
					{
						data: data,
					})
				.then((response) => {
					const result = {id: response.data.ID, chapterId: response.data.CHAPTER_ID};
					resolve(result);
				})
				.catch((error) => {
					reject(error.errors);
				});
	})
	}

	static getFieldData()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.getFieldData')
				.then((response) => {
					const result = response.data.result;
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static getSettingsData()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.getSettingsData')
				.then((response) => {
					const result = response.data.result;
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static getQuestionData(id, limit, offset)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.getQuestionData',
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
		});
	}

	static deleteQuestion(id)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:forms.FormCreate.deleteQuestion',
					{
						data: {
							id: id,
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
}