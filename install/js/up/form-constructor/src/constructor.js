import { Event, Tag } from 'main.core';
import { EditableText } from './editable-text';
import { FormManager } from './form-manager';
import { Question } from './question';

export class Constructor
{
	constructor(formData, fieldData)
	{
		this.layout = {};
		this.titleObject = {value: ''}
		this.fieldData = fieldData
		this.questions = [];
		this.formData = formData

		this.titleObject.value = this.formData.TITLE
		formData.CHAPTER[0].QUESTION.map((questionData) => {
			const question = new Question(
				questionData.CHAPTER_ID, questionData.FIELD_ID,
				questionData.ID, questionData.POSITION,
				questionData.TITLE, questionData.OPTION, fieldData);
			this.questions.push(question);
		});
	}

	render()
	{
		const wrap = Tag.render`
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
		</div>
`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;
		return this.layout.wrap;
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
			this.formData.CHAPTER[0].id,
			1, null, this.questionNumber++, 'Название', [], this.fieldData,
		));
		this.renderQuestionList();
	}

	getData()
	{
		const hardCodeChapter = this.formData.CHAPTER[0];
		hardCodeChapter.QUESTION = this.questions.map((question) => question.getData());
		const form = {
			'TITLE': this.titleObject.value,
			'CREATOR_ID': 1,
			'CHAPTER': [
				hardCodeChapter,
			],
		};
		return form;
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