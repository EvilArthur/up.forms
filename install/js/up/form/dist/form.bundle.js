/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2;
	var Question = /*#__PURE__*/function () {
	  function Question(questionData) {
	    babelHelpers.classCallCheck(this, Question);
	    this.layout = {};
	    this.layout.wrap = null;
	    this.layout.input = null;
	    this.questionData = questionData;
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"mb-3\">\n\t\t\t<label class=\"form-label\">", "</label>\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.questionData.title, this.renderInput());
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      var wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input class=\"form-control\" type=\"text\">\n\t\t"])));
	      this.layout.input = wrap;
	      return this.layout.input;
	    }
	  }, {
	    key: "getAnswer",
	    value: function getAnswer() {
	      return {
	        'id': this.questionData.id,
	        'answer': this.layout.input.value
	      };
	    }
	  }]);
	  return Question;
	}();

	var _templateObject$1, _templateObject2$1, _templateObject3;
	var Form = /*#__PURE__*/function () {
	  function Form() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Form);
	    this.layout = {};
	    this.layout.wrap = options.container;
	    this.layout.questions = [];
	    this.formData = {
	      'title': 'Название формы',
	      'questions': [{
	        'id': 1,
	        'title': 'Вопрос 1',
	        'description': ' Описание 1',
	        'type': 1
	      }, {
	        'id': 2,
	        'title': 'Вопрос 2',
	        'description': ' Описание 2',
	        'type': 1
	      }, {
	        'id': 3,
	        'title': 'Вопрос 3',
	        'description': ' Описание 3',
	        'type': 1
	      }]
	    };
	    this.layout.wrap.append(this.render());
	  }
	  babelHelpers.createClass(Form, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t<h1 class=\"text-center mt-5 mb-4\">", "</h1>\n\t\t\t", "\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.formData.title, this.renderQuestionList(), this.renderSubmitButton());
	      return wrap;
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<form>\n\t\t\t", "\n\t\t</form>\n\t\t"])), this.formData.questions.map(function (questionData) {
	        var question = null;
	        if (questionData.type === 1) {
	          question = new Question(questionData);
	        }
	        _this.layout.questions.push(question);
	        return question.render();
	      }));
	      return wrap;
	    }
	  }, {
	    key: "renderSubmitButton",
	    value: function renderSubmitButton() {
	      var wrap = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onSubmitButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onSubmitButtonClickHandler",
	    value: function onSubmitButtonClickHandler() {
	      console.log(this.layout.questions.map(function (question) {
	        return question.getAnswer();
	      }));
	    }
	  }]);
	  return Form;
	}();

	exports.Form = Form;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
