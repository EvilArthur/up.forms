import { Tag } from 'main.core';

export class Settings
{
	constructor(id)
	{
		this.id = id;
		this.layout = {};
	}

	render()
	{
		const wrap = Tag.render`
		<div class="container pt-3">
			<div class="accordion" id="settingsAccordion">
				<div class="accordion-item">
					<h2 class="accordion-header" id="timeHeading">
						<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#timeCollapse" aria-expanded="true" aria-controls="timeCollapse">
							Время
						</button>
					</h2>
					<div id="timeCollapse" class="accordion-collapse collapse show" aria-labelledby="timeHeading" data-bs-parent="#settingsAccordion">
						<div class="accordion-body">
							<div class="mb-3">
								<label class="form-label">Время начала доступа к тесту</label>
								${this.renderStartTime()}
							</div>
							<div class="mb-3">
								<label class="form-label">Время конца доступа к тесту</label>
								${this.renderEndTime()}
							</div>
							<div class="mb-3">
								<label class="form-label">Таймер на прохождение</label>
								${this.renderTimer()}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container ms-3">
				<div class="form-check mt-4">
					${this.renderAnonymous()}
					<label class="form-check-label" for="anonymousCheckbox">
						Анонимная форма
					</label>
				</div>
				<div class="container mx-0 px-0">
					<label class="form-label">Количество попыток</label>
					${this.renderNumberOfTry()}
				</div>
			</div>
			
		</div>`;
		return wrap;
	}

	renderStartTime()
	{
		const wrap = Tag.render`<input type="datetime-local" class="form-control w-25">`;
		this.layout.startTime = wrap;
		return this.layout.startTime;
	}

	renderEndTime()
	{
		const wrap = Tag.render`<input type="datetime-local" class="form-control w-25">`;
		this.layout.endTime = wrap;
		return this.layout.endTime;
	}

	renderTimer()
	{
		const wrap = Tag.render`<input type="time" class="form-control w-25">`;
		this.layout.timer = wrap;
		return this.layout.timer;
	}

	renderAnonymous()
	{
		const wrap = Tag.render`<input class="form-check-input" type="checkbox">`;
		this.layout.anonymous = wrap;
		return wrap;
	}

	renderNumberOfTry()
	{
		const wrap = Tag.render`<input type="number" class="form-control w-25" min="1" value="1">`;
		this.layout.numberOfTry = wrap;
		return wrap;
	}

	getData()
	{
		const data = {
			'START_TIME': this.layout.startTime.value  === '' ? null : this.layout.startTime.value,
			'END_TIME': this.layout.endTime.value === '' ? null : this.layout.endTime.value,
			'TIMER': this.layout.timer.value  === '' ? null : this.layout.timer.value,
			'ANONYMOUS': this.layout.anonymous.checked,
			'NUMBER_OF_TRY': this.layout.numberOfTry.value,
		}
		return data;
	}
}