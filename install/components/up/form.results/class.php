<?php

use Bitrix\Main\Engine\Response\Redirect;
use Up\Forms\Model\FormTable;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Up\Forms\Repository\AnswerRepository;
use Up\Forms\Service\AnswerManager;

class FormResultsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchGridColumns();
		$this->fetchFilterParams();
		$this->fetchGridRows();
		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['ID'] = (int) $arParams['ID'];
		$arParams['GRID_ID'] = "ANSWERS_RESULTS_GRID_{$arParams['ID']}";
		$arParams['FILTER_ID'] = "ANSWERS_RESULTS_GRID_FILTER_{$arParams['ID']}";
		$arParams['NAVIGATION_ID'] = "ANSWERS_RESULTS_GRID_NAVIGATION_{$arParams['ID']}";
		$arParams['NUM_OF_ITEMS_PER_PAGE'] = 10;
		$arParams['FILTERS'] = [['id' => 'USER', 'name' => 'Имя пользователя']];
		if ($arParams['ID'] <= 0)
		{
			$response = new Redirect('404');
			$response->setStatus('404');
		}
		return $arParams;
	}

	protected function fetchGridColumns()
	{
		$columns[] = ['id' => 'USER', 'name' => 'Пользователь', 'default' => true];
		$questions = FormTable::getByPrimary($this->arParams['ID'])->fetchObject()->fillChapter()->fillQuestion();

		foreach ($questions as $question)
		{
			$columns[] = [
				'id' => $question->getId(),
				'name' => $question->getTitle(),
				'default' => true
			];
		}

		$this->arResult['COLUMNS'] = $columns;
	}

	protected function fetchFilterParams()
	{
		$this->arResult['FILTER_PARAMS'] = [
			'GRID_ID' => $this->arParams['GRID_ID'],
			'FILTER_ID' => $this->arParams['FILTER_ID'],
			'FILTER' => $this->arParams['FILTERS'],
			'DISABLE_SEARCH' => true,
			'ENABLE_LABEL' => true,
		];
	}

	protected function fetchGridRows()
	{
		$gridOptions = new GridOptions($this->arParams['GRID_ID']);
		$filterOptions = new FilterOptions($this->arParams['FILTER_ID']);
		// $filterFields = $filterOptions->getFilter($this->arParams['FILTERS']);


		$nav = new PageNavigation($this->arParams['NAVIGATION_ID']);
		$nav->allowAllRecords(false)
			->setPageSize($this->arParams['NUM_OF_ITEMS_PER_PAGE'])
			->initFromUri();

		$filter = [
			'LIMIT' => $nav->getLimit() + 1,
			'OFFSET' => $nav->getOffset(),
		];

		$answers = AnswerRepository::getAnswersByFormId($this->arParams['ID'], $filter);
		$rows = AnswerManager::prepareAnswersForGrid($answers, $this->arParams['NUM_OF_ITEMS_PER_PAGE']);
		$nav->setRecordCount($nav->getOffset() + count($answers));

		$this->arResult['ROWS'] = $rows;
		$this->arResult['NAV_OBJECT'] = $nav;
	}
}