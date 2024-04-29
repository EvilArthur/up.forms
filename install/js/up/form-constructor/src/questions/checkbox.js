import Question from './question'
import { CheckboxOption } from './options/checkbox-option';

export class Checkbox extends Question
{
	constructor(chapterId, id, position, title, optionData, settingData, fieldData)
	{
		super(chapterId, id, position, title, optionData, settingData, fieldData);
		this.options = optionData.map((option) => {
			if (option)
			{
				/*if (option.IS_RIGHT_ANSWER)*/
				return new CheckboxOption(option.ID, option.TITLE, this.titleObject.value, this.id, this.toBoolean(option.IS_RIGHT_ANSWER), this.isHaveRightAnswerObject);
			}
		});
		this.fieldId = 3
	}

	onAddOptionButtonClickHandler()
	{
		const option = new CheckboxOption(null, 'Новая опция', this.titleObject.value, this.id, false, this.isHaveRightAnswerObject);
		this.layout.options.append(option.render());
		this.options.push(option);
	}
}