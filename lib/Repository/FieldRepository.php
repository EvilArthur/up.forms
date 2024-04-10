<?php
namespace Up\Forms\Repository;

use Up\Forms\Model\FieldTable;

Class FieldRepository
{
	public static function getFields()
	{
		$fields = FieldTable::getList();
		return $fields->fetchAll();
	}
}