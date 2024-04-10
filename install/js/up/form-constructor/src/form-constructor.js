import { Event, Tag } from 'main.core';
import { Question } from './question';
import { EditableText } from './editable-text';
import { FormManager } from './form-manager';

export class FormConstructor
{
	constructor(options = {})
	{
		this.layout = {};
		this.layout.wrap = options.container;
		this.id = options.id;
		this.formData = {
			chapters: [],
		};
		this.titleObject = {value: ''}
		this.fieldData = [];
		this.questions = [];
		this.chapters = [];
		this.isLoading = true;
		if (!this.layout.wrap)
		{
			throw new Error(`TaskList: container is not found`);
		}
		this.layout.wrap.append(this.render());
		this.loadFormData();
	}

	async loadFormData()
	{
		this.fieldData = await FormManager.getFieldData();
		if (this.id !== 0)
		{
			try
			{
				this.formData = await FormManager.getFormData(this.id);
				this.titleObject.value = this.formData.Title
				this.isLoading = false;
				this.formData.chapters[0].questions.map((questionData) => {
					let question = null;
					console.log(questionData);
					question = new Question(
						questionData.Chapter_ID, questionData.Field_ID,
						questionData.ID, questionData.Position,
						questionData.Title, [], this.fieldData);
					this.questions.push(question);
				});
				this.layout.form = this.render();
			}
			catch (error)
			{
				console.log(error);
			}
		}
		else
		{
			this.formData.chapters[0] = {
				'title': 'Заголовок раздела',
				'description': 'Описание раздела',
				'Position': 1,
				'questions': [],
				'id': null,
			};
			this.isLoading = false;
			this.titleObject.value = 'Новая форма';
			this.layout.form = this.render();
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
			<div class="container d-flex justify-content-center">
				${this.renderEditableTitle()}
			</div>
			<div class="container d-flex justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
				${this.renderAddQuestionButton()}
				<button type="button" class="btn btn-primary mx-1">Тт</button>
				<button type="button" class="btn btn-primary mx-1">P</button>
			</div>
			${this.renderQuestionList()}
			<div class="d-flex justify-content-center">
				${this.renderSaveFormButton()}
		 	</div>
		</div>
`;
		}
		this.layout.form?.replaceWith(wrap);
		this.layout.form = wrap;
		return this.layout.form;
	}

	renderQuestionList()
	{
		this.questionNumber = 1;
		const wrap = Tag.render`
		<div class="container">
			${this.questions.map((question) => {
			question.position = this.questionNumber++;
			return question.render();
		})}
		</div>
		`;
		this.layout.questionList?.replaceWith(wrap);
		this.layout.questionList = wrap;
		return this.layout.questionList;
	}

	renderAddQuestionButton()
	{
		const wrap = Tag.render`
			<button type="button" class="btn btn-primary mx-1">+</button>
		`;
		Event.bind(wrap, 'click', this.onAddQuestionButtonClickHandler.bind(this));

		return wrap;
	}

	onAddQuestionButtonClickHandler()
	{
		this.questions.push(new Question(
			this.formData.chapters[0].id,
			1, null, this.questionNumber++, 'Название', [], this.fieldData,
		));
		this.renderQuestionList();
	}

	renderSaveFormButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">Сохранить</button>
		`;
		Event.bind(wrap, 'click', this.onSaveFormButtonClickHandler.bind(this));

		return wrap;
	}

	onSaveFormButtonClickHandler()
	{
		const hardCodeChapter = this.formData.chapters[0];
		hardCodeChapter.questions = this.questions.map((question) => question.getData());
		const form = {
			'ID': this.id,
			'Title': this.titleObject.value,
			'Creator_ID': 1,
			'chapters': [
				hardCodeChapter,
			],
		};
		console.log(form);
		FormManager.saveFormData({ formData: form })
			.then((response) => {
				console.log(response);
				BX.SidePanel.Instance.close();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	renderEditableTitle(): HTMLElement
	{
		const wrap = Tag.render`
		<h1 class="text-center mt-5 mb-4">${this.titleObject.value}</h1>
		`;
		new EditableText(wrap, this.titleObject);
		this.layout.title = wrap;
		return this.layout.title;
	}
}
