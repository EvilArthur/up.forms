export class FormManager
{
	static getFormData(page: number)
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
			setTimeout(() => resolve(formData), 1000)

		});
	}
}