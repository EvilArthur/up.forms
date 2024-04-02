<?php
namespace Up\Tasks\Service;

use Bitrix\Main\Context;
use Up\Forms\Model\EO_Form;
use Up\Forms\Model\FormTable;

class FormManager
{
	public static function createForm()
	{
		$form = new EO_Form();
		$form->setTitle('New form');
		$form->setCreatorId(1);
		$form->save();

		var_dump(FormTable::getByPrimary(1)->fetchObject());
		die();
	}
}