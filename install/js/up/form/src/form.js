import { Event, Loc, Tag } from 'main.core';
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
		this.responseId = false;
		this.passedPages = [1];
		this.nextPageIsPassed = false;

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
			if (this.nextPageIsPassed)
			{
				this.formData = await FormManager.getFormData(this.id, this.limit, this.offset, this.responseId);

				this.isLoading = false;
				this.chapterId = this.formData.CHAPTER[0].ID;

				this.formData.CHAPTER[0].QUESTION.map((questionData) => {
					const question = new Question(
						questionData.CHAPTER_ID, questionData.FIELD_ID,
						questionData.ID, questionData.POSITION,
						questionData.TITLE, questionData.OPTION, questionData.SETTINGS[1].VALUE, questionData.ANSWER[0]);

					this.questions.push(question);
				});
			}
			else
			{
				this.formData = await FormManager.getFormData(this.id, this.limit, this.offset, this.nextPageIsPassed);

				this.isLoading = false;
				this.chapterId = this.formData.CHAPTER[0].ID;

				this.formData.CHAPTER[0].QUESTION.map((questionData) => {
					const question = new Question(
						questionData.CHAPTER_ID, questionData.FIELD_ID,
						questionData.ID, questionData.POSITION,
						questionData.TITLE, questionData.OPTION, questionData.SETTINGS[1].VALUE);

					this.questions.push(question);
				});
			}

			this.currentNumOfItems = this.questions.length;
			if (this.currentNumOfItems === this.numOfItemsPerPage + 1)
			{
				this.questions.pop();
			}
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
		else if (!this.isStarted)
		{
			wrap = Tag.render`
				<div class="container">
					<h1 class="text-center mb-5">${this.formData.TITLE}</h1>
					${this.renderTriesRemaining()}
					<div class="d-flex justify-content-center">${this.renderStartButton()}</div>
				</div>`;
		}
		else if (this.timeIsUp)
		{
			wrap = Tag.render`
				<div class="container">
					<h1 class="text-center mb-5">${this.formData.TITLE}</h1>
					<div class="d-flex justify-content-center">
						<h2 class ="text-center">${Loc.getMessage('UP_FORMS_FORM_TIME_IS_UP_MESSAGE')}</h2>
					</div>
				</div>`;
		}
		else
		{
			wrap = Tag.render`
			<div class="container">
				<h1 class="text-center mb-5">${this.formData.TITLE}</h1>
				${this.renderTimer()}
				${this.renderQuestionList()}
				${this.renderPagination()}
				${this.renderSubmitButton()}
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
				<nav class="d-flex justify-content-center mt-5">
					<ul class="pagination">
						${this.renderPreviousPageButton()}
						${this.renderNextPageButton()}
					</ul>
				</nav>
			`;
	}

	renderNextPageButton()
	{
		if (this.currentNumOfItems === this.numOfItemsPerPage + 1 || this.passedPages.includes(this.currentPage + 1))
		{
			const wrap = Tag.render
				`
				<li class="page-item">
					
						<button class="page-link" aria-hidden="true">&raquo;</button>
					
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
					
						<button class="page-link" aria-hidden="true">&laquo;</button>
					
				</li>
				`;
			Event.bind(wrap, 'click', this.onPreviousPageButtonClickHandler.bind(this));
			return wrap;
		}
	}

	onNextPageButtonClickHandler()
	{
		this.submitIntermediateResponse()
			.then((responseId) => {
				// this.limit += 10;
				this.offset += 10;
				this.currentPage += 1;
				this.responseId = responseId;
				this.updatePassedPages();
				this.reload();
			})
			.catch((errors) => {
				this.layout.wrap.prepend(this.renderErrors(errors));
			});
	}

	onPreviousPageButtonClickHandler()
	{
		this.submitIntermediateResponse()
			.then((responseId) => {
				this.nextPageIsPassed = true;
				// this.limit -= 10;
				this.offset -= 10;
				this.currentPage -= 1;
				this.responseId = responseId;
				this.reload();
			})
			.catch((errors) => {
				this.layout.wrap.prepend(this.renderErrors(errors));
			});
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
			<div class="d-flex justify-content-center mt-5">
				<button class="btn btn-primary submit-button">
					${Loc.getMessage('UP_FORMS_FORM_SUBMIT_BUTTON')}
				</button>
			</div>
			
		`;
		this.layout.submitButtonObject = {
			isActive: true,
			wrap: wrap,
		};
		Event.bind(wrap, 'click', () => this.submitResponse(this.layout.submitButtonObject));
		return this.layout.submitButtonObject.wrap;
	}

	submitIntermediateResponse()
	{
		let answers = [];
		if (this.isRenderedMainBody)
		{
			answers = this.questions.map((question) => {
				return question.getAnswer();
			});
		}
		this.renderErrors([]);
		const data = {
			'FORM_ID': this.id,
			'CHAPTER_ID': this.chapterId,
			'ANSWER': answers,
			'IS_COMPLETED': false,
			'IS_TIME_UP': this.timeIsUp,
		};

		return FormManager.saveAnswerData(data);
	}

	updatePassedPages()
	{
		if (!this.passedPages.includes(this.currentPage))
		{
			this.passedPages.push(this.currentPage);
			this.nextPageIsPassed = false;
		}
	}

	submitResponse(button = null)
	{
		if (button)
		{
			if (!button.isActive)
			{
				return;
			}
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
		FormManager.saveAnswerData(data)
			.then((response) => {
				this.isSaved = true;
				if (!this.timeIsUp)
				{
					if (!BX.SidePanel.Instance.isOpen())
					{
						window.location.pathname = '/';
						return;
					}
					BX.SidePanel.Instance.close();
					const url = BX.SidePanel.Instance.getCurrentUrl();
					setTimeout(() => BX.SidePanel.Instance.destroy(url), 1000);
				}
				else
				{
					this.render();
				}
			})
			.catch((errors) => {
				this.layout.wrap.prepend(this.renderErrors(errors));
				button.wrap.classList.remove('disabled');
				button.isActive = true;
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
		const wrap = Tag.render`
				<h2 class ="text-center">
					${Loc.getMessage('UP_FORMS_FORM_TRYIES_REMAINING')}: ${this.maxTry - this.try}
				</h2>`;
		return wrap;
	}

	renderStartButton()
	{
		const wrap = Tag.render`
			<button class="btn btn-primary">
				${Loc.getMessage('UP_FORMS_FORM_START_BUTTON')}
			</button>
		`;
		Event.bind(wrap, 'click', () => this.onStartButtonClickHandler(wrap));
		return wrap;
	}

	async onStartButtonClickHandler(button)
	{
		this.isStarted = true;
		button.classList.add('disabled');
		this.startTime = await FormManager.createResponse(this.id);
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
		return newDate;
	}

	updateTimer(endTime)
	{
		const remainingTime = endTime - new Date();
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
							</div>`;
		return wrap;
	}
}