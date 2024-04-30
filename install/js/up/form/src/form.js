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
		this.isSaved = false;
		this.timeIsUp = false;

		this.currentNumOfItems = 0;
		this.numOfItemsPerPage = 10;
		this.limit = this.numOfItemsPerPage + 1;
		this.offset = 0;
		this.currentPage = 1;

		this.startTime = options.values.startTime;
		if (this.startTime && this.timer)
		{
			this.startTimer();
			const timeRemaining = this.addTimeFromTimer(this.startTime, this.timer) - new Date();
			this.timeIsUp = timeRemaining <= 0;
		}
		if (this.timeIsUp)
		{
			this.submitResponse(null);
		}
		this.try = options.values.try;
		this.maxTry = options.values.maxTry;

		this.isStarted = this.startTime ? true : false;
		this.questions = [];
		this.formData = {};
		this.isLoading = true;
		this.reload();
	}

	reload()
	{
		this.questions = [];
		this.formData = {};
		this.layout.wrap.append(this.render());
		this.loadFormData();
	}

	async loadFormData()
	{
		if (parseInt(this.id) !== 0)
		{
			try
			{
				this.formData = await FormManager.getFormData(this.id, this.limit, this.offset);
				this.isLoading = false;
				console.log(this.formData);
				this.chapterId = this.formData.CHAPTER[0].ID;
				console.log(this.chapterId)
				this.formData.CHAPTER[0].QUESTION.map((questionData) => {
					const question = new Question(
						questionData.CHAPTER_ID, questionData.FIELD_ID,
						questionData.ID, questionData.POSITION,
						questionData.TITLE, questionData.OPTION, questionData.SETTINGS[1].VALUE);

					this.questions.push(question);
				});
				this.currentNumOfItems = this.questions.length;
				if (this.currentNumOfItems === this.numOfItemsPerPage + 1)
				{
					this.questions.pop();
				}
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
				${this.renderPagination()}
			</div>`;
			this.isRenderedMainBody = true;
		}
		this.layout.form?.replaceWith(wrap);
		this.layout.form = wrap;
		return this.layout.form;
	}

	renderPagination()
	{
		return Tag.render
			`
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						${this.renderPreviousPageButton()}
						${this.renderNextPageButton()}
					</ul>
				</nav>
			`;
	}

	renderNextPageButton()
	{
		if (this.currentNumOfItems === this.numOfItemsPerPage + 1)
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

	onNextPageButtonClickHandler()
	{
		this.limit += 10;
		this.offset += 10;
		this.currentPage += 1;

		this.reload();
	}


	onPreviousPageButtonClickHandler()
	{
		this.limit -= 10;
		this.offset -= 10;
		this.currentPage -= 1;

		this.reload()
	}

	renderQuestionList()
	{
		return Tag.render`
		<form>
			${this.questions.map((question) => {
				return question.render();
			})}
		</form>
		`;
	}

	renderSubmitButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">Подтвердить</button>
		`;
		this.layout.submitButtonObject = {
			isActive: true,
			wrap: wrap
		}
		Event.bind(wrap, 'click', () => this.submitResponse(this.layout.submitButtonObject));
		return this.layout.submitButtonObject.wrap;
	}

	submitResponse(button = null)
	{
		console.log(button);
		if(button)
		{
			if (!button.isActive)
			{
				return;
			}
			console.log(1);
			button.wrap.classList.add('disabled');
			button.isActive = false;
		}

		let answers = [];
		if (this.isRenderedMainBody)
		{
			button.wrap.classList.add('disabled');
			answers = this.questions.map((question) => {
				return question.getAnswer();
			});
		}
		this.renderErrors([]);
		const data = {
			'FORM_ID': this.id,
			'CHAPTER_ID': this.chapterId,
			'ANSWER': answers,
			'IS_COMPLETED': true,
			'IS_TIME_UP': this.timeIsUp,
		};
		console.log(data);
		FormManager.saveAnswerData(data)
			.then((response) => {
				this.isSaved = true;
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
			.catch((errors) => {
				this.layout.wrap.prepend(this.renderErrors(errors))
				button.wrap.classList.remove('disabled')
				button.isActive = true;
				console.log(errors);
			});
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
		if (this.isSaved)
		{
			return;
		}
		if (remainingTime <= 0)
		{
			this.timeIsUp = true;
			this.submitResponse(this.layout.submitButtonObject);
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

	renderErrors(errors)
	{
		const wrap = Tag.render`<div class="container">
									${errors.map((error) => this.renderError(error.message))}
								</div>`;
		this.layout.error?.replaceWith(wrap);
		this.layout.error = wrap;
		return this.layout.error;
	}

	renderError(message)
	{
		const wrap = Tag.render`<div class="alert alert-danger" role="alert">
								${message}
							</div>`
		return wrap;
	}
}
