import { Event, Tag } from 'main.core';
import { EditableText } from './editable-text';
import { FormManager } from './form-manager';
import { questionFactory } from './questions/questionFactory';

export class Constructor
{
	constructor(formData, fieldData, saveFormFunction)
	{
		this.layout = {};
		this.titleObject = { value: '' };
		this.fieldData = fieldData;
		this.questions = [];
		this.formData = formData;
		this.fieldData = fieldData;
		this.id = formData.ID;
		this.chapterId = formData.CHAPTER[0].ID;
		this.saveForm = saveFormFunction;
		this.questionNumber = 0;
		this.isLastPage = true;

		this.limit = 10;
		this.currentPage = 1;
		this.loading = new bootstrap.Modal(this.renderLoading(), {
			backdrop: 'static',
			keyboard: false
		});

		this.titleObject.value = this.formData.TITLE;
		this.fillQuestionsByData(formData.CHAPTER[0].QUESTION);

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
			${this.renderPagination()}
		</div>
`;
		this.layout.wrap?.replaceWith(wrap);
		this.layout.wrap = wrap;
		return this.layout.wrap;
	}

	renderQuestionList()
	{
		const wrap = Tag.render`
		<div class="container">
			${this.questions.map((question, index) => {
			const questionWrap = question.render();
			const typeSelect = question.layout.typeSelect;
			Event.bind(typeSelect, 'change', () => this.changeQuestionType(index, parseInt(typeSelect.value)));
			return questionWrap;
		})}
		</div>
		`;
		this.layout.questionList?.replaceWith(wrap);
		this.layout.questionList = wrap;
		return this.layout.questionList;
	}

	changeQuestionType(index, fieldId)
	{
		const question = this.questions[index];
		let options;
		if (fieldId === 1)
		{
			options = [{ 'ID': null, 'TITLE': '' }];
		}
		else if (question.fieldId === 1)
		{
			options = [{ 'ID': null, 'TITLE': 'Новая опция' }];
		}
		else
		{
			options = question.getOptionData();
		}

		const oldWrap = this.questions[index].layout.wrap;
		const typeChangedQuestion = questionFactory.createQuestion(
			this.reloadAfterDelete.bind(this), fieldId, question.chapterId, question.id, question.position,
			question.titleObject.value, options, question.getSettingData(), this.fieldData);
		this.questions[index] = typeChangedQuestion;

		console.log(typeChangedQuestion);
		const newWrap = typeChangedQuestion.render();
		const typeSelect = typeChangedQuestion.layout.typeSelect;
		Event.bind(typeSelect, 'change', () => this.changeQuestionType(index, parseInt(typeSelect.value)));
		oldWrap.replaceWith(newWrap);
	}

	renderAddQuestionButton()
	{
		const wrap = Tag.render`
			<button type="button" class="btn btn-primary mx-1">+</button>
		`;
		Event.bind(wrap, 'click', this.onAddQuestionButtonClickHandler.bind(this));

		this.layout.addQuestionButtonObject = {
			wrap: wrap,
			isActive: this.questions.length < 10,
		};

		return this.layout.addQuestionButtonObject.wrap;
	}

	onAddQuestionButtonClickHandler()
	{
		if (this.questions.length >= 10)
		{
			this.renderPagination();
			return;
		}
		this.questions.push(questionFactory.createQuestion(
			this.reloadAfterDelete.bind(this), 1, this.chapterId, null, ++this.questionNumber,
			'Название', [{ 'ID': null, 'TITLE': '' }],
			[{ 'SETTINGS_ID': 1, 'VALUE': false }, { 'SETTINGS_ID': 2, 'VALUE': false }], this.fieldData,
		));
		this.renderQuestionList();
	}

	getData()
	{
		const hardCodeChapter = this.formData.CHAPTER[0];
		hardCodeChapter.ID = this.chapterId;
		hardCodeChapter.QUESTION = this.questions.map((question) => question.getData());
		const form = {
			'TITLE': this.layout.title.innerText,
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
		new EditableText(wrap, this.titleObject, this.renderEditableTitle.bind(this));
		this.layout.title?.replaceWith(wrap);
		this.layout.title = wrap;
		return this.layout.title;
	}

	renderPagination()
	{
		const wrap = Tag.render
			`
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						${this.renderPreviousPageButton()}
						${this.renderNextPageButton()}
					</ul>
				</nav>
			`;
		this.layout.pagination?.replaceWith(wrap);
		this.layout.pagination = wrap;
		return this.layout.pagination;
	}

	renderNextPageButton()
	{
		if (this.questions.length === this.limit)
		{
			const wrap = Tag.render
				`
				<li class="page-item">
					
						<button aria-hidden="true">&raquo;</button>
					
				</li>
				`;
			Event.bind(wrap, 'click', this.onNextPageButtonClickHandler.bind(this));
			return wrap;
		}
	}

	renderPreviousPageButton()
	{
		if (this.currentPage > 1)
		{
			const wrap = Tag.render
				`
				<li class="page-item">
					
						<button aria-hidden="true">&laquo;</button>
					
				</li>
				`;
			Event.bind(wrap, 'click', this.onPreviousPageButtonClickHandler.bind(this));
			return wrap;
		}
	}

	async onNextPageButtonClickHandler()
	{
		this.loading.show();
		this.layout.wrap.append(this.renderLoading());
		this.id = await this.saveForm();
		if (this.id)
		{
			this.currentPage += 1;
			this.reload();
		}
	}

	async onPreviousPageButtonClickHandler()
	{
		this.loading.show();
		this.layout.wrap.append(this.renderLoading());
		this.id = await this.saveForm();
		if (this.id)
		{
			this.currentPage -= 1;
			this.reload();
		}
	}

	reload()
	{
		console.log(this.id, this.limit, this.limit * (this.currentPage - 1));
		this.loadPage(this.chapterId, this.limit, this.limit * (this.currentPage - 1)).then( () => {
			this.renderQuestionList()
			this.renderPagination();
			this.loading.hide();
		});
	}

	reloadAfterDelete()
	{
		this.questions = this.questions.filter(question => !question.isDeleted);
		if (this.id && !this.isLastPage)
		{
			this.loading.show();
			this.saveForm().then(() => {this.reload()});
		}
		else
		{
			this.renderQuestionList();
		}
	}

	async loadPage(id, limit = 0, offset = 0)
	{
		const questionData = await FormManager.getQuestionData(id, limit + 1, offset);
		console.log(questionData);
		this.fillQuestionsByData(questionData);

	}

	fillQuestionsByData(data)
	{
		this.questions = [];
		data.map((questionData) => {
			const question = questionFactory.createQuestion(this.reloadAfterDelete.bind(this),
				questionData.FIELD_ID, questionData.CHAPTER_ID,
				questionData.ID, ++this.questionNumber,
				questionData.TITLE, questionData.OPTION, questionData.SETTINGS, this.fieldData);
			this.questions.push(question);
		});
		this.isLastPage = this.questions.length <= this.limit;
		if (!this.isLastPage)
		{
			this.questions.pop();
		}
	}

	renderLoading()
	{
		const wrap = Tag.render`
		 <div class="modal" id="loadingModal">
			<div class="modal-dialog modal-dialog-centered">
				  <div class="spinner-border text-center" role="status">
					<span class="visually-hidden">Loading...</span>
				  </div>
			</div>
		  </div>
		`
		return wrap;
	}
}