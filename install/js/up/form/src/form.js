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
		this.isRenderedMainBody = false;
		this.isCompleted = false;

		this.startTime = options.values.startTime;
		if (this.startTime)
		{
			this.timeIsUp = new Date() - this.startTime;
			this.submitResponse();
		}
		this.try = options.values.try;
		this.maxTry = options.values.maxTry;

		this.isStarted = this.startTime ? true : false;
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
				if(this.isRenderedMainBody)
				{
					this.startTimer();
				}
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
		else if (!this.isStarted)
		{
			wrap = Tag.render`
				<div class="container">
					<h1 class="text-center mt-5 mb-4">${this.formData.TITLE}</h1>
					${this.renderTriesRemaining()}
					<div class="d-flex justify-content-center">${this.renderStartButton()}</div>
				</div>`;
		}
		else if(this.timeIsUp)
		{
			wrap = Tag.render`
				<div class="container">
					<h1 class="text-center mt-5 mb-4">${this.formData.TITLE}</h1>
					<div class="d-flex justify-content-center"><h2 class ="text-center">Время вышло!</h2></div>
				</div>`;
		}
		else
		{
			wrap = Tag.render`
			<div class="container">
				<h1 class="text-center mt-5 mb-4">${this.formData.TITLE}</h1>
				${this.renderTimer()}
				${this.renderQuestionList()}
				${this.renderSubmitButton()}
			</div>`;
			this.isRenderedMainBody = true;
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
		Event.bind(wrap, 'click', this.submitResponse.bind(this));
		this.layout.submitButton = wrap;
		return wrap;
	}

	submitResponse()
	{
		this.isCompleted = true;
		let answers = [];
		if (this.isRenderedMainBody)
		{
			this.layout.submitButton.classList.add('disabled');
			answers = this.questions.map((question) => {
				return question.getAnswer();
			});
		}

		const data = {
			'FORM_ID': this.id,
			'ANSWER': answers,
			'IS_COMPLETED': true,
		};
		console.log(data);
		FormManager.saveAnswerData(data)
			.then((response) => {
				if (!this.timeIsUp)
				{
					BX.SidePanel.Instance.close();
					BX.SidePanel.Instance.destroy('/form/results/${formId}/');
				}
				else
				{
					this.render();
				}

				console.log(response);
			})
			.catch((error) => console.log(error));
	}

	renderTimer()
	{
		if (this.timer)
		{
			const wrap = Tag.render`<div class="container text-center mt-4">
										<div id="timer" class="display-6">${this.renderTime()}</div>
									</div>`;
			this.layout.timer?.replaceWith(wrap);
			this.layout.timer = wrap;
			return this.layout.timer;
		}
		else
		{
			return '';
		}
	}

	renderTime()
	{
		const wrap = Tag.render`<p>${this.timer}:00</p>`;
		this.layout.time = wrap;
		return this.layout.time;
	}

	renderTriesRemaining()
	{
		if (!this.maxTry)
		{
			return null;
		}
		const wrap = Tag.render`<h2 class ="text-center">У вас осталось попыток: ${this.maxTry - this.try}</h2>`;
		return wrap;
	}

	renderStartButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">Начать</button>
		`;
		Event.bind(wrap, 'click', () => this.onStartButtonClickHandler(wrap));
		return wrap;
	}

	async onStartButtonClickHandler(button)
	{
		this.isStarted = true;
		button.classList.add('disabled');
		this.startTime = await FormManager.createResponse(this.id)
		console.log(this.startTime);
		console.log(new Date(this.startTime * 1000));
		this.startTimer();
		this.render();

	}

	startTimer()
	{
		if (this.timer)
		{
			const endTime = this.addTimeFromTimer(this.startTime, this.timer);
			this.renderTimer();
			this.updateTimer(endTime);
		}
	}

	addTimeFromTimer(time, timer)
	{
		const jsTimeStamp = time * 1000;
		const [hours, minutes] = timer.split(':').map(Number);
		const totalMinutesCombined = hours * 60 + minutes;
		const newDate = new Date(jsTimeStamp + totalMinutesCombined * 60000);
		console.log(newDate);
		return newDate;
	}

	updateTimer(endTime)
	{
		const remainingTime = endTime - new Date();
		console.log(remainingTime);
		if (this.isCompleted)
		{
			return;
		}
		if (remainingTime <= 0)
		{
			this.timeIsUp = true;
			this.submitResponse(this.layout.submitButton);
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
			setTimeout(() => this.updateTimer(endTime), 1000);
		}
	}
}
