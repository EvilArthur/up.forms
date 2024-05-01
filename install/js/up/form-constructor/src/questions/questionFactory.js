import {ShortText} from './short-text';
import { Radio } from './radio';
import { Checkbox } from './checkbox';

export class questionFactory {
	static createQuestion(deleteFunction, fieldId, chapterId, id, position, title, options, settings, fieldData)
	{
		fieldId = Number(fieldId);
		switch (fieldId) {
			case 1:
				return new ShortText(deleteFunction, chapterId, id, position, title, options, settings, fieldData);
			case 2:
				return new Radio(deleteFunction, chapterId, id, position, title, options, settings, fieldData);
			case 3:
				return new Checkbox(deleteFunction, chapterId, id, position, title, options, settings, fieldData);
			default:
				throw new Error("Invalid FieldType");
		}
	}
}