/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	function escape(string) {
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;'
	  };
	  return string.replace(/[&<>"']/g, function (match) {
	    return htmlEscapes[match];
	  });
	}

	var _templateObject;
	var EditableText = /*#__PURE__*/function () {
	  function EditableText(element, textObject, renderFunction) {
	    babelHelpers.classCallCheck(this, EditableText);
	    this.element = element;
	    this.textObject = textObject;
	    this.renderFunction = renderFunction;
	    this.setupEditHandler();
	  }
	  babelHelpers.createClass(EditableText, [{
	    key: "setupEditHandler",
	    value: function setupEditHandler() {
	      main_core.Event.bind(this.element, 'click', this.onEditableTextClickHandler.bind(this));
	    }
	  }, {
	    key: "onEditableTextClickHandler",
	    value: function onEditableTextClickHandler() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<input type=\"text\" class=\"form-control form-control-sm w-50\" value=\"", "\">\n\t\t"])), this.element.innerText);
	      main_core.Event.bind(wrap, 'blur', this.onEditableTextEndChangeHandler.bind(this));
	      main_core.Event.bind(wrap, 'keypress', function (event) {
	        if (event.key === 'Enter') {
	          _this.onEditableTextEndChangeHandler();
	        }
	      });
	      this.input = wrap;
	      this.element.replaceWith(this.input);
	      this.input.focus();
	    }
	  }, {
	    key: "onEditableTextEndChangeHandler",
	    value: function onEditableTextEndChangeHandler() {
	      var newTitle = escape(this.input.value.trim());
	      this.textObject.value = newTitle;
	      if (newTitle === '') {
	        return;
	      }
	      this.input.replaceWith(this.renderFunction());
	    }
	  }]);
	  return EditableText;
	}();

	var FormManager = /*#__PURE__*/function () {
	  function FormManager() {
	    babelHelpers.classCallCheck(this, FormManager);
	  }
	  babelHelpers.createClass(FormManager, null, [{
	    key: "getFormData",
	    value: function getFormData(id) {
	      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.getFormData', {
	          data: {
	            id: id,
	            limit: limit,
	            offset: offset,
	            responseId: false
	          }
	        }).then(function (response) {
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "saveFormData",
	    value: function saveFormData(data) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.saveFormData', {
	          data: data
	        }).then(function (response) {
	          var result = {
	            id: response.data.ID,
	            chapterId: response.data.CHAPTER_ID
	          };
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error.errors);
	        });
	      });
	    }
	  }, {
	    key: "getFieldData",
	    value: function getFieldData() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.getFieldData').then(function (response) {
	          var result = response.data.result;
	          console.log(result);
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getSettingsData",
	    value: function getSettingsData() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.getSettingsData').then(function (response) {
	          var result = response.data.result;
	          console.log(result);
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getQuestionData",
	    value: function getQuestionData(id, limit, offset) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.getQuestionData', {
	          data: {
	            id: id,
	            limit: limit,
	            offset: offset
	          }
	        }).then(function (response) {
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "deleteQuestion",
	    value: function deleteQuestion(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.deleteQuestion', {
	          data: {
	            id: id
	          }
	        }).then(function (response) {
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return FormManager;
	}();

	var _templateObject$1, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;
	var Question = /*#__PURE__*/function () {
	  function Question(reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData) {
	    babelHelpers.classCallCheck(this, Question);
	    this.reload = reloadFunction;
	    this.layout = {
	      typeSelect: null
	    };
	    this.titleObject = {
	      value: title
	    };
	    this.chapterId = chapterId;
	    this.id = id;
	    this.position = position;
	    this.fieldData = fieldData;
	    this.isDeleted = false;
	    this.settingData = settingData;
	    this.isHaveRightAnswerObject = {
	      value: this.toBoolean(this.settingData.find(function (setting) {
	        return Number(setting.SETTINGS_ID) === 1;
	      }).VALUE)
	    };
	    this.isRequiredQuestion = this.toBoolean(this.settingData.find(function (setting) {
	      return Number(setting.SETTINGS_ID) === 2;
	    }).VALUE);
	    this.fieldId = null;
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      var _this$layout$wrap;
	      if (this.isDeleted) {
	        return main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral([""])));
	      }
	      var wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"card mb-3 mt-3\">\n\t\t\t\t<div class=\"card-header\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col text-left\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col text-end\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col text-end\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t", "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<p>", "</p>\n\t\t\t\t</div>\n\t\t\t</div>"])), this.renderEditableTitle(), this.renderAutocheck(), this.renderTypes(), this.renderRemoveQuestionButton(), this.renderBody(), this.renderRequired());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderRemoveQuestionButton",
	    value: function renderRemoveQuestionButton() {
	      var wrap = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn btn-danger\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onRemoveQuestionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onRemoveQuestionButtonClickHandler",
	    value: function onRemoveQuestionButtonClickHandler() {
	      this.isDeleted = true;
	      if (this.id) {
	        FormManager.deleteQuestion(this.id).then(this.reload());
	      } else {
	        this.reload();
	      }
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var _this$layout$title;
	      if (this.titleObject.value === '') {
	        this.titleObject.value = 'Название';
	      }
	      var wrap = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<h3 class=\"form-label\">", "</h3>\n\t\t"])), this.titleObject.value);
	      new EditableText(wrap, this.titleObject, this.renderEditableTitle.bind(this));
	      (_this$layout$title = this.layout.title) === null || _this$layout$title === void 0 ? void 0 : _this$layout$title.replaceWith(wrap);
	      this.layout.title = wrap;
	      return this.layout.title;
	    }
	  }, {
	    key: "renderAutocheck",
	    value: function renderAutocheck() {
	      var _this = this;
	      var buttonNoCheck = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"radio\" name=\"", "_", "_checking\"\n\t\t\t\t\t\t\t\t", ">"])), this.position, this.titleObject.value, !this.isHaveRightAnswerObject.value ? 'checked' : '');
	      main_core.Event.bind(buttonNoCheck, 'change', function () {
	        _this.isHaveRightAnswerObject.value = false;
	        _this.render();
	      });
	      var buttonCheck = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"radio\" name=\"", "_", "_checking\"\n\t\t\t\t\t\t\t\t\t\t", ">"])), this.position, this.titleObject.value, this.isHaveRightAnswerObject.value ? 'checked' : '');
	      main_core.Event.bind(buttonCheck, 'change', function () {
	        _this.isHaveRightAnswerObject.value = true;
	        _this.render();
	      });
	      var wrap = main_core.Tag.render(_templateObject7 || (_templateObject7 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t\t\t<label class=\"form-check-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\u0411\u0435\u0437 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t\t\t<label class=\"form-check-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\u0422\u0435\u0441\u0442\u043E\u0432\u044B\u0439\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>"])), buttonNoCheck, buttonCheck);
	      return wrap;
	    }
	  }, {
	    key: "renderTypes",
	    value: function renderTypes() {
	      var _this2 = this;
	      if (!this.layout.typeSelect) {
	        var wrap = main_core.Tag.render(_templateObject8 || (_templateObject8 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<select class=\"form-select\">\n\t\t\t\t", "\n\t\t\t</select>\n\t\t"])), this.fieldData.map(function (field) {
	          return _this2.renderType(field);
	        }));
	        this.layout.typeSelect = wrap;
	      }
	      return this.layout.typeSelect;
	    }
	  }, {
	    key: "renderType",
	    value: function renderType(field) {
	      var wrap = main_core.Tag.render(_templateObject9 || (_templateObject9 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<option value=\"", "\">", "</option>\n\t\t\t\t\t\t\t\t\t"])), field.ID, main_core.Loc.getMessage(field.TITLE));
	      if (this.fieldId === parseInt(field.ID)) {
	        wrap.setAttribute('selected', '');
	      }
	      return wrap;
	    }
	  }, {
	    key: "renderRequired",
	    value: function renderRequired() {
	      this.layout.checkboxRequired = main_core.Tag.render(_templateObject10 || (_templateObject10 = babelHelpers.taggedTemplateLiteral(["\n\t\t<input class=\"form-check-input\" type=\"checkbox\" name=\"", "_", "_required\"\n\t\t ", ">"])), this.position, this.titleObject.value, this.isRequiredQuestion ? 'checked' : '');
	      main_core.Event.bind(this.layout.checkboxRequired, 'change', this.onChangeRequiredHandler.bind(this));
	      var wrap = main_core.Tag.render(_templateObject11 || (_templateObject11 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"form-check\">\n\t\t\t\t", "\n\t\t\t\t<label class=\"form-check-label\">\n\t\t\t\t\t\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441\n\t\t\t\t</label>\n\t\t\t</div>"])), this.layout.checkboxRequired);
	      return wrap;
	    }
	  }, {
	    key: "onChangeRequiredHandler",
	    value: function onChangeRequiredHandler() {
	      this.isRequiredQuestion = this.layout.checkboxRequired.checked;
	    }
	  }, {
	    key: "renderBody",
	    value: function renderBody() {
	      var _this$layout$body;
	      var wrap = main_core.Tag.render(_templateObject12 || (_templateObject12 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t  </div>"])), this.renderAddOptionButton(), this.renderOptions(), this.renderClearButton());
	      (_this$layout$body = this.layout.body) === null || _this$layout$body === void 0 ? void 0 : _this$layout$body.replaceWith(wrap);
	      this.layout.body = wrap;
	      return this.layout.body;
	    }
	  }, {
	    key: "renderOptions",
	    value: function renderOptions() {
	      var _this$layout$options;
	      var wrap = main_core.Tag.render(_templateObject13 || (_templateObject13 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t", "\n\t\t</div>"])), this.options.map(function (option) {
	        return option === null || option === void 0 ? void 0 : option.render();
	      }));
	      (_this$layout$options = this.layout.options) === null || _this$layout$options === void 0 ? void 0 : _this$layout$options.replaceWith(wrap);
	      this.layout.options = wrap;
	      return this.layout.options;
	    }
	  }, {
	    key: "renderAddOptionButton",
	    value: function renderAddOptionButton() {
	      var wrap = main_core.Tag.render(_templateObject14 || (_templateObject14 = babelHelpers.taggedTemplateLiteral(["<button class=\"btn btn-primary btn-sm\">+</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onAddOptionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onAddOptionButtonClickHandler",
	    value: function onAddOptionButtonClickHandler() {
	      var option = new Option(null, 'Новая опция', this.id, 'radio', this.isHaveRightAnswerObject);
	      this.layout.options.append(option.render());
	      this.options.push(option);
	    }
	  }, {
	    key: "renderClearButton",
	    value: function renderClearButton() {
	      if (!this.isHaveRightAnswerObject.value) {
	        return;
	      }
	      var wrap = main_core.Tag.render(_templateObject15 || (_templateObject15 = babelHelpers.taggedTemplateLiteral(["<button class=\"btn btn-primary btn-sm\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onClearRadioButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onClearRadioButtonClickHandler",
	    value: function onClearRadioButtonClickHandler() {
	      this.options.forEach(function (option) {
	        if (!option) {
	          return;
	        }
	        option.checked = false;
	      });
	      this.render();
	    }
	  }, {
	    key: "getOptionData",
	    value: function getOptionData() {
	      return this.options.map(function (options) {
	        return options === null || options === void 0 ? void 0 : options.getData();
	      });
	    }
	  }, {
	    key: "getSettingData",
	    value: function getSettingData() {
	      return [{
	        'SETTINGS_ID': 1,
	        'VALUE': this.isHaveRightAnswerObject.value
	      }, {
	        'SETTINGS_ID': 2,
	        'VALUE': this.isRequiredQuestion
	      }];
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      if (this.isDeleted) {
	        return null;
	      }
	      var data = {
	        'TITLE': this.layout.title.innerText,
	        'POSITION': this.position,
	        'FIELD_ID': this.fieldId,
	        'ID': this.id,
	        'OPTION': this.getOptionData(),
	        'SETTINGS': this.getSettingData()
	      };
	      return data;
	    }
	  }, {
	    key: "toBoolean",
	    value: function toBoolean(variable) {
	      if (variable === 'true' || variable === true) {
	        return true;
	      } else if (variable === 'false' || variable === false) {
	        return false;
	      }
	      return variable;
	    }
	  }]);
	  return Question;
	}();

	var _templateObject$2, _templateObject2$1;
	var ShortTextOption = /*#__PURE__*/function () {
	  function ShortTextOption(id, title, isHaveRightAnswerObject) {
	    babelHelpers.classCallCheck(this, ShortTextOption);
	    this.id = id;
	    this.field = null;
	    this.title = title;
	    this.isHaveRightAnswerObject = isHaveRightAnswerObject;
	  }
	  babelHelpers.createClass(ShortTextOption, [{
	    key: "render",
	    value: function render() {
	      var _this = this;
	      var wrap;
	      if (!this.isHaveRightAnswerObject.value) {
	        wrap = main_core.Tag.render(_templateObject$2 || (_templateObject$2 = babelHelpers.taggedTemplateLiteral(["<p class=\"text-decoration-underline mb-0\">\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043E\u0442\u0432\u0435\u0442</p>"])));
	      } else {
	        wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-control\" type=\"text\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442\" value=\"", "\">"])), this.title);
	        main_core.Event.bind(wrap, 'change', function () {
	          _this.title = wrap.value;
	        });
	      }
	      this.field = wrap;
	      return this.field;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      if (this.isHaveRightAnswerObject.value) {
	        return {
	          'ID': this.id,
	          'TITLE': this.field.value,
	          'IS_RIGHT_ANSWER': true
	        };
	      }
	      return {
	        'ID': this.id,
	        'TITLE': this.title,
	        'IS_RIGHT_ANSWER': null
	      };
	    }
	  }]);
	  return ShortTextOption;
	}();

	var ShortText = /*#__PURE__*/function (_Question) {
	  babelHelpers.inherits(ShortText, _Question);
	  function ShortText(reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData) {
	    var _this;
	    babelHelpers.classCallCheck(this, ShortText);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(ShortText).call(this, reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData));
	    _this.options = optionData.map(function (option) {
	      if (option) {
	        return new ShortTextOption(option.ID, option.TITLE, _this.isHaveRightAnswerObject);
	      }
	    });
	    _this.fieldId = 1;
	    return _this;
	  }
	  babelHelpers.createClass(ShortText, [{
	    key: "renderAddOptionButton",
	    value: function renderAddOptionButton() {}
	  }, {
	    key: "renderClearButton",
	    value: function renderClearButton() {}
	  }]);
	  return ShortText;
	}(Question);

	var _templateObject$3, _templateObject2$2, _templateObject3$1, _templateObject4$1, _templateObject5$1;
	var Option$1 = /*#__PURE__*/function () {
	  function Option(id, title, questionName, questionId, isRightAnswer, isHaveRightAnswerObject) {
	    babelHelpers.classCallCheck(this, Option);
	    this.id = id;
	    this.questionName = questionName;
	    this.questionId = questionId;
	    this.labelObject = {
	      value: title
	    };
	    this.layout = {};
	    this.isDeleted = false;
	    this.checked = isRightAnswer;
	    this.isHaveRightAnswerObject = isHaveRightAnswerObject;
	  }
	  babelHelpers.createClass(Option, [{
	    key: "render",
	    value: function render() {
	      var _this$layout$wrap;
	      if (this.isDeleted) {
	        return;
	      }
	      var wrap = main_core.Tag.render(_templateObject$3 || (_templateObject$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"form-check\">\n\t\t\t", "\n\t\t\t", "\n\t\t\t", "\n\t\t</div>"])), this.renderEditableLabel(), this.getBindedButton(), this.renderDeleteButton());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderEditableLabel",
	    value: function renderEditableLabel() {
	      var _this$layout$label;
	      if (this.labelObject.value === '') {
	        this.labelObject.value = 'Новая опция';
	      }
	      var wrap = main_core.Tag.render(_templateObject2$2 || (_templateObject2$2 = babelHelpers.taggedTemplateLiteral(["<label class=\"form-check-label\">", "</label>"])), this.labelObject.value);
	      new EditableText(wrap, this.labelObject, this.renderEditableLabel.bind(this));
	      (_this$layout$label = this.layout.label) === null || _this$layout$label === void 0 ? void 0 : _this$layout$label.replaceWith(wrap);
	      this.layout.label = wrap;
	      return this.layout.label;
	    }
	  }, {
	    key: "renderButton",
	    value: function renderButton() {
	      if (!this.isHaveRightAnswerObject.value) {
	        return;
	      }
	      var wrap = main_core.Tag.render(_templateObject3$1 || (_templateObject3$1 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"", "\"\n \t\t\t\t\t\tname=\"", "\" value=\"", " ", "\">"])), null, this.questionName, this.id, this.checked ? 'checked' : '');
	      this.layout.button = wrap;
	      return this.layout.button;
	    }
	  }, {
	    key: "getBindedButton",
	    value: function getBindedButton() {
	      var wrap = this.renderButton();
	      main_core.Event.bind(wrap, 'change', this.onChangeButtonHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onChangeButtonHandler",
	    value: function onChangeButtonHandler() {
	      this.checked = !this.checked;
	    }
	  }, {
	    key: "renderDeleteButton",
	    value: function renderDeleteButton() {
	      if (this.isDeleted) {
	        return main_core.Tag.render(_templateObject4$1 || (_templateObject4$1 = babelHelpers.taggedTemplateLiteral([""])));
	      }
	      var wrap = main_core.Tag.render(_templateObject5$1 || (_templateObject5$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn-close\"></button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onDeleteButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onDeleteButtonClickHandler",
	    value: function onDeleteButtonClickHandler() {
	      this.isDeleted = true;
	      this.layout.wrap.remove();
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      if (this.isDeleted) return null;
	      return {
	        'ID': this.id,
	        'TITLE': this.layout.label.innerText,
	        'IS_RIGHT_ANSWER': this.isHaveRightAnswerObject.value ? this.layout.button.checked : null
	      };
	    }
	  }]);
	  return Option;
	}();

	var _templateObject$4;
	var RadioOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(RadioOption, _Option);
	  function RadioOption() {
	    babelHelpers.classCallCheck(this, RadioOption);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RadioOption).apply(this, arguments));
	  }
	  babelHelpers.createClass(RadioOption, [{
	    key: "renderButton",
	    value: function renderButton() {
	      if (!this.isHaveRightAnswerObject.value) {
	        return;
	      }
	      var wrap = main_core.Tag.render(_templateObject$4 || (_templateObject$4 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"radio\" name=\"", "_", "\" value=\"", "\" ", ">"])), this.questionName, this.questionId, this.id, this.checked ? 'checked' : '');
	      this.layout.button = wrap;
	      return this.layout.button;
	    }
	  }]);
	  return RadioOption;
	}(Option$1);

	var Radio = /*#__PURE__*/function (_Question) {
	  babelHelpers.inherits(Radio, _Question);
	  function Radio(reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData) {
	    var _this;
	    babelHelpers.classCallCheck(this, Radio);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Radio).call(this, reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData));
	    _this.options = optionData.map(function (option) {
	      if (option) {
	        return new RadioOption(option.ID, option.TITLE, _this.titleObject.value, _this.id, _this.toBoolean(option.IS_RIGHT_ANSWER), _this.isHaveRightAnswerObject);
	      }
	    });
	    _this.fieldId = 2;
	    return _this;
	  }
	  babelHelpers.createClass(Radio, [{
	    key: "onAddOptionButtonClickHandler",
	    value: function onAddOptionButtonClickHandler() {
	      this.options = this.options.filter(function (option) {
	        return !option.isDeleted;
	      });
	      if (this.options.length >= 15) {
	        return;
	      }
	      var option = new RadioOption(null, 'Новая опция', this.titleObject.value, this.id, false, this.isHaveRightAnswerObject);
	      this.layout.options.append(option.render());
	      this.options.push(option);
	    }
	  }]);
	  return Radio;
	}(Question);

	var _templateObject$5;
	var CheckboxOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(CheckboxOption, _Option);
	  function CheckboxOption() {
	    babelHelpers.classCallCheck(this, CheckboxOption);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(CheckboxOption).apply(this, arguments));
	  }
	  babelHelpers.createClass(CheckboxOption, [{
	    key: "renderButton",
	    value: function renderButton() {
	      if (!this.isHaveRightAnswerObject.value) {
	        return;
	      }
	      var wrap = main_core.Tag.render(_templateObject$5 || (_templateObject$5 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"checkbox\" name=\"", "_", "\" value=\"", "\" ", ">"])), this.questionName, this.questionId, this.id, this.checked ? 'checked' : '');
	      this.layout.button = wrap;
	      return this.layout.button;
	    }
	  }]);
	  return CheckboxOption;
	}(Option$1);

	var Checkbox = /*#__PURE__*/function (_Question) {
	  babelHelpers.inherits(Checkbox, _Question);
	  function Checkbox(reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData) {
	    var _this;
	    babelHelpers.classCallCheck(this, Checkbox);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Checkbox).call(this, reloadFunction, chapterId, id, position, title, optionData, settingData, fieldData));
	    _this.options = optionData.map(function (option) {
	      if (option) {
	        /*if (option.IS_RIGHT_ANSWER)*/
	        return new CheckboxOption(option.ID, option.TITLE, _this.titleObject.value, _this.id, _this.toBoolean(option.IS_RIGHT_ANSWER), _this.isHaveRightAnswerObject);
	      }
	    });
	    _this.fieldId = 3;
	    return _this;
	  }
	  babelHelpers.createClass(Checkbox, [{
	    key: "onAddOptionButtonClickHandler",
	    value: function onAddOptionButtonClickHandler() {
	      this.options = this.options.filter(function (option) {
	        return !option.isDeleted;
	      });
	      if (this.options.length >= 15) {
	        return;
	      }
	      var option = new CheckboxOption(null, 'Новая опция', this.titleObject.value, this.id, false, this.isHaveRightAnswerObject);
	      this.layout.options.append(option.render());
	      this.options.push(option);
	    }
	  }]);
	  return Checkbox;
	}(Question);

	var questionFactory = /*#__PURE__*/function () {
	  function questionFactory() {
	    babelHelpers.classCallCheck(this, questionFactory);
	  }
	  babelHelpers.createClass(questionFactory, null, [{
	    key: "createQuestion",
	    value: function createQuestion(deleteFunction, fieldId, chapterId, id, position, title, options, settings, fieldData) {
	      fieldId = Number(fieldId);
	      switch (fieldId) {
	        case 1:
	          return new ShortText(deleteFunction, chapterId, id, position, title, options, settings, fieldData);
	        case 2:
	          return new Radio(deleteFunction, chapterId, id, position, title, options, settings, fieldData);
	        case 3:
	          return new Checkbox(deleteFunction, chapterId, id, position, title, options, settings, fieldData);
	        default:
	          throw new Error("Invalid FieldType");
	      }
	    }
	  }]);
	  return questionFactory;
	}();

	var _templateObject$6, _templateObject2$3, _templateObject3$2, _templateObject4$2, _templateObject5$2, _templateObject6$1, _templateObject7$1, _templateObject8$1;
	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var Constructor = /*#__PURE__*/function () {
	  function Constructor(formData, fieldData, saveFormFunction) {
	    babelHelpers.classCallCheck(this, Constructor);
	    this.layout = {};
	    this.titleObject = {
	      value: ''
	    };
	    this.fieldData = fieldData;
	    this.questions = [];
	    this.formData = formData;
	    this.fieldData = fieldData;
	    this.id = formData.ID;
	    this.chapterId = formData.CHAPTER[0].ID;
	    this.saveForm = saveFormFunction;
	    this.questionNumber = 0;
	    this.isLastPage = true;
	    this.limit = 10;
	    this.currentPage = 1;
	    this.loading = new bootstrap.Modal(this.renderLoading(), {
	      backdrop: 'static',
	      keyboard: false
	    });
	    this.titleObject.value = this.formData.TITLE;
	    this.fillQuestionsByData(formData.CHAPTER[0].QUESTION);
	  }
	  babelHelpers.createClass(Constructor, [{
	    key: "render",
	    value: function render() {
	      var _this$layout$wrap;
	      var wrap = main_core.Tag.render(_templateObject$6 || (_templateObject$6 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t\t<div class=\"container d-flex justify-content-center\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n\t\t\t\t", "\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">\u0422\u0442</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">P</button>\n\t\t\t</div>\n\t\t\t", "\n\t\t\t", "\n\t\t</div>\n"])), this.renderEditableTitle(), this.renderAddQuestionButton(), this.renderQuestionList(), this.renderPagination());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      var _this = this,
	        _this$layout$question;
	      var wrap = main_core.Tag.render(_templateObject2$3 || (_templateObject2$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.questions.map(function (question, index) {
	        var questionWrap = question.render();
	        var typeSelect = question.layout.typeSelect;
	        main_core.Event.bind(typeSelect, 'change', function () {
	          return _this.changeQuestionType(index, parseInt(typeSelect.value));
	        });
	        return questionWrap;
	      }));
	      (_this$layout$question = this.layout.questionList) === null || _this$layout$question === void 0 ? void 0 : _this$layout$question.replaceWith(wrap);
	      this.layout.questionList = wrap;
	      return this.layout.questionList;
	    }
	  }, {
	    key: "changeQuestionType",
	    value: function changeQuestionType(index, fieldId) {
	      var _this2 = this;
	      var question = this.questions[index];
	      var options;
	      if (fieldId === 1) {
	        options = [{
	          'ID': null,
	          'TITLE': ''
	        }];
	      } else if (question.fieldId === 1) {
	        options = [{
	          'ID': null,
	          'TITLE': 'Новая опция'
	        }];
	      } else {
	        options = question.getOptionData();
	      }
	      var oldWrap = this.questions[index].layout.wrap;
	      var typeChangedQuestion = questionFactory.createQuestion(this.reloadAfterDelete.bind(this), fieldId, question.chapterId, question.id, question.position, question.titleObject.value, options, question.getSettingData(), this.fieldData);
	      this.questions[index] = typeChangedQuestion;
	      console.log(typeChangedQuestion);
	      var newWrap = typeChangedQuestion.render();
	      var typeSelect = typeChangedQuestion.layout.typeSelect;
	      main_core.Event.bind(typeSelect, 'change', function () {
	        return _this2.changeQuestionType(index, parseInt(typeSelect.value));
	      });
	      oldWrap.replaceWith(newWrap);
	    }
	  }, {
	    key: "renderAddQuestionButton",
	    value: function renderAddQuestionButton() {
	      var wrap = main_core.Tag.render(_templateObject3$2 || (_templateObject3$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">+</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onAddQuestionButtonClickHandler.bind(this));
	      this.layout.addQuestionButtonObject = {
	        wrap: wrap,
	        isActive: this.questions.length < 10
	      };
	      return this.layout.addQuestionButtonObject.wrap;
	    }
	  }, {
	    key: "onAddQuestionButtonClickHandler",
	    value: function onAddQuestionButtonClickHandler() {
	      if (this.questions.length >= 10) {
	        this.renderPagination();
	        return;
	      }
	      this.questions.push(questionFactory.createQuestion(this.reloadAfterDelete.bind(this), 1, this.chapterId, null, ++this.questionNumber, 'Название', [{
	        'ID': null,
	        'TITLE': ''
	      }], [{
	        'SETTINGS_ID': 1,
	        'VALUE': false
	      }, {
	        'SETTINGS_ID': 2,
	        'VALUE': false
	      }], this.fieldData));
	      this.renderQuestionList();
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      var hardCodeChapter = this.formData.CHAPTER[0];
	      hardCodeChapter.ID = this.chapterId;
	      hardCodeChapter.QUESTION = this.questions.map(function (question) {
	        return question.getData();
	      });
	      var form = {
	        'TITLE': this.layout.title.innerText,
	        'CREATOR_ID': 1,
	        'CHAPTER': [hardCodeChapter]
	      };
	      return form;
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var _this$layout$title;
	      if (this.titleObject.value === '') {
	        this.titleObject.value = 'Новая форма';
	      }
	      var wrap = main_core.Tag.render(_templateObject4$2 || (_templateObject4$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<h1 class=\"text-center mt-5 mb-4\">", "</h1>\n\t\t"])), this.titleObject.value);
	      new EditableText(wrap, this.titleObject, this.renderEditableTitle.bind(this));
	      (_this$layout$title = this.layout.title) === null || _this$layout$title === void 0 ? void 0 : _this$layout$title.replaceWith(wrap);
	      this.layout.title = wrap;
	      return this.layout.title;
	    }
	  }, {
	    key: "renderPagination",
	    value: function renderPagination() {
	      var _this$layout$paginati;
	      var wrap = main_core.Tag.render(_templateObject5$2 || (_templateObject5$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<nav aria-label=\"Page navigation example\">\n\t\t\t\t\t<ul class=\"pagination\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t\t", "\n\t\t\t\t\t</ul>\n\t\t\t\t</nav>\n\t\t\t"])), this.renderPreviousPageButton(), this.renderNextPageButton());
	      (_this$layout$paginati = this.layout.pagination) === null || _this$layout$paginati === void 0 ? void 0 : _this$layout$paginati.replaceWith(wrap);
	      this.layout.pagination = wrap;
	      return this.layout.pagination;
	    }
	  }, {
	    key: "renderNextPageButton",
	    value: function renderNextPageButton() {
	      if (this.questions.length === this.limit) {
	        var wrap = main_core.Tag.render(_templateObject6$1 || (_templateObject6$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"page-item\">\n\t\t\t\t\t\n\t\t\t\t\t\t<button aria-hidden=\"true\">&raquo;</button>\n\t\t\t\t\t\n\t\t\t\t</li>\n\t\t\t\t"])));
	        main_core.Event.bind(wrap, 'click', this.onNextPageButtonClickHandler.bind(this));
	        return wrap;
	      }
	    }
	  }, {
	    key: "renderPreviousPageButton",
	    value: function renderPreviousPageButton() {
	      if (this.currentPage > 1) {
	        var wrap = main_core.Tag.render(_templateObject7$1 || (_templateObject7$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"page-item\">\n\t\t\t\t\t\n\t\t\t\t\t\t<button aria-hidden=\"true\">&laquo;</button>\n\t\t\t\t\t\n\t\t\t\t</li>\n\t\t\t\t"])));
	        main_core.Event.bind(wrap, 'click', this.onPreviousPageButtonClickHandler.bind(this));
	        return wrap;
	      }
	    }
	  }, {
	    key: "onNextPageButtonClickHandler",
	    value: function () {
	      var _onNextPageButtonClickHandler = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        var isSuccess;
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              this.loading.show();
	              this.layout.wrap.append(this.renderLoading());
	              _context.next = 4;
	              return this.saveForm();
	            case 4:
	              isSuccess = _context.sent;
	              if (isSuccess) {
	                this.currentPage += 1;
	                this.reload();
	              } else {
	                this.loading.hide();
	              }
	            case 6:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this);
	      }));
	      function onNextPageButtonClickHandler() {
	        return _onNextPageButtonClickHandler.apply(this, arguments);
	      }
	      return onNextPageButtonClickHandler;
	    }()
	  }, {
	    key: "onPreviousPageButtonClickHandler",
	    value: function () {
	      var _onPreviousPageButtonClickHandler = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
	        var isSuccess;
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              this.loading.show();
	              this.layout.wrap.append(this.renderLoading());
	              _context2.next = 4;
	              return this.saveForm();
	            case 4:
	              isSuccess = _context2.sent;
	              if (isSuccess) {
	                this.currentPage -= 1;
	                this.reload();
	              }
	              this.loading.hide();
	            case 7:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, this);
	      }));
	      function onPreviousPageButtonClickHandler() {
	        return _onPreviousPageButtonClickHandler.apply(this, arguments);
	      }
	      return onPreviousPageButtonClickHandler;
	    }()
	  }, {
	    key: "reload",
	    value: function reload() {
	      var _this3 = this;
	      console.log(this.id, this.limit, this.limit * (this.currentPage - 1));
	      this.loadPage(this.chapterId, this.limit, this.limit * (this.currentPage - 1)).then(function () {
	        _this3.renderQuestionList();
	        _this3.renderPagination();
	        _this3.loading.hide();
	      });
	    }
	  }, {
	    key: "reloadAfterDelete",
	    value: function reloadAfterDelete() {
	      var _this4 = this;
	      this.questions = this.questions.filter(function (question) {
	        return !question.isDeleted;
	      });
	      if (this.id && !this.isLastPage) {
	        this.loading.show();
	        this.saveForm().then(function () {
	          _this4.reload();
	        });
	      } else {
	        this.renderQuestionList();
	      }
	    }
	  }, {
	    key: "loadPage",
	    value: function () {
	      var _loadPage = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
	        var limit,
	          offset,
	          questionData,
	          _args3 = arguments;
	        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
	          while (1) switch (_context3.prev = _context3.next) {
	            case 0:
	              limit = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 0;
	              offset = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 0;
	              _context3.next = 4;
	              return FormManager.getQuestionData(id, limit + 1, offset);
	            case 4:
	              questionData = _context3.sent;
	              console.log(questionData);
	              this.fillQuestionsByData(questionData);
	            case 7:
	            case "end":
	              return _context3.stop();
	          }
	        }, _callee3, this);
	      }));
	      function loadPage(_x) {
	        return _loadPage.apply(this, arguments);
	      }
	      return loadPage;
	    }()
	  }, {
	    key: "fillQuestionsByData",
	    value: function fillQuestionsByData(data) {
	      var _this5 = this;
	      this.questions = [];
	      data.map(function (questionData) {
	        var question = questionFactory.createQuestion(_this5.reloadAfterDelete.bind(_this5), questionData.FIELD_ID, questionData.CHAPTER_ID, questionData.ID, ++_this5.questionNumber, questionData.TITLE, questionData.OPTION, questionData.SETTINGS, _this5.fieldData);
	        _this5.questions.push(question);
	      });
	      this.isLastPage = this.questions.length <= this.limit;
	      if (!this.isLastPage) {
	        this.questions.pop();
	      }
	    }
	  }, {
	    key: "renderLoading",
	    value: function renderLoading() {
	      var wrap = main_core.Tag.render(_templateObject8$1 || (_templateObject8$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t <div class=\"modal\" id=\"loadingModal\">\n\t\t\t<div class=\"modal-dialog modal-dialog-centered\">\n\t\t\t\t  <div class=\"spinner-border text-center\" role=\"status\">\n\t\t\t\t\t<span class=\"visually-hidden\">Loading...</span>\n\t\t\t\t  </div>\n\t\t\t</div>\n\t\t  </div>\n\t\t"])));
	      return wrap;
	    }
	  }]);
	  return Constructor;
	}();

	var _templateObject$7;
	var Setting = /*#__PURE__*/function () {
	  function Setting(id, title) {
	    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    babelHelpers.classCallCheck(this, Setting);
	    this.title = title;
	    this.value = value;
	    this.id = id;
	    this.input = null;
	  }
	  babelHelpers.createClass(Setting, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$7 || (_templateObject$7 = babelHelpers.taggedTemplateLiteral(["<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t\t<label class=\"form-label\">", "</label>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</div>"])), this.title, this.renderBindedInput());
	      return wrap;
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      throw 'Error';
	    }
	  }, {
	    key: "renderBindedInput",
	    value: function renderBindedInput() {
	      var _this = this;
	      var wrap = this.renderInput();
	      main_core.Event.bind(wrap, 'change', function () {
	        return _this.onChangeInputHandler(wrap);
	      });
	      return wrap;
	    }
	  }, {
	    key: "onChangeInputHandler",
	    value: function onChangeInputHandler(input) {
	      this.value = input.value;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.value === '' ? null : this.value;
	    }
	  }, {
	    key: "getId",
	    value: function getId() {
	      return this.id;
	    }
	  }]);
	  return Setting;
	}();

	var _templateObject$8;
	var Datetime = /*#__PURE__*/function (_Setting) {
	  babelHelpers.inherits(Datetime, _Setting);
	  function Datetime() {
	    babelHelpers.classCallCheck(this, Datetime);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Datetime).apply(this, arguments));
	  }
	  babelHelpers.createClass(Datetime, [{
	    key: "renderInput",
	    value: function renderInput() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject$8 || (_templateObject$8 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input type=\"datetime-local\" class=\"form-control w-25\" value=\"", "\">\n\t\t"])), this.value != null ? this.value : '');
	      main_core.Event.bind(wrap, 'change', function () {
	        return _this.onChangeInputHandler(wrap);
	      });
	      this.input = wrap;
	      return this.input;
	    }
	  }, {
	    key: "getType",
	    value: function getType() {
	      return 'datetime-local';
	    }
	  }]);
	  return Datetime;
	}(Setting);

	var _templateObject$9;
	var Time = /*#__PURE__*/function (_Setting) {
	  babelHelpers.inherits(Time, _Setting);
	  function Time() {
	    babelHelpers.classCallCheck(this, Time);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Time).apply(this, arguments));
	  }
	  babelHelpers.createClass(Time, [{
	    key: "renderInput",
	    value: function renderInput() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject$9 || (_templateObject$9 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input type=\"time\" class=\"form-control w-25\" value=\"", "\">\n\t\t"])), this.value != null ? this.value : '');
	      main_core.Event.bind(wrap, 'change', function () {
	        return _this.onChangeInputHandler(wrap);
	      });
	      this.input = wrap;
	      return this.input;
	    }
	  }, {
	    key: "getType",
	    value: function getType() {
	      return 'time';
	    }
	  }]);
	  return Time;
	}(Setting);

	var _templateObject$a;
	var Number$1 = /*#__PURE__*/function (_Setting) {
	  babelHelpers.inherits(Number, _Setting);
	  function Number() {
	    babelHelpers.classCallCheck(this, Number);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Number).apply(this, arguments));
	  }
	  babelHelpers.createClass(Number, [{
	    key: "renderInput",
	    value: function renderInput() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject$a || (_templateObject$a = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input type=\"number\" class=\"form-control w-25\" min=\"1\" value=\"", "\">\n\t\t"])), this.value != null ? this.value : '');
	      main_core.Event.bind(wrap, 'change', function () {
	        return _this.onChangeInputHandler(wrap);
	      });
	      this.input = wrap;
	      return this.input;
	    }
	  }, {
	    key: "getType",
	    value: function getType() {
	      return 'number';
	    }
	  }]);
	  return Number;
	}(Setting);

	var _templateObject$b;
	var Checkbox$1 = /*#__PURE__*/function (_Setting) {
	  babelHelpers.inherits(Checkbox, _Setting);
	  function Checkbox() {
	    babelHelpers.classCallCheck(this, Checkbox);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Checkbox).apply(this, arguments));
	  }
	  babelHelpers.createClass(Checkbox, [{
	    key: "renderInput",
	    value: function renderInput() {
	      var checked = this.value === 'true' || this.value === true ? 'checked' : '';
	      var wrap = main_core.Tag.render(_templateObject$b || (_templateObject$b = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" ", ">\n\t\t"])), checked);
	      this.input = wrap;
	      return this.input;
	    }
	  }, {
	    key: "onChangeInputHandler",
	    value: function onChangeInputHandler(input) {
	      this.value = input.checked;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.input.checked;
	    }
	  }, {
	    key: "getType",
	    value: function getType() {
	      return 'checkbox';
	    }
	  }]);
	  return Checkbox;
	}(Setting);

	var _templateObject$c, _templateObject2$4;
	var Settings = /*#__PURE__*/function () {
	  function Settings(formSetting, allSettings) {
	    var _this = this;
	    babelHelpers.classCallCheck(this, Settings);
	    this.layout = {};
	    this.settings = [];
	    this.allSettings = allSettings;
	    this.allSettings.map(function (settingData) {
	      var _formSetting$find;
	      var setting;
	      var settingValue = (_formSetting$find = formSetting.find(function (item) {
	        return item.SETTINGS_ID === parseInt(settingData.ID);
	      })) === null || _formSetting$find === void 0 ? void 0 : _formSetting$find.VALUE;
	      if (parseInt(settingData.TYPE_ID) === 1) {
	        setting = new Datetime(settingData.ID, settingData.TITLE, settingValue);
	      } else if (parseInt(settingData.TYPE_ID) === 2) {
	        setting = new Time(settingData.ID, settingData.TITLE, settingValue);
	      } else if (parseInt(settingData.TYPE_ID) === 3) {
	        setting = new Checkbox$1(settingData.ID, settingData.TITLE, settingValue);
	      } else if (parseInt(settingData.TYPE_ID) === 4) {
	        setting = new Number$1(settingData.ID, settingData.TITLE, settingValue);
	      }
	      _this.settings.push(setting);
	    });
	    this.render();
	  }
	  babelHelpers.createClass(Settings, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$c || (_templateObject$c = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container pt-3\">\n\t\t\t", "\n\t\t</div>"])), this.renderSettingList());
	      return wrap;
	    }
	  }, {
	    key: "renderSettingList",
	    value: function renderSettingList() {
	      var wrap = main_core.Tag.render(_templateObject2$4 || (_templateObject2$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div>\n\t\t\t", "\n\t\t</div>"])), this.settings.map(function (setting) {
	        return setting.render();
	      }));
	      return wrap;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      var data = this.settings.map(function (setting) {
	        return {
	          'ID': setting.getId(),
	          'VALUE': setting.getData()
	        };
	      });
	      return data;
	    }
	  }]);
	  return Settings;
	}();

	var _templateObject$d, _templateObject2$5, _templateObject3$3, _templateObject4$3, _templateObject5$3, _templateObject6$2, _templateObject7$2, _templateObject8$2, _templateObject9$1;
	function _regeneratorRuntime$1() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime$1 = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var FormConstructor = /*#__PURE__*/function () {
	  function FormConstructor() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, FormConstructor);
	    this.layout = {};
	    this.layout.wrap = options.container;
	    this.layout.error = null;
	    this.id = options.id;
	    if (!this.layout.wrap) {
	      throw new Error("TaskList: container is not found");
	    }
	    this.formData = {
	      CHAPTER: []
	    };
	    this.isLoading = true;
	    this.layout.wrap.append(this.render());
	    this.loadFormData();
	  }
	  babelHelpers.createClass(FormConstructor, [{
	    key: "render",
	    value: function render() {
	      var _this$layout$form;
	      var wrap;
	      if (this.isLoading) {
	        wrap = main_core.Tag.render(_templateObject$d || (_templateObject$d = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n\t\t\t\t\t<span class=\"sr-only\"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t"])));
	      } else {
	        this.construct = new Constructor(this.formData, this.fieldData, this.saveForm.bind(this));
	        this.settings = new Settings(this.formData.SETTINGS, this.allSettingsData);
	        this.layout.header = this.renderHeader();
	        this.layout.main = this.construct.render();
	        this.layout.footer = this.renderFooter();
	        wrap = main_core.Tag.render(_templateObject2$5 || (_templateObject2$5 = babelHelpers.taggedTemplateLiteral(["<div></div>"])));
	        wrap.append(this.layout.header);
	        wrap.append(this.layout.main);
	        wrap.append(this.layout.footer);
	      }
	      (_this$layout$form = this.layout.form) === null || _this$layout$form === void 0 ? void 0 : _this$layout$form.replaceWith(wrap);
	      this.layout.form = wrap;
	      return wrap;
	    }
	  }, {
	    key: "loadFormData",
	    value: function () {
	      var _loadFormData = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee() {
	        return _regeneratorRuntime$1().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return FormManager.getFieldData();
	            case 2:
	              this.fieldData = _context.sent;
	              _context.next = 5;
	              return FormManager.getSettingsData();
	            case 5:
	              this.allSettingsData = _context.sent;
	              if (!(this.id !== 0)) {
	                _context.next = 13;
	                break;
	              }
	              _context.next = 9;
	              return FormManager.getFormData(this.id, 10);
	            case 9:
	              this.formData = _context.sent;
	              console.log(this.formData);
	              _context.next = 17;
	              break;
	            case 13:
	              this.formData.TITLE = 'Новая форма';
	              this.formData.ID = null;
	              this.formData.CHAPTER[0] = {
	                'TITLE': 'Заголовок раздела',
	                'DESCRIPTION': 'Описание раздела',
	                'POSITION': 1,
	                'QUESTION': [],
	                'ID': null
	              };
	              this.formData.SETTINGS = [{
	                SETTINGS_ID: 6,
	                VALUE: 'true'
	              }];
	            case 17:
	              this.isLoading = false;
	              this.render();
	            case 19:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this);
	      }));
	      function loadFormData() {
	        return _loadFormData.apply(this, arguments);
	      }
	      return loadFormData;
	    }()
	  }, {
	    key: "renderHeader",
	    value: function renderHeader() {
	      var wrap = main_core.Tag.render(_templateObject3$3 || (_templateObject3$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t<ul class=\"nav nav-tabs justify-content-center\" id=\"myTab\" role=\"tablist\">\n\t\t\t<li class=\"nav-item\">\n\t\t\t\t", "\n\t\t\t</li>\n\t\t\t<li class=\"nav-item\">\n\t\t\t\t", "\n\t\t\t</li>\n\t\t</ul>"])), this.renderConstructorTab(), this.renderSettingTab());
	      return wrap;
	    }
	  }, {
	    key: "renderConstructorTab",
	    value: function renderConstructorTab() {
	      var wrap = main_core.Tag.render(_templateObject4$3 || (_templateObject4$3 = babelHelpers.taggedTemplateLiteral(["<button class=\"nav-link active\" data-toggle=\"tab\" role=\"tab\">\u0412\u043E\u043F\u0440\u043E\u0441\u044B</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onConstructorTabClickHandler.bind(this));
	      this.layout.constructorTab = wrap;
	      return this.layout.constructorTab;
	    }
	  }, {
	    key: "onConstructorTabClickHandler",
	    value: function onConstructorTabClickHandler() {
	      var _this$layout$main;
	      this.layout.constructorTab.classList.add('active');
	      this.layout.settingTab.classList.remove('active');
	      var wrap = this.construct.render();
	      (_this$layout$main = this.layout.main) === null || _this$layout$main === void 0 ? void 0 : _this$layout$main.replaceWith(wrap);
	      this.layout.main = wrap;
	    }
	  }, {
	    key: "renderSettingTab",
	    value: function renderSettingTab() {
	      var wrap = main_core.Tag.render(_templateObject5$3 || (_templateObject5$3 = babelHelpers.taggedTemplateLiteral(["<button class=\"nav-link\" data-toggle=\"tab\" role=\"tab\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onSettingTabClickHandler.bind(this));
	      this.layout.settingTab = wrap;
	      return this.layout.settingTab;
	    }
	  }, {
	    key: "onSettingTabClickHandler",
	    value: function onSettingTabClickHandler() {
	      var _this$layout$main2;
	      this.layout.settingTab.classList.add('active');
	      this.layout.constructorTab.classList.remove('active');
	      var wrap = this.settings.render();
	      (_this$layout$main2 = this.layout.main) === null || _this$layout$main2 === void 0 ? void 0 : _this$layout$main2.replaceWith(wrap);
	      this.layout.main = wrap;
	    }
	  }, {
	    key: "renderFooter",
	    value: function renderFooter() {
	      var wrap = main_core.Tag.render(_templateObject6$2 || (_templateObject6$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"d-flex justify-content-center\">", "</div>\n\t\t"])), this.renderSaveButton());
	      return wrap;
	    }
	  }, {
	    key: "renderSaveButton",
	    value: function renderSaveButton() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject7$2 || (_templateObject7$2 = babelHelpers.taggedTemplateLiteral(["<button class=\"btn btn-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>"])));
	      this.layout.saveButtonObject = {
	        isActive: true,
	        wrap: wrap
	      };
	      main_core.Event.bind(wrap, 'click', function () {
	        return _this.onSaveButtonClickHandler(_this.layout.saveButtonObject);
	      });
	      return this.layout.saveButtonObject.wrap;
	    }
	  }, {
	    key: "onSaveButtonClickHandler",
	    value: function onSaveButtonClickHandler(button) {
	      var _this2 = this;
	      if (!button.isActive) {
	        return;
	      }
	      button.wrap.classList.add('disabled');
	      button.isActive = false;
	      var formData = this.prepareData();
	      this.renderErrors([]);
	      FormManager.saveFormData({
	        formData: formData
	      }).then(function (response) {
	        console.log(response);
	        var url = BX.SidePanel.Instance.getCurrentUrl();
	        BX.SidePanel.Instance.close();
	        setTimeout(function () {
	          return BX.SidePanel.Instance.destroy(url);
	        }, 1000);
	      })["catch"](function (errors) {
	        _this2.displayErrors(errors);
	      });
	    }
	  }, {
	    key: "saveForm",
	    value: function () {
	      var _saveForm = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime$1().mark(function _callee2() {
	        var _this3 = this;
	        var formData, result, id, chapterId, newUrl;
	        return _regeneratorRuntime$1().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              formData = this.prepareData();
	              this.renderErrors([]);
	              _context2.next = 4;
	              return FormManager.saveFormData({
	                formData: formData
	              })["catch"](function (errors) {
	                _this3.displayErrors(errors);
	              });
	            case 4:
	              result = _context2.sent;
	              if (result) {
	                _context2.next = 7;
	                break;
	              }
	              return _context2.abrupt("return", false);
	            case 7:
	              id = parseInt(result.id);
	              chapterId = parseInt(result.chapterId);
	              if (id !== this.id) {
	                this.id = id;
	                this.construct.id = id;
	                this.construct.chapterId = chapterId;
	                newUrl = '/form/edit/'.concat(this.id, '/');
	                window.history.pushState({
	                  path: newUrl
	                }, 'Формы', newUrl);
	                BX.SidePanel.Instance.pageUrl = window.history.url;
	                console.log(BX.SidePanel.Instance.getCurrentUrl());
	                console.log(history);
	              }
	              return _context2.abrupt("return", true);
	            case 11:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, this);
	      }));
	      function saveForm() {
	        return _saveForm.apply(this, arguments);
	      }
	      return saveForm;
	    }()
	  }, {
	    key: "prepareData",
	    value: function prepareData() {
	      var settings = this.settings.getData();
	      var form = this.construct.getData();
	      form.IS_FIRST_PAGE = this.construct.currentPage === 1;
	      if (this.id) {
	        form.ID = this.id;
	      }
	      form.SETTINGS = settings;
	      return form;
	    }
	  }, {
	    key: "displayErrors",
	    value: function displayErrors(errors) {
	      this.layout.wrap.prepend(this.renderErrors(errors));
	      this.layout.saveButtonObject.wrap.classList.remove('disabled');
	      this.layout.saveButtonObject.isActive = true;
	      console.log(errors);
	    }
	  }, {
	    key: "renderErrors",
	    value: function renderErrors(errors) {
	      var _this4 = this,
	        _this$layout$error;
	      var wrap = main_core.Tag.render(_templateObject8$2 || (_templateObject8$2 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</div>"])), errors.map(function (error) {
	        return _this4.renderError(error.message);
	      }));
	      (_this$layout$error = this.layout.error) === null || _this$layout$error === void 0 ? void 0 : _this$layout$error.replaceWith(wrap);
	      this.layout.error = wrap;
	      return this.layout.error;
	    }
	  }, {
	    key: "renderError",
	    value: function renderError(message) {
	      var wrap = main_core.Tag.render(_templateObject9$1 || (_templateObject9$1 = babelHelpers.taggedTemplateLiteral(["<div class=\"alert alert-danger\" role=\"alert\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</div>"])), message);
	      return wrap;
	    }
	  }]);
	  return FormConstructor;
	}();

	exports.FormConstructor = FormConstructor;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
