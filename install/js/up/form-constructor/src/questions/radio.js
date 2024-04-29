import Question from './question'
import { RadioOption } from './options/radio-option';

export class Radio extends Question
{
	constructor(chapterId, id, position, title, optionData, settingData, fieldData)
	{
		super(chapterId, id, position, title, optionData, settingData, fieldData);
		this.options = optionData.map((option) => {
			if (option)
			{
				return new RadioOption(option.ID, option.TITLE, this.titleObject.value, this.id, this.toBoolean(option.IS_RIGHT_ANSWER), this.isHaveRightAnswerObject);
			}
		});
		this.fieldId = 2
	}

	onAddOptionButtonClickHandler()
	{
		const option = new RadioOption(null, 'Новая опция', this.titleObject.value, this.id, false, this.isHaveRightAnswerObject);
		this.layout.options.append(option.render());
		this.options.push(option);
	}
}