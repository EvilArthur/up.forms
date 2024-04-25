import {ShortText} from './short-text';
import { Radio } from './radio';
import { Checkbox } from './checkbox';

export class questionFactory {
	static createQuestion(fieldId, chapterId, id, position, title, options, settings, fieldData) {
		switch (fieldId) {
			case 1:
				return new ShortText(chapterId, id, position, title, options, settings, fieldData);
			case 2:
				return new Radio(chapterId, id, position, title, options, settings, fieldData);
			case 3:
				return new Checkbox(chapterId, id, position, title, options, settings, fieldData);
			default:
				throw new Error("Invalid FieldType");
		}
	}
}