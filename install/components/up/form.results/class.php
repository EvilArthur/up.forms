<?php

use Bitrix\Main\Grid\Cell\Label\Color;
use Bitrix\Main\Grid\Column\Type;
use Bitrix\Main\Grid\Panel\Snippet\Onchange;
use Bitrix\Main\Loader;
use Bitrix\Main\Grid\Panel\Actions;
use Bitrix\Main\Grid\Options as GridOptions;
use Bitrix\Main\UI\Filter\Options as FilterOptions;
use Bitrix\Main\UI\PageNavigation;
use Bitrix\Main\UserTable;
use Bitrix\Main\Engine\Response\Redirect;
use Up\Forms\Repository\FormRepository;
use Up\Forms\Repository\QuestionRepository;
use Up\Forms\NotFoundComponent;
use Up\Forms\Repository\ResponseRepository;


class FormResultsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		global $USER, $APPLICATION;
		if(Loader::includeModule('pull'))
		{
			\CPullWatch::Add($USER->GetID(), 'FORM-COMPLETED');
		}

		$this->fetchData();
		if(!$this->arResult['QUESTIONS'])
		{
			$APPLICATION->includeComponent('up:not.found', '', []);
			return;
		}
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
		$this->arResult['QUESTIONS'] = $this->prepareQuestions(QuestionRepository::getQuestionsByFormId($this->arParams['ID']));
		if ($this->arResult['QUESTIONS'])
		{
			$this->arResult['SETTINGS'] = FormRepository::getFormSettings($this->arParams['ID']);
			$this->arResult['FORM_NAME'] = FormRepository::getFormName($this->arParams['ID']);
			$this->arResult['IS_ANONYMOUS'] = $this->arResult['SETTINGS']
				->getByPrimary(['SETTINGS_ID' => 4, 'FORM_ID' => $this->arParams['ID']])
				->getValue();
		}
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
		if ($this->arResult['IS_ANONYMOUS'] === "false")
		{
			$this->arResult['FILTERS'][] = [
				'id' => 'USER',
				'name' => 'Пользователь',
				'type' => 'list',
				'items' => $this->arResult['USERS'],
				'params' => ['multiple' => 'Y'],
				'default' => true,
			];
		}

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
		$columns[] = ($this->arResult['IS_ANONYMOUS'] === "true") ? [] : ['id' => 'USER', 'name' => 'Пользователь', 'default' => true, 'sort' => 'USER_ID'];
		$columns[] = ['id' => 'START_TIME', 'name' => 'Попытка начата', 'default' => true, 'sort' => 'START_TIME'];
		$columns[] = ['id' => 'COMPLETED_TIME', 'name' => 'Попытка Закончена', 'default' => true, 'sort' => 'COMPLETED_TIME'];
		$columns[] = ['id' => 'TRY_NUMBER', 'name' => 'Номер попытки', 'default' => true, 'sort' => 'TRY_NUMBER'];
		foreach ($this->arResult['QUESTIONS'] as $id => $question)
		{
			$columns[] =
				[
					'id' => $id,
					'name' => htmlspecialcharsbx($question['TITLE']),
					'default' => true,
					'type' => Type::LABELS,
				];
		}

		$columns[] = ($this->arResult['NUM_OF_TEST_QUESTIONS'] === 0) ? [] : ['id' => 'NUM_RIGHT_ANSWERS', 'name' => 'Количество правильных ответов', 'default' => true];

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
			'SORT' => $gridFields['sort'],
		];
	}

	protected function prepareResponsesForGrid($responses)
	{
		$rows = [];
		foreach ($responses as $response)
		{
			$numOfRightAnswers = 0;
			$row = [];
			if ($this->arResult['IS_ANONYMOUS'] === "false")
			{
				$row['USER'] = htmlspecialcharsbx($this->arResult['USERS'][$response->getUserId()]);
			}
			$row['START_TIME'] = $response->getStartTime()->format('d M, H:i');
			$row['COMPLETED_TIME'] = $response->getCompletedTime()->format('d M, H:i');
			$row['TRY_NUMBER'] = $response->getTryNumber();
			foreach ($response->getAnswer() as $answer)
			{
				if ($this->arResult["QUESTIONS"][$answer->getQuestionId()]['FIELD_ID'] == 2 || $this->arResult["QUESTIONS"][$answer->getQuestionId()]['FIELD_ID'] == 3)
				{
					$numOfRightOptions = 0;
					foreach ($answer->getSubanswer() as $subAnswer)
					{
						$currentSubAnswer = htmlspecialcharsbx($this->arResult["QUESTIONS"][$answer->getQuestionId()]['OPTIONS'][$subAnswer->getValue()]);
						if (!$this->arResult["QUESTIONS"][$answer->getQuestionId()]['IS_TEST'])
						{
							$row[$answer->getQuestionId()][] =
								[
									'text' => $currentSubAnswer,
									'color' => Color::DEFAULT,
								];
						}
						elseif (isset($this->arResult["QUESTIONS"][$answer->getQuestionId()]['RIGHT_ANSWERS'][$subAnswer->getValue()]))
						{
							$row[$answer->getQuestionId()][] =
								[
									'text' => $currentSubAnswer,
									'color' => Color::SUCCESS,
								];
							$numOfRightOptions += 1;
						}
						else
						{
							$row[$answer->getQuestionId()][] =
								[
									'text' => $currentSubAnswer,
									'color' => Color::DANGER,
								];
						}
					}
					if ($this->arResult["QUESTIONS"][$answer->getQuestionId()]['IS_TEST'] && $numOfRightOptions === count($this->arResult["QUESTIONS"][$answer->getQuestionId()]['RIGHT_ANSWERS']) && count($row[$answer->getQuestionId()]) === $numOfRightOptions)
					{
						$numOfRightAnswers += 1;
					}
				}
				else
				{
					foreach ($answer->getSubanswer() as $subAnswer)
					{
						$row[$answer->getQuestionId()] = htmlspecialcharsbx($subAnswer->getValue());
					}
					if ($this->arResult["QUESTIONS"][$answer->getQuestionId()]['IS_TEST'] === true)
					{
						if (array_shift($this->arResult["QUESTIONS"][$answer->getQuestionId()]['RIGHT_ANSWERS']) === $row[$answer->getQuestionId()])
						{
							$row[$answer->getQuestionId()] =
								[
									[
										'text' => $row[$answer->getQuestionId()],
										'color' => Color::SUCCESS,
									],
								];
							$numOfRightAnswers += 1;
						}
						else
						{
							$row[$answer->getQuestionId()] =
								[
									[
										'text' => $row[$answer->getQuestionId()],
										'color' => Color::DANGER,
									],
								];
						}

					}
				}
			}

			if ($this->arResult['NUM_OF_TEST_QUESTIONS'] !== 0)
			{
				$row['NUM_RIGHT_ANSWERS'] = $numOfRightAnswers . ' из ' . $this->arResult["NUM_OF_TEST_QUESTIONS"];
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

	protected function prepareQuestions($questions)
	{
		$numOfTestQuestions = 0;
		$formattedQuestions = [];
		foreach ($questions as $question)
		{
			$isTestQuestion = false;
			foreach ($question->getOption() as $option)
			{
				$formattedQuestions[$question->getId()]['OPTIONS'][$option->getId()] = $option->getTitle();
				if ($option->getIsRightAnswer() === 'true')
				{
					$formattedQuestions[$question->getId()]['RIGHT_ANSWERS'][$option->getId()] = $option->getTitle();
					$formattedQuestions[$question->getId()]['IS_TEST'] = true;
					$isTestQuestion = true;
				}
				elseif ($option->getIsRightAnswer() === null)
				{
					$formattedQuestions[$question->getId()]['IS_TEST'] = false;
				}
			}
			if ($isTestQuestion)
			{
				$numOfTestQuestions += 1;
			}
			$formattedQuestions[$question->getId()]['TITLE'] = $question->getTitle();
			$formattedQuestions[$question->getId()]['FIELD_ID'] = $question->getFieldId();
		}
		$this->arResult['NUM_OF_TEST_QUESTIONS'] = $numOfTestQuestions;

		return $formattedQuestions;
	}
}