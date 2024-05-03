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
	    if (options.action) {
	      var newUrl = '/forms/';
	      history.pushState({
	        path: newUrl
	      }, 'Формы', newUrl);
	      switch (options.action) {
	        case 'create':
	          {
	            this.openSlider('/form/create/');
	            break;
	          }
	        case 'edit':
	          if (options.formId) {
	            this.openSlider('/form/edit/'.concat(options.formId, '/'));
	          }
	          break;
	        case 'result':
	          if (options.formId) {
	            this.openSlider('/form/results/'.concat(options.formId, '/'));
	          }
	          break;
	      }
	    }
	    this.gridId = options.gridId;
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
	    key: "createTask",
	    value: function createTask(formTitle, formId, userId) {
	      BX.SidePanel.Instance.open("/company/personal/user/" + userId + "/tasks/task/edit/0/?SCOPE=tasks_grid", {
	        requestMethod: "post",
	        requestParams: {
	          'TITLE': main_core.Loc.getMessage('UP_FORMS_FORM_LIST_TASK_TITLE') + ' - ' + formTitle,
	          'DESCRIPTION': "[URL=/form/view/" + formId + "/]".concat(main_core.Loc.getMessage('UP_FORMS_FORM_LIST_TASK_DESCRIPTION'), "[/URL]"),
	          'TAGS': [main_core.Loc.getMessage('UP_FORMS_FORM_LIST_TASK_TAG')]
	        },
	        cacheable: false
	      });
	    }
	  }, {
	    key: "createFastTask",
	    value: function createFastTask(formTitle, formId, userId) {
	      BX.ajax.runAction('up:forms.task.createFastTask', {
	        data: {
	          formTitle: formTitle,
	          formId: formId,
	          userId: userId
	        }
	      });
	    }
	  }, {
	    key: "reload",
	    value: function reload() {
	      BX.ready(function () {
	        var _BX$Main$gridManager$3;
	        var grid = (_BX$Main$gridManager$3 = BX.Main.gridManager.getById('FORMS_LIST_GRID')) === null || _BX$Main$gridManager$3 === void 0 ? void 0 : _BX$Main$gridManager$3.instance;
	        if (main_core.Type.isObject(grid)) {
	          grid.reload();
	        }
	      });
	    }
	  }, {
	    key: "openSlider",
	    value: function openSlider(url) {
	      BX.SidePanel.Instance.open(url, {
	        width: 1000
	      });
	    }
	  }]);
	  return FormList;
	}();

	exports.FormList = FormList;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
