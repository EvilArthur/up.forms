import { Event, Tag } from 'main.core';
import { Question } from './question';
import { FormManager } from './form-manager';

export class Form
{
	constructor(options = {})
	{
		this.layout = {};
		this.id = options.values.id;
		this.layout.wrap = options.container;
		this.timer = options.values.timer;

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
				this.formData.CHAPTER[0].QUESTION.map((questionData) => {
					const question = new Question(
						questionData.CHAPTER_ID, questionData.FIELD_ID,
						questionData.ID, questionData.POSITION,
						questionData.TITLE, questionData.OPTION);

					this.questions.push(question);
				});
				console.log(this.questions);
				this.layout.form = this.render();
				this.startTimer();
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
				<h1 class="text-center mt-5 mb-4">${this.formData.TITLE}</h1>
				${this.renderTimer()}
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

	renderTimer()
	{
		if (this.timer)
		{
			const wrap = Tag.render`<div class="container text-center mt-4">
										<div id="timer" class="display-6">${this.renderTime()}</div>
									</div>`
			return wrap;
		}
		else
		{
			return '';
		}
	}

	renderTime()
	{
		const wrap = Tag.render`<p></p>`
		this.layout.time = wrap;
		return this.layout.time
	}

	onSubmitButtonClickHandler()
	{
		const answers = this.questions.map((question) => {
			return question.getAnswer();
		})
		const data = {
			'FORM_ID': this.id,
			'USER_ID': 1,
			'ANSWER': answers,
		}
		console.log(data)
		FormManager.saveAnswerData(data)
			.then((response) => {
				BX.SidePanel.Instance.close();
				console.log(response);
			})
			.catch((error) => console.log(error));
	}

	startTimer()
	{
		if (this.timer)
		{
			this.startTime = localStorage.getItem('timerStartTime');
			if (!this.startTime)
			{
				this.startTime = this.addTimeToCurrent(this.timer);
			}
			this.updateTimer(this.startTime);
		}
	}

	addTimeToCurrent(additionalTime) {
		const [hours, minutes] = additionalTime.split(':').map(Number);

		const now = new Date();

		const totalMinutesCombined = hours * 60 + minutes;
		const newDate = new Date(now.getTime() + totalMinutesCombined * 60000); // 60000 миллисекунд в минуте
		console.log(newDate)
		return newDate;
	}

	updateTimer(startTime)
	{
		const remainingTime =  startTime - new Date();
		if (remainingTime <= 0)
		{
			this.onSubmitButtonClickHandler();
		}
		else
		{
			const seconds = Math.floor(remainingTime / 1000) % 60;
			const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
			const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

			const formattedSeconds = String(seconds).padStart(2, '0');
			const formattedHours = String(hours).padStart(2, '0');
			const formattedMinutes = String(minutes).padStart(2, '0');

			this.layout.time.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
			setTimeout(() => this.updateTimer(startTime), 1000);
		}
	}
}
