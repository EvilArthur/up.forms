<?php
namespace Up\Forms\Service;

class FormManager
{
	public static function prepareFormsForGrid(array $forms, int $countOfItemsOnPage)
	{
		$rows = [];

		foreach ($forms as $form)
		{
			$rows[] = [
				'id' => (int)$form['ID'],
				'columns' => [
					'Title' => $form['Title'],
					'DATE_CREATE' => '2022-01-01',
					'STATUS' => 'Active',
					'USER_NAME' => 'Супер Админ'
				],
				'actions' => [
					[
						'text' => 'Delete',
						'onclick' => 'FormList.deleteForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Edit',
						'onclick' => 'FormList.editForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Open',
						'onclick' => 'FormList.openForm(' . $form['ID'] . ')',
						'default' => true,
					],
					[
						'text' => 'Results',
						'onclick' => 'FormList.showResults(' . $form['ID'] . ')',
						'default' => true,
					],
				],

			];
		}

		if (count($rows) > $countOfItemsOnPage)
		{
			array_pop($rows);
		}

		return $rows;
	}
}