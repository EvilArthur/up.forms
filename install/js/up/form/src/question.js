import {Tag, Event, Type} from 'main.core';

export class Question
{
	constructor(questionData)
	{
		this.layout = {}
		this.layout.wrap = null
		this.layout.input = null
		this.questionData = questionData
	}
	render(): HTMLElement
	{
		const wrap = Tag.render`
		<div class="mb-3">
			<label class="form-label">${this.questionData.Title}</label>
			${this.renderInput()}
		</div>
		`
		this.layout.wrap = wrap
		return this.layout.wrap;
	}

	renderInput()
	{
		const wrap = Tag.render`
			<input class="form-control" type="text">
		`
		this.layout.input = wrap
		return this.layout.input
	}

	getAnswer()
	{
		return {
			'id': this.questionData.ID,
			'answer':this.layout.input.value
		}
	}
}
