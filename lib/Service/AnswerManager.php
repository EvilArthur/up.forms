<?php
namespace Up\Forms\Service;

use Bitrix\Main\UserTable;
use Up\Forms\Model\EO_Subanswer;

class AnswerManager
{
	public static function prepareResponsesForGrid($responses, int $countOfItemsOnPage)
	{
		$rows = [];

		foreach ($responses as $response)
		{
			$row = [];
			$row['USER'] = UserTable::getByPrimary(1)->fetchObject()->getName();
			foreach ($response->getAnswer() as $answer)
			{
				foreach ($answer->getSubanswer() as $subAnswer)
				{
					$row[$answer->getQuestionId()] .= $subAnswer->getValue();
				}
			}

			$rows[] = [
				'id' => (int)$response->getId(),
				'columns' => $row
			];
		}




		if (count($rows) > $countOfItemsOnPage)
		{
			array_pop($rows);
		}

		return $rows;
	}
}