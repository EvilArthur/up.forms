import { Tag } from 'main.core';
import { FormManager } from './form-manager';
import { Question } from './question';
import { Datetime } from './settings/datetime';
import { Time } from './settings/time';
import { Number } from './settings/number';
import { Checkbox } from './settings/checkbox';

export class Settings
{
	constructor(formSetting, allSettings)
	{
		this.layout = {};
		this.settings = [];
		console.log(formSetting);
		console.log(allSettings);
		this.allSettings = allSettings;
		this.allSettings.map((settingData) => {
			let setting;
			const settingValue = formSetting.find(item => item.SETTINGS_ID === parseInt(settingData.ID))?.VALUE;
			if (parseInt(settingData.TYPE_ID) === 1)
			{
				setting = new Datetime(settingData.ID, settingData.TITLE, settingValue);
			}
			else if (parseInt(settingData.TYPE_ID) === 2)
			{
				setting = new Time(settingData.ID, settingData.TITLE, settingValue);
			}
			else if (parseInt(settingData.TYPE_ID) === 3)
			{
				setting = new Checkbox(settingData.ID, settingData.TITLE, settingValue);
			}
			else if (parseInt(settingData.TYPE_ID) === 4)
			{
				setting = new Number(settingData.ID, settingData.TITLE, settingValue);
			}
			this.settings.push(setting);
		});
		this.render();

	}

	render()
	{
		const wrap = Tag.render`
		<div class="container pt-3">
			${this.renderSettingList()}
		</div>`;
		return wrap;
	}

	renderSettingList()
	{
		const wrap = Tag.render`<div>
			${this.settings.map((setting) => setting.render())}
		</div>`;

		return wrap;

	}

	getData()
	{
		const data = this.settings.map((setting) => {
			return {
				'ID': setting.getId(),
				'VALUE': setting.getData(),
			};
		});
		return data;
	}
}