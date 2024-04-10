import { Event, Loc, Tag } from 'main.core';
import {Question} from '../question';

export class OneOfListQuestion extends Question
{
	renderBody()
	{
		const wrap = Tag.render`<p class="text-decoration-underline mb-0">Один из многих</p>`;
		return wrap
	}
}