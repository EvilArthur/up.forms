import Question from './question'
import { ShortTextOption } from './options/short-text-option';

export class ShortText extends Question
{
	constructor(chapterId, id, position, title, optionData, settingData, fieldData)
	{
		super(chapterId, id, position, title, optionData, settingData, fieldData);
		this.options = optionData.map((option) => {
			if (option)
			{
				return new ShortTextOption(option.ID, option.TITLE, this.isHaveRightAnswerObject);
			}
		});
		this.fieldId = 1
	}

	renderAddOptionButton()
	{}

	renderClearButton()
	{}

}