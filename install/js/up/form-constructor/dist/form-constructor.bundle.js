/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject;
	var EditableText = /*#__PURE__*/function () {
	  function EditableText(element) {
	    babelHelpers.classCallCheck(this, EditableText);
	    this.element = element;
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
	      main_core.Event.bind(wrap, 'keypress', function (event) {
	        if (event.key === 'Enter') {
	          _this.onEditableTextEndChangeHandler.bind(_this);
	        }
	      });
	      main_core.Event.bind(wrap, 'blur', this.onEditableTextEndChangeHandler.bind(this));
	      this.input = wrap;
	      this.element.replaceWith(this.input);
	      this.input.focus();
	    }
	  }, {
	    key: "onEditableTextEndChangeHandler",
	    value: function onEditableTextEndChangeHandler() {
	      this.element.innerText = this.input.value;
	      this.input.replaceWith(this.element);
	    }
	  }]);
	  return EditableText;
	}();

	var _templateObject$1, _templateObject2, _templateObject3, _templateObject4;
	var Question = /*#__PURE__*/function () {
	  function Question(questionData) {
	    babelHelpers.classCallCheck(this, Question);
	    this.layout = null;
	    this.title = null;
	    this.questionData = questionData;
	    this.isDeleted = false;
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      if (this.isDeleted) {
	        return main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral([""])));
	      }
	      var wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container mb-3\">\n\t\t\t", "\n\t\t\t<div class=\"container d-flex justify-content-center align-items-center ps-0\">\n\t\t\t\t<input class=\"form-control me-2\" type=\"text\">\n\t\t\t\t ", "\n\t\t\t</div>\n\t\t</div>\n\t\t"])), this.renderEditableTitle(), this.renderAddQuestionButton());
	      this.layout = wrap;
	      return this.layout;
	    }
	  }, {
	    key: "renderAddQuestionButton",
	    value: function renderAddQuestionButton() {
	      var wrap = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn btn-danger\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onRemoveQuestionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onRemoveQuestionButtonClickHandler",
	    value: function onRemoveQuestionButtonClickHandler() {
	      this.isDeleted = true;
	      this.layout.remove();
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var wrap = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<label class=\"form-label\">", "</label>\n\t\t"])), this.questionData.title);
	      new EditableText(wrap);
	      this.title = wrap;
	      return this.title;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return {
	        'title': this.title.innerText,
	        'description': this.questionData.description,
	        'position': this.questionData.position,
	        'type': this.questionData.type
	      };
	    }
	  }]);
	  return Question;
	}();

	var _templateObject$2, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5;
	var FormConstructor = /*#__PURE__*/function () {
	  function FormConstructor() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, FormConstructor);
	    this.layout = {};
	    this.layout.wrap = options.container;
	    this.formData = {
	      'title': 'Название формы',
	      'chapters': [{
	        'title': 'Название раздела',
	        'description': 'Описание раздела',
	        'questions': [{
	          'title': 'Название 1',
	          'description': 'Описание 1',
	          'position': 1,
	          'type': 1
	        }, {
	          'title': 'Название 2',
	          'description': 'Описание 2',
	          'position': 2,
	          'type': 1
	        }, {
	          'title': 'Название 3',
	          'description': 'Описание 3',
	          'position': 3,
	          'type': 1
	        }]
	      }]
	    };
	    this.questions = [];
	    if (!this.layout.wrap) {
	      throw new Error("TaskList: container is not found");
	    }
	    this.layout.wrap.append(this.render());
	  }
	  babelHelpers.createClass(FormConstructor, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$2 || (_templateObject$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t\t<div class=\"container d-flex justify-content-center\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n\t\t\t\t", "\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">\u0422\u0442</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">P</button>\n\t\t\t</div>\n\t\t\t", "\n\t\t\t<div class=\"d-flex justify-content-center\">\n\t\t\t\t", "\n\t\t \t</div>\n\t\t</div>\n"])), this.renderEditableTitle(), this.renderAddQuestionButton(), this.renderQuestionList(), this.renderSaveFormButton());
	      return wrap;
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      var _this = this,
	        _this$layout$question;
	      console.log(this.formData);
	      var wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.formData.chapters[0].questions.map(function (questionData) {
	        var question = null;
	        if (questionData.type === 1) {
	          question = new Question(questionData);
	        }
	        _this.questions.push(question);
	        return question.render();
	      }));
	      (_this$layout$question = this.layout.questionList) === null || _this$layout$question === void 0 ? void 0 : _this$layout$question.replaceWith(wrap);
	      this.layout.questionList = wrap;
	      return this.layout.questionList;
	    }
	  }, {
	    key: "renderAddQuestionButton",
	    value: function renderAddQuestionButton() {
	      var wrap = main_core.Tag.render(_templateObject3$1 || (_templateObject3$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">+</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onAddQuestionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onAddQuestionButtonClickHandler",
	    value: function onAddQuestionButtonClickHandler() {
	      this.questions.push({
	        'title': 'Новое название'
	      });
	      this.renderQuestionList();
	    }
	  }, {
	    key: "renderSaveFormButton",
	    value: function renderSaveFormButton() {
	      var wrap = main_core.Tag.render(_templateObject4$1 || (_templateObject4$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onSaveFormButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onSaveFormButtonClickHandler",
	    value: function onSaveFormButtonClickHandler() {
	      var hardCodeChapter = {
	        'title': 'Заголовок раздела',
	        'description': 'Описание раздела',
	        'position': 1,
	        'questions': this.questions.map(function (question) {
	          if (!question.isDeleted) {
	            return question.getData();
	          }
	        })
	      };
	      var hardCodeForm = {
	        'title': this.title.innerText,
	        'chapters': [hardCodeChapter]
	      };
	      console.log(hardCodeForm);
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var wrap = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t<h1 class=\"text-center mt-5 mb-4\">", "</h1>\n\t\t"])), this.formData.title);
	      new EditableText(wrap);
	      this.title = wrap;
	      return this.title;
	    }
	  }]);
	  return FormConstructor;
	}();

	exports.FormConstructor = FormConstructor;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
