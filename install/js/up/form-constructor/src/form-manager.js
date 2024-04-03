export class FormManager
{
	static getFormData()
	{
		return new Promise((resolve, reject) => {
			let formData = {
				'title': 'Название формы',
				'chapters': [
					{
						'title': 'Название раздела',
						'description': 'Описание раздела',
						'questions': [
							{
								'title': 'Название 1',
								'description': 'Описание 1',
								'position': 1,
								'type': 1,
							},
							{
								'title': 'Название 2',
								'description': 'Описание 2',
								'position': 2,
								'type': 1,
							},
							{
								'title': 'Название 3',
								'description': 'Описание 3',
								'position': 3,
								'type': 1,
							},
						],
					},
				],
			};
			setTimeout(() => resolve(formData), 1000);

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