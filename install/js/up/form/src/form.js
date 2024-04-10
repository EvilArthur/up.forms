import { Event, Tag } from 'main.core';
import { Question } from './question';
import { FormManager } from './form-manager';

export class Form
{
	constructor(options = {})
	{
		this.layout = {};
		this.id = options.id;
		this.layout.wrap = options.container;
		this.questions = [];
		this.formData = {};
		this.isLoading = true;
		this.layout.wrap.append(this.render());
		this.loadFormData();
	}

	async loadFormData()
	{
		if (this.id !== 0)
		{
			try
			{
				this.formData = await FormManager.getFormData(this.id);
				this.isLoading = false;
				console.log(this.formData);
				this.formData.Chapter[0].Question.map((questionData) => {
					const question = new Question(
						questionData.Chapter_ID, questionData.Field_ID,
						questionData.ID, questionData.Position,
						questionData.Title, questionData.Options);

					this.questions.push(question);
				});
				console.log(this.questions);
				this.layout.form = this.render();
			}
			catch (error)
			{
				console.log(error);
			}
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
				<h1 class="text-center mt-5 mb-4">${this.formData.Title}</h1>
				${this.renderQuestionList()}
				${this.renderSubmitButton()}
			</div>
		`;
		}
		this.layout.form?.replaceWith(wrap);
		this.layout.form = wrap;
		return this.layout.form;
	}

	renderQuestionList()
	{
		const wrap = Tag.render`
		<form>
			${this.questions.map((question) => {
			return question.render();
		})}
		</form>
		`;
		return wrap;
	}

	renderSubmitButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">Подтвердить</button>
		`;
		Event.bind(wrap, 'click', this.onSubmitButtonClickHandler.bind(this));

		return wrap;
	}

	onSubmitButtonClickHandler()
	{
		const answers = this.questions.map((question) => {
			return question.getAnswer();
		})
		console.log(answers)
		FormManager.saveAnswerData(answers)
			.then((response) => {
				BX.SidePanel.Instance.close();
				console.log(response);
			})
			.catch((error) => console.log(error));
	}
}
