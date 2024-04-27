import { Event, Tag } from 'main.core';
import { EditableText } from './editable-text';

import { questionFactory} from './questions/questionFactory';

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
			const question = questionFactory.createQuestion(
				questionData.FIELD_ID, questionData.CHAPTER_ID,
				questionData.ID, questionData.POSITION,
				questionData.TITLE, questionData.OPTION, questionData.SETTINGS, fieldData)
			this.questions.push(question);
		})
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
			${this.questions.map((question, index) => {
			question.position = this.questionNumber++;
			const questionWrap = question.render();
			const typeSelect = question.layout.typeSelect
			Event.bind(typeSelect, 'change', () => this.changeQuestionType(question, index, parseInt(typeSelect.value)))
			return questionWrap;
		})}
		</div>
		`;
		this.layout.questionList?.replaceWith(wrap);
		this.layout.questionList = wrap;
		return this.layout.questionList;
	}

	changeQuestionType(question, index, fieldId)
	{
		let options
		if (fieldId === 1)
		{
			options = [{'ID': null, 'TITLE':''}]
		}
		else if(question.fieldId === 1)
		{
			options = [{'ID': null, 'TITLE': 'Новая опция'}]
		}
		else
		{
			options = question.getOptionData()
		}
		this.questions[index] = questionFactory.createQuestion(
			fieldId, question.chapterId, question.id, question.position, question.titleObject.value,
			options, question.getSettingData(), this.fieldData);
		console.log(this.questions[index])
		this.renderQuestionList();
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
		this.questions.push(questionFactory.createQuestion(
			1, this.formData.CHAPTER[0].id, null, this.questionNumber++,
			'Название', [{'ID': null, 'TITLE': ''}],
			[{'SETTINGS_ID': 1, 'VALUE': false}], this.fieldData,
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
		if (this.titleObject.value === '')
		{
			this.titleObject.value = 'Новая форма';
		}
		const wrap = Tag.render`
		<h1 class="text-center mt-5 mb-4">${this.titleObject.value}</h1>
		`;
		new EditableText(wrap, this.titleObject);
		this.layout.title = wrap;
		return this.layout.title;
	}
}