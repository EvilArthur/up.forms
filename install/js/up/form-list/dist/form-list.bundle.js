/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var FormList = /*#__PURE__*/function () {
	  function FormList() {
	    var _this = this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, FormList);
	    this.gridId = options.gridId;
	    console.log(this.gridId);
	    BX.addCustomEvent('onPullEvent', function (module_id, command, params) {
	      if (command === 'update') {
	        _this.reload();
	      }
	    });
	  }
	  babelHelpers.createClass(FormList, [{
	    key: "deleteForms",
	    value: function deleteForms() {
	      BX.ready(function () {
	        var _BX$Main$gridManager$;
	        var grid = (_BX$Main$gridManager$ = BX.Main.gridManager.getById('FORMS_LIST_GRID')) === null || _BX$Main$gridManager$ === void 0 ? void 0 : _BX$Main$gridManager$.instance;
	        if (main_core.Type.isObject(grid)) {
	          var rowsCollectionWrapper = grid.getRows();
	          var selectedRowsIdsList = rowsCollectionWrapper.getSelectedIds();
	          BX.ajax.runAction('up:forms.form.deleteForms', {
	            data: {
	              ids: selectedRowsIdsList
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: "deleteForm",
	    value: function deleteForm(formId) {
	      BX.ready(function () {
	        var _BX$Main$gridManager$2;
	        var grid = (_BX$Main$gridManager$2 = BX.Main.gridManager.getById('FORMS_LIST_GRID')) === null || _BX$Main$gridManager$2 === void 0 ? void 0 : _BX$Main$gridManager$2.instance;
	        if (main_core.Type.isObject(grid)) {
	          BX.ajax.runAction('up:forms.form.deleteForm', {
	            data: {
	              id: formId
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: "openForm",
	    value: function openForm(formId) {
	      this.openSlider("/form/view/".concat(formId, "/"));
	    }
	  }, {
	    key: "editForm",
	    value: function editForm(formId) {
	      this.openSlider("/form/edit/".concat(formId, "/"));
	    }
	  }, {
	    key: "createForm",
	    value: function createForm() {
	      this.openSlider("/form/create/");
	    }
	  }, {
	    key: "showResults",
	    value: function showResults(formId) {
	      this.openSlider("/form/results/".concat(formId, "/"));
	    }
	  }, {
	    key: "reload",
	    value: function reload() {
	      BX.ready(function () {
	        var _BX$Main$gridManager$3;
	        var grid = (_BX$Main$gridManager$3 = BX.Main.gridManager.getById('FORMS_LIST_GRID')) === null || _BX$Main$gridManager$3 === void 0 ? void 0 : _BX$Main$gridManager$3.instance;
	        if (main_core.Type.isObject(grid)) {
	          console.log(grid);
	          grid.reload();
	        }
	      });
	    }
	  }, {
	    key: "openSlider",
	    value: function openSlider(url) {
	      BX.SidePanel.Instance.open(url);
	    }
	  }]);
	  return FormList;
	}();

	// this.layout = {};
	// this.layout.wrap = options.container;
	// this.formList = [];
	// this.isLoading = true;
	// if (!this.layout.wrap)
	// {
	// 	throw new Error(`Forms: container is not found`);
	// }
	// this.layout.wrap.append(this.render());
	// this.layout.wrap.append(this.renderFormTable());
	// this.loadFormsData();
	// BX.addCustomEvent('onPullEvent', (module_id, command, params) => {
	// 	if (command === 'update')
	// 	{
	// 		this.reload();
	// 	}
	// });
	// BX.PULL.extendWatch('FORMS-UPDATE');

	// const gridRealtime: BX.Grid.Realtime = grid.getRealtime();
	// gridRealtime.addRow({
	// 	id: 1,
	// 	insertBefore: 1,
	// 	columns: {
	// 		ID: 'новове ID ',
	// 		NAME: 'Новое имя',
	// 		DATE_CREATE: 'content',
	// 		STATUS: 'NEW',
	// 		USER_ID: '6'
	// 	},
	// });

	// async loadFormsData()
	// {
	// 	try
	// 	{
	// 		this.formList = await this.loadList();
	// 		this.isLoading = false;
	// 		this.layout.form = this.renderFormTable();
	// 	}
	// 	catch (error)
	// 	{
	// 		console.log(error);
	// 	}
	// }
	//
	// render()
	// {
	// 	const wrap = Tag.render`
	// 		<nav class="navbar navbar-expand-lg bg-body-tertiary mb-10">
	// 			<div class="container-fluid">
	// 				<div class="collapse navbar-collapse" id="navbarSupportedContent">
	// 					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
	// 						<div class="container-fluid justify-content-start">
	// 							${this.renderOpenCreateButton()}
	// 						</div>
	// 					</ul>
	// 					<form class="d-flex" role="search">
	// 						<input class="form-control me-2" type="search" placeholder="Название формы..." aria-label="Search">
	// 						<button class="btn btn-outline-success" type="submit">Поиск</button>
	// 					</form>
	// 				</div>
	// 			</div>
	// 		</nav>`;
	// 	return wrap;
	// }
	//
	// renderFormTable()
	// {
	// 	let wrap;
	// 	if (this.isLoading)
	// 	{
	// 		wrap = Tag.render
	// 			`
	// 			<div class="container d-flex justify-content-center">
	// 				<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
	// 					<span class="sr-only"></span>
	// 				</div>
	// 			</div>
	// 			`;
	// 	}
	// 	else
	// 	{
	// 		wrap = Tag.render
	// 			`
	// 			<table class="table" id="form-list-app">
	// 				<tbody>
	// 					${this.formList.map((form) => {
	// 				return this.renderForm(form);
	// 			})}
	// 				</tbody>
	// 			</table>
	// 			`;
	// 	}
	// 	this.layout.form?.replaceWith(wrap);
	// 	this.layout.form = wrap;
	// 	return this.layout.form;
	// }
	//
	// renderForm(form)
	// {
	// 	return Tag.render
	// 		`
	// 		<tr>
	// 			<td class="align-middle">${form.Title}</td>
	// 			<td>${this.renderOpenEditButton(form.ID)}</td>
	// 			<td>${this.renderOpenFormButton(form.ID)}</td>
	// 			<td><button class="btn btn-info">${Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_RESULTS')}</button></td>
	// 			<td>${this.renderDeleteButton(form.ID)}</td>
	// 		</tr>
	// 		`;
	// }
	//

	// loadList()
	// {
	// 	return new Promise((resolve, reject) => {
	// 		BX.ajax.runAction(
	// 				'up:forms.form.getList',
	// 				{},
	// 			)
	// 			.then((response) => {
	// 				const formList = response.data.formList;
	// 				resolve(formList);
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 				reject(error);
	// 			});
	// 	});
	// }
	//

	exports.FormList = FormList;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
