<?php

use Bitrix\Main\Engine\Response\Redirect;
use Bitrix\Main\Grid\Panel\Snippet\Onchange;
use Bitrix\Main\UserTable;
use Up\Forms\Model\FormTable;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Bitrix\Main\Grid\Panel\Actions;

use Up\Forms\Repository\ResponseRepository;


class FormResultsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchData();
		$this->fetchActionPanel();
		$this->fetchGridColumns();
		$this->fetchFilterParams();
		$this->fetchGridRows();
		$this->includeComponentTemplate();
	}

	public function onPrepareComponentParams($arParams)
	{
		$arParams['ID'] = (int) $arParams['ID'];
		$arParams['GRID_ID'] = "RESPONSES_RESULTS_GRID_{$arParams['ID']}";
		$arParams['FILTER_ID'] = "RESPONSES_RESULTS_GRID_FILTER_{$arParams['ID']}";
		$arParams['NAVIGATION_ID'] = "RESPONSES_RESULTS_GRID_NAVIGATION_{$arParams['ID']}";
		$arParams['NUM_OF_ITEMS_PER_PAGE'] = 10;

		if ($arParams['ID'] <= 0)
		{
			$response = new Redirect('404');
			$response->setStatus('404');
		}
		return $arParams;
	}

	protected function fetchData()
	{
		$users = UserTable::query()->setSelect(['ID', 'NAME'])->fetchAll();
		foreach ($users as $user)
		{
			$this->arResult['USERS'][$user['ID']] = $user['NAME'];
		}
		$this->arResult['QUESTIONS'] = FormTable::getByPrimary($this->arParams['ID'])->fetchObject()->fillChapter()->fillQuestion();
	}

	protected function fetchActionPanel()
	{
		$deleteOnchange = new Onchange();
		$deleteOnchange->addAction(
			[
				'ACTION' => Actions::CALLBACK,
				'CONFIRM' => true,
				'CONFIRM_APPLY_BUTTON'  => 'Подтвердить',
				'DATA' => [
					['JS' => 'window.FormResults.deleteResponses()'],
				],
			]
		);

		$this->arResult['ACTION_PANEL'] = [
			'GROUPS' => [
				'TYPE' => [
					'ITEMS' => [
						[
							'ID'       => 'delete',
							'TYPE'     => 'BUTTON',
							'TEXT'     => 'Удалить',
							'CLASS'    => 'icon remove',
							'ONCHANGE' => $deleteOnchange->toArray(),
						],
					],
				],
			],
		];
	}

	protected function fetchFilterParams()
	{
		$this->arResult['FILTERS'] =
			[
				[
					'id' => 'USER',
					'name' => 'Пользователь',
					'type' => 'list',
					'items' => $this->arResult['USERS'],
					'params' => ['multiple' => 'Y'],
					'default' => true,
				],
			];

		$this->arResult['FILTER_PARAMS'] =
			[
				'GRID_ID' => $this->arParams['GRID_ID'],
				'FILTER_ID' => $this->arParams['FILTER_ID'],
				'FILTER' => $this->arResult['FILTERS'],
				'DISABLE_SEARCH' => true,
				'ENABLE_LABEL' => true,
			];
	}

	protected function fetchGridColumns()
	{
		$columns[] = ['id' => 'USER', 'name' => 'Пользователь', 'default' => true, 'sort' => 'USER_ID'];

		foreach ($this->arResult['QUESTIONS'] as $question)
		{
			$columns[] =
				[
					'id' => $question->getId(),
					'name' => htmlspecialcharsbx($question->getTitle()),
					'default' => true,
				];
		}

		$this->arResult['COLUMNS'] = $columns;
	}

	protected function fetchGridRows()
	{
		$this->fetchNavigation();
		$this->fetchFilter();

		$responses = ResponseRepository::getResponsesByFormId($this->arParams['ID'], $this->arResult['FILTER']);
		$this->arResult['ROWS'] = $this->prepareResponsesForGrid($responses);
	}

	protected function fetchNavigation()
	{
		$nav = new PageNavigation($this->arParams['NAVIGATION_ID']);
		$nav->allowAllRecords(false)
			->setPageSize($this->arParams['NUM_OF_ITEMS_PER_PAGE'])
			->initFromUri();
		$this->arResult['NAV_OBJECT'] = $nav;
	}

	protected function fetchFilter()
	{
		$gridOptions = new GridOptions($this->arParams['GRID_ID']);
		$gridFields = $gridOptions->getSorting();
		$filterOptions = new FilterOptions($this->arParams['FILTER_ID']);
		$filterFields = $filterOptions->getFilter($this->arResult['FILTERS']);

		$this->arResult['FILTER'] = [
			'LIMIT' => $this->arResult['NAV_OBJECT']->getLimit() + 1,
			'OFFSET' => $this->arResult['NAV_OBJECT']->getOffset(),
			'USERS' => $filterFields['USER'],
			'SORT' => $gridFields['sort']
		];
	}

	protected function prepareResponsesForGrid($responses)
	{
		$rows = [];

		foreach ($responses as $response)
		{
			$row = [];
			$row['USER'] = htmlspecialcharsbx($this->arResult['USERS'][$response->getUserId()]);

			foreach ($response->getAnswer() as $answer)
			{
				$questionType = $answer->getQuestion()->getField()->getId();
				if ($questionType == 2 || $questionType == 3)
				{
					foreach ($answer->getSubanswer() as $subAnswer)
					{
						$row[$answer->getQuestionId()] .= htmlspecialcharsbx($answer->getQuestion()->getOption()->getByPrimary($subAnswer->getValue())->getTitle()) . "<br>";
					}
				}
				else
				{
					foreach ($answer->getSubanswer() as $subAnswer)
					{
						$row[$answer->getQuestionId()] = htmlspecialcharsbx($subAnswer->getValue());
					}
				}

			}


			$rows[] = [
				'id' => (int)$response->getId(),
				'columns' => $row,
				'actions' => [
					[
						'text' => 'Delete',
						'onclick' => 'window.FormResults.deleteResponse(' . $response->getId() . ')',
						'default' => true,
					],
				],
			];
		}

		if (count($rows) > $this->arParams['NUM_OF_ITEMS_PER_PAGE'])
		{
			array_pop($rows);
		}

		$this->arResult['NAV_OBJECT']->setRecordCount($this->arResult['NAV_OBJECT']->getOffset() + count($responses));

		return $rows;
	}
}