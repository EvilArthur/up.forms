/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
	var Question = /*#__PURE__*/function () {
	  function Question(questionData, questionNumber) {
	    var questions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	    babelHelpers.classCallCheck(this, Question);
	    this.layout = null;
	    this.questionData = questionData;
	    this.questionNumber = questionNumber;
	    this.questions = questions;
	    this.title = null;
	    this.id = questionNumber - 1;
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      if (this.questions[this.id] === null) {
	        return main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral([""])));
	      }
	      var wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"mb-3\">\n\t\t\t", "\n\t\t\t<div class=\"container d-flex justify-content-center align-items-center\">\n\t\t\t\t<input class=\"form-control me-2\" id=\"question-", "\" type=\"text\"\n\t\t\t\t placeholder=\"\u041E\u0442\u0432\u0435\u0442 ", "\" name=\"answer-", "\">\n\t\t\t\t ", "\n\t\t\t</div>\n\t\t</div>\n\t\t"])), this.renderEditableTitle(), this.questionNumber, this.questionNumber, this.questionNumber, this.renderAddQuestionButton());
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
	      this.questions[this.id] = null;
	      this.layout.remove();
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var _this$title;
	      var wrap = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<label for=\"question-", "\" class=\"form-label\">", "</label>\n\t\t"])), this.questionNumber, this.questionData.title);
	      main_core.Event.bind(wrap, 'click', this.onEditableTitleClickHandler.bind(this));
	      (_this$title = this.title) === null || _this$title === void 0 ? void 0 : _this$title.replaceWith(wrap);
	      this.title = wrap;
	      return this.title;
	    }
	  }, {
	    key: "onEditableTitleClickHandler",
	    value: function onEditableTitleClickHandler() {
	      var _this = this,
	        _this$title2;
	      var wrap = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t<input type=\"text\" class=\"form-control form-control-sm w-25\" value=\"", "\">\n\t\t"])), this.questionData.title);
	      main_core.Event.bind(wrap, 'keypress', function (event) {
	        if (event.key === 'Enter') {
	          _this.onEditableTitleEndChangeHandler();
	        }
	      });
	      main_core.Event.bind(wrap, 'blur', this.onEditableTitleEndChangeHandler.bind(this));
	      (_this$title2 = this.title) === null || _this$title2 === void 0 ? void 0 : _this$title2.replaceWith(wrap);
	      this.title = wrap;
	      this.title.focus();
	    }
	  }, {
	    key: "onEditableTitleEndChangeHandler",
	    value: function onEditableTitleEndChangeHandler() {
	      this.questionData.title = this.title.value;
	      main_core.Event.unbindAll(this.title, 'keypress');
	      main_core.Event.unbindAll(this.title, 'blur');
	      this.renderEditableTitle();
	    }
	  }]);
	  return Question;
	}();

	var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1;
	var FormConstructor = /*#__PURE__*/function () {
	  function FormConstructor() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, FormConstructor);
	    this.layout = {};
	    this.layout.wrap = options.container;
	    this.questions = [{
	      'title': 'Название 1'
	    }, {
	      'title': 'Название 2'
	    }, {
	      'title': 'Название 3'
	    }];
	    this.questionNumber = 1;
	    if (!this.layout.wrap) {
	      throw new Error("TaskList: container is not found");
	    }
	    this.layout.wrap.append(this.render());
	  }
	  babelHelpers.createClass(FormConstructor, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t<h1 class=\"text-center mt-5 mb-4\">\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0444\u043E\u0440\u043C\u044B</h1>\n\t\t\t<div class=\"container d-flex justify-content-center\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n\t\t\t\t", "\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">\u0422\u0442</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">P</button>\n\t\t\t</div>\n\t\t\t", "\n\t\t\t<div class=\"d-flex justify-content-center\">\n\t\t\t\t", "\n\t\t \t</div>\n\t\t</div>\n"])), this.renderAddQuestionButton(), this.renderQuestionList(), this.renderSaveFormButton());
	      return wrap;
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      var _this = this,
	        _this$layout$question;
	      this.questionNumber = 1;
	      var wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.questions.map(function (questionData) {
	        return new Question(questionData, _this.questionNumber++, _this.questions).render();
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
	      console.log(this.questions);
	    }
	  }]);
	  return FormConstructor;
	}();

	exports.FormConstructor = FormConstructor;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
