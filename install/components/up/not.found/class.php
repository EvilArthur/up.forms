<?php

namespace Up\Forms;
use CBitrixComponent;

class NotFoundComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->includeComponentTemplate();
	}
}