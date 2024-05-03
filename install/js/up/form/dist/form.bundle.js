/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3;
	var Options = /*#__PURE__*/function () {
	  function Options(options, questionName, questionId, answer) {
	    babelHelpers.classCallCheck(this, Options);
	    this.layout = {};
	    this.options = options;
	    this.questionName = questionName;
	    this.questionId = questionId;
	    this.type = null;
	    this.subAnswer = [];
	    this.answer = answer;
	  }
	  babelHelpers.createClass(Options, [{
	    key: "render",
	    value: function render() {
	      var _this = this,
	        _this$layout$wrap;
	      var wrap = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"test-question\">\n\t\t\t", "\n\t\t\t", "\n\t\t</div>"])), this.options.map(function (option) {
	        return _this.renderButton(option.ID, option.TITLE, _this.type);
	      }), this.renderClearButton());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderButton",
	    value: function renderButton(id, value, type) {
	      var _this2 = this;
	      this.value = '';
	      if (this.answer && this.answer.SUBANSWER.length !== 0) {
	        this.answer.SUBANSWER.forEach(function (subAnswer) {
	          if (Number(subAnswer.VALUE) === Number(id)) {
	            _this2.value = 'checked';
	            _this2.subAnswer.push(id);
	          }
	        });
	      }
	      var wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input\" type=\"", "\" name=\"", "_", "\" value=\"", "\" ", ">\n\t\t\t\t<label class=\"form-check-label\">", "</label>\n\t\t\t</div>\n\t\t"])), type, this.questionName, this.questionId, id, this.value, value);
	      main_core.Event.bind(wrap, 'change', this.onButtonChangeHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onButtonChangeHandler",
	    value: function onButtonChangeHandler(event) {
	      throw 'This is abstract class function';
	    }
	  }, {
	    key: "renderClearButton",
	    value: function renderClearButton() {
	      var wrap = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t<button class=\"btn clear-from-correct-answer\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onClearRadioButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onClearRadioButtonClickHandler",
	    value: function onClearRadioButtonClickHandler() {
	      this.subAnswer = [];
	      this.render();
	    }
	  }, {
	    key: "getAnswer",
	    value: function getAnswer() {
	      return this.subAnswer;
	    }
	  }]);
	  return Options;
	}();

	var Radio = /*#__PURE__*/function (_Options) {
	  babelHelpers.inherits(Radio, _Options);
	  function Radio(options, questionName, questionId, answer) {
	    var _this;
	    babelHelpers.classCallCheck(this, Radio);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Radio).call(this, options, questionName, questionId, answer));
	    _this.type = 'radio';
	    return _this;
	  }
	  babelHelpers.createClass(Radio, [{
	    key: "onButtonChangeHandler",
	    value: function onButtonChangeHandler(event) {
	      this.subAnswer = [event.target.value];
	    }
	  }]);
	  return Radio;
	}(Options);

	var _templateObject$1;
	var ShortText = /*#__PURE__*/function () {
	  function ShortText(answer) {
	    babelHelpers.classCallCheck(this, ShortText);
	    this.answer = answer;
	    this.subAnswer = [];
	    this.value = '';
	  }
	  babelHelpers.createClass(ShortText, [{
	    key: "render",
	    value: function render() {
	      if (this.answer && this.answer.SUBANSWER.length !== 0) {
	        this.value = this.answer.SUBANSWER[0].VALUE;
	        this.subAnswer.push(this.answer.SUBANSWER[0].VALUE);
	      } else {
	        this.value = '';
	      }
	      var wrap = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input class=\"form-control\" type=\"text\" value=\"", "\">\n\t\t"])), this.value);
	      main_core.Event.bind(wrap, 'change', this.onChangeHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onChangeHandler",
	    value: function onChangeHandler(event) {
	      this.subAnswer = [event.target.value];
	    }
	  }, {
	    key: "getAnswer",
	    value: function getAnswer() {
	      return this.subAnswer;
	    }
	  }]);
	  return ShortText;
	}();

	var Checkbox = /*#__PURE__*/function (_Options) {
	  babelHelpers.inherits(Checkbox, _Options);
	  function Checkbox(options, questionName, questionId, answer) {
	    var _this;
	    babelHelpers.classCallCheck(this, Checkbox);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Checkbox).call(this, options, questionName, questionId, answer));
	    _this.type = 'checkbox';
	    return _this;
	  }
	  babelHelpers.createClass(Checkbox, [{
	    key: "onButtonChangeHandler",
	    value: function onButtonChangeHandler(event) {
	      if (event.target.checked) {
	        this.subAnswer.push(event.target.value);
	      } else {
	        var index = this.subAnswer.indexOf(event.target.value);
	        if (index !== -1) {
	          this.subAnswer.splice(index, 1);
	        }
	      }
	    }
	  }]);
	  return Checkbox;
	}(Options);

	var _templateObject$2, _templateObject2$1;
	var Question = /*#__PURE__*/function () {
	  function Question(chapter_id, field_id, id, position, title, optionData, isRequired) {
	    var answer = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
	    babelHelpers.classCallCheck(this, Question);
	    this.layout = {};
	    this.layout.wrap = null;
	    this.layout.input = null;
	    this.title = title;
	    this.chapter_id = parseInt(chapter_id);
	    this.field_id = parseInt(field_id);
	    this.id = parseInt(id);
	    this.position = parseInt(position);
	    this.options = optionData;
	    this.isRequired = this.toBoolean(isRequired);
	    this.field = null;
	    this.answer = answer;
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$2 || (_templateObject$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"mb-3\">\n\t\t\t<label class=\"form-label\">", "</label>\n\t\t\t", "\n\t\t\t", "\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.title, this, this.renderInput(), this.renderRequired());
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      if (this.field_id === 1) {
	        this.field = new ShortText(this.answer);
	      } else if (this.field_id === 2) {
	        this.field = new Radio(this.options, this.title, this.id, this.answer);
	      } else if (this.field_id === 3) {
	        this.field = new Checkbox(this.options, this.title, this.id, this.answer);
	      }
	      this.layout.input = this.field.render();
	      return this.layout.input;
	    }
	  }, {
	    key: "renderRequired",
	    value: function renderRequired() {
	      if (!this.isRequired) {
	        return null;
	      }
	      var wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"recuired-question\">\n\t\t\t<lable class=\"recuired-question\">\n\t\t\t\t", "\n\t\t\t</lable>\n\t\t</div>"])), main_core.Loc.getMessage('UP_FORMS_FORM_REQUIRED_QUESTION'));
	      return wrap;
	    }
	  }, {
	    key: "getAnswer",
	    value: function getAnswer() {
	      return {
	        'ID': this.id,
	        'SUBANSWER': this.field.getAnswer()
	      };
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

	var FormManager = /*#__PURE__*/function () {
	  function FormManager() {
	    babelHelpers.classCallCheck(this, FormManager);
	  }
	  babelHelpers.createClass(FormManager, null, [{
	    key: "getFormData",
	    value: function getFormData(id, limit, offset, responseId) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.getFormData', {
	          data: {
	            id: id,
	            limit: limit,
	            offset: offset,
	            responseId: responseId
	          }
	        }).then(function (response) {
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          /*console.log(error);*/
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "saveAnswerData",
	    value: function saveAnswerData(data) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.Form.saveAnswers', {
	          data: {
	            answers: data
	          }
	        }).then(function (response) {
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          /*console.log(error);*/
	          reject(error.errors);
	        });
	      });
	    }
	  }, {
	    key: "createResponse",
	    value: function createResponse(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.Form.createResponse', {
	          data: {
	            formId: id
	          }
	        }).then(function (response) {
	          var startTime = response.data.startTime;
	          resolve(startTime);
	        })["catch"](function (error) {
	          /*console.log(error);*/
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "getAnswersByResponseId",
	    value: function getAnswersByResponseId(id, limit, offset) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.Response.getAnswersByResponseId', {
	          data: {
	            id: id,
	            limit: limit,
	            offset: offset
	          }
	        }).then(function (response) {
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          /*console.log(error);*/
	          reject(error);
	        });
	      });
	    }
	  }]);
	  return FormManager;
	}();

	var _templateObject$3, _templateObject2$2, _templateObject3$1, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;
	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var Form = /*#__PURE__*/function () {
	  function Form() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Form);
	    this.layout = {};
	    this.id = options.values.id;
	    this.layout.wrap = options.container;
	    this.timer = options.values.timer;
	    this.isRenderedMainBody = false;
	    this.isSaved = false;
	    this.timeIsUp = false;
	    this.currentNumOfItems = 0;
	    this.numOfItemsPerPage = 10;
	    this.limit = this.numOfItemsPerPage + 1;
	    this.offset = 0;
	    this.currentPage = 1;
	    this.responseId = false;
	    this.passedPages = [1];
	    this.nextPageIsPassed = false;
	    this.startTime = options.values.startTime;
	    if (this.startTime && this.timer) {
	      this.startTimer();
	      var timeRemaining = this.addTimeFromTimer(this.startTime, this.timer) - new Date();
	      this.timeIsUp = timeRemaining <= 0;
	    }
	    if (this.timeIsUp) {
	      this.submitResponse(null);
	    }
	    this["try"] = options.values["try"];
	    this.maxTry = options.values.maxTry;
	    this.isStarted = this.startTime ? true : false;
	    this.questions = [];
	    this.formData = {};
	    this.isLoading = true;
	    this.reload();
	  }
	  babelHelpers.createClass(Form, [{
	    key: "reload",
	    value: function reload() {
	      this.questions = [];
	      this.formData = {};
	      this.layout.wrap.append(this.render());
	      this.loadFormData();
	    }
	  }, {
	    key: "loadFormData",
	    value: function () {
	      var _loadFormData = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        var _this = this;
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              if (!(parseInt(this.id) !== 0)) {
	                _context.next = 24;
	                break;
	              }
	              _context.prev = 1;
	              if (!this.nextPageIsPassed) {
	                _context.next = 11;
	                break;
	              }
	              _context.next = 5;
	              return FormManager.getFormData(this.id, this.limit, this.offset, this.responseId);
	            case 5:
	              this.formData = _context.sent;
	              this.isLoading = false;
	              this.chapterId = this.formData.CHAPTER[0].ID;
	              this.formData.CHAPTER[0].QUESTION.map(function (questionData) {
	                var question = new Question(questionData.CHAPTER_ID, questionData.FIELD_ID, questionData.ID, questionData.POSITION, questionData.TITLE, questionData.OPTION, questionData.SETTINGS[1].VALUE, questionData.ANSWER[0]);
	                _this.questions.push(question);
	              });
	              _context.next = 17;
	              break;
	            case 11:
	              _context.next = 13;
	              return FormManager.getFormData(this.id, this.limit, this.offset, this.nextPageIsPassed);
	            case 13:
	              this.formData = _context.sent;
	              this.isLoading = false;
	              this.chapterId = this.formData.CHAPTER[0].ID;
	              this.formData.CHAPTER[0].QUESTION.map(function (questionData) {
	                var question = new Question(questionData.CHAPTER_ID, questionData.FIELD_ID, questionData.ID, questionData.POSITION, questionData.TITLE, questionData.OPTION, questionData.SETTINGS[1].VALUE);
	                _this.questions.push(question);
	              });
	            case 17:
	              this.currentNumOfItems = this.questions.length;
	              if (this.currentNumOfItems === this.numOfItemsPerPage + 1) {
	                this.questions.pop();
	              }
	              this.layout.form = this.render();
	              _context.next = 24;
	              break;
	            case 22:
	              _context.prev = 22;
	              _context.t0 = _context["catch"](1);
	            case 24:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this, [[1, 22]]);
	      }));
	      function loadFormData() {
	        return _loadFormData.apply(this, arguments);
	      }
	      return loadFormData;
	    }()
	  }, {
	    key: "render",
	    value: function render() {
	      var _this$layout$form;
	      var wrap;
	      if (this.isLoading) {
	        wrap = main_core.Tag.render(_templateObject$3 || (_templateObject$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n\t\t\t\t\t<span class=\"sr-only\"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t"])));
	      } else if (!this.isStarted) {
	        wrap = main_core.Tag.render(_templateObject2$2 || (_templateObject2$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<h1 class=\"text-center mb-5\">", "</h1>\n\t\t\t\t\t", "\n\t\t\t\t\t<div class=\"d-flex justify-content-center\">", "</div>\n\t\t\t\t</div>"])), this.formData.TITLE, this.renderTriesRemaining(), this.renderStartButton());
	      } else if (this.timeIsUp) {
	        wrap = main_core.Tag.render(_templateObject3$1 || (_templateObject3$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<h1 class=\"text-center mb-5\">", "</h1>\n\t\t\t\t\t<div class=\"d-flex justify-content-center\">\n\t\t\t\t\t\t<h2 class =\"text-center\">", "</h2>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"])), this.formData.TITLE, main_core.Loc.getMessage('UP_FORMS_FORM_TIME_IS_UP_MESSAGE'));
	      } else {
	        wrap = main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container\">\n\t\t\t\t<h1 class=\"text-center mb-5\">", "</h1>\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t</div>"])), this.formData.TITLE, this.renderTimer(), this.renderQuestionList(), this.renderPagination(), this.renderSubmitButton());
	        this.isRenderedMainBody = true;
	      }
	      (_this$layout$form = this.layout.form) === null || _this$layout$form === void 0 ? void 0 : _this$layout$form.replaceWith(wrap);
	      this.layout.form = wrap;
	      return this.layout.form;
	    }
	  }, {
	    key: "renderPagination",
	    value: function renderPagination() {
	      return main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<nav class=\"d-flex justify-content-center mt-5\">\n\t\t\t\t\t<ul class=\"pagination\">\n\t\t\t\t\t\t", "\n\t\t\t\t\t\t", "\n\t\t\t\t\t</ul>\n\t\t\t\t</nav>\n\t\t\t"])), this.renderPreviousPageButton(), this.renderNextPageButton());
	    }
	  }, {
	    key: "renderNextPageButton",
	    value: function renderNextPageButton() {
	      if (this.currentNumOfItems === this.numOfItemsPerPage + 1 || this.passedPages.includes(this.currentPage + 1)) {
	        var wrap = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"page-item\">\n\t\t\t\t\t\n\t\t\t\t\t\t<button class=\"page-link\" aria-hidden=\"true\">&raquo;</button>\n\t\t\t\t\t\n\t\t\t\t</li>\n\t\t\t\t"])));
	        main_core.Event.bind(wrap, 'click', this.onNextPageButtonClickHandler.bind(this));
	        return wrap;
	      }
	    }
	  }, {
	    key: "renderPreviousPageButton",
	    value: function renderPreviousPageButton() {
	      if (this.currentPage > 1) {
	        var wrap = main_core.Tag.render(_templateObject7 || (_templateObject7 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<li class=\"page-item\">\n\t\t\t\t\t\n\t\t\t\t\t\t<button class=\"page-link\" aria-hidden=\"true\">&laquo;</button>\n\t\t\t\t\t\n\t\t\t\t</li>\n\t\t\t\t"])));
	        main_core.Event.bind(wrap, 'click', this.onPreviousPageButtonClickHandler.bind(this));
	        return wrap;
	      }
	    }
	  }, {
	    key: "onNextPageButtonClickHandler",
	    value: function onNextPageButtonClickHandler() {
	      var _this2 = this;
	      this.submitIntermediateResponse().then(function (responseId) {
	        _this2.limit += 10;
	        _this2.offset += 10;
	        _this2.currentPage += 1;
	        _this2.responseId = responseId;
	        _this2.updatePassedPages();
	        _this2.reload();
	      })["catch"](function (errors) {
	        _this2.layout.wrap.prepend(_this2.renderErrors(errors));
	      });
	    }
	  }, {
	    key: "onPreviousPageButtonClickHandler",
	    value: function onPreviousPageButtonClickHandler() {
	      var _this3 = this;
	      this.submitIntermediateResponse().then(function (responseId) {
	        _this3.nextPageIsPassed = true;
	        _this3.limit -= 10;
	        _this3.offset -= 10;
	        _this3.currentPage -= 1;
	        _this3.responseId = responseId;
	        _this3.reload();
	      })["catch"](function (errors) {
	        _this3.layout.wrap.prepend(_this3.renderErrors(errors));
	      });
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      return main_core.Tag.render(_templateObject8 || (_templateObject8 = babelHelpers.taggedTemplateLiteral(["\n\t\t<form>\n\t\t\t", "\n\t\t</form>\n\t\t"])), this.questions.map(function (question) {
	        return question.render();
	      }));
	    }
	  }, {
	    key: "renderSubmitButton",
	    value: function renderSubmitButton() {
	      var _this4 = this;
	      var wrap = main_core.Tag.render(_templateObject9 || (_templateObject9 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"d-flex justify-content-center mt-5\">\n\t\t\t\t<button class=\"btn btn-primary submit-button\">\n\t\t\t\t\t", "\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t\n\t\t"])), main_core.Loc.getMessage('UP_FORMS_FORM_SUBMIT_BUTTON'));
	      this.layout.submitButtonObject = {
	        isActive: true,
	        wrap: wrap
	      };
	      main_core.Event.bind(wrap, 'click', function () {
	        return _this4.submitResponse(_this4.layout.submitButtonObject);
	      });
	      return this.layout.submitButtonObject.wrap;
	    }
	  }, {
	    key: "submitIntermediateResponse",
	    value: function submitIntermediateResponse() {
	      var answers = [];
	      if (this.isRenderedMainBody) {
	        answers = this.questions.map(function (question) {
	          return question.getAnswer();
	        });
	      }
	      this.renderErrors([]);
	      var data = {
	        'FORM_ID': this.id,
	        'CHAPTER_ID': this.chapterId,
	        'ANSWER': answers,
	        'IS_COMPLETED': false,
	        'IS_TIME_UP': this.timeIsUp
	      };
	      return FormManager.saveAnswerData(data);
	    }
	  }, {
	    key: "updatePassedPages",
	    value: function updatePassedPages() {
	      if (!this.passedPages.includes(this.currentPage)) {
	        this.passedPages.push(this.currentPage);
	        this.nextPageIsPassed = false;
	      }
	    }
	  }, {
	    key: "submitResponse",
	    value: function submitResponse() {
	      var _this5 = this;
	      var button = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      if (button) {
	        if (!button.isActive) {
	          return;
	        }
	        button.wrap.classList.add('disabled');
	        button.isActive = false;
	      }
	      var answers = [];
	      if (this.isRenderedMainBody) {
	        button.wrap.classList.add('disabled');
	        answers = this.questions.map(function (question) {
	          return question.getAnswer();
	        });
	      }
	      this.renderErrors([]);
	      var data = {
	        'FORM_ID': this.id,
	        'CHAPTER_ID': this.chapterId,
	        'ANSWER': answers,
	        'IS_COMPLETED': true,
	        'IS_TIME_UP': this.timeIsUp
	      };
	      FormManager.saveAnswerData(data).then(function (response) {
	        _this5.isSaved = true;
	        if (!_this5.timeIsUp) {
	          if (!BX.SidePanel.Instance.isOpen()) {
	            window.location.pathname = '/';
	            return;
	          }
	          BX.SidePanel.Instance.close();
	          var url = BX.SidePanel.Instance.getCurrentUrl();
	          setTimeout(function () {
	            return BX.SidePanel.Instance.destroy(url);
	          }, 1000);
	        } else {
	          _this5.render();
	        }
	      })["catch"](function (errors) {
	        _this5.layout.wrap.prepend(_this5.renderErrors(errors));
	        button.wrap.classList.remove('disabled');
	        button.isActive = true;
	      });
	    }
	  }, {
	    key: "renderTimer",
	    value: function renderTimer() {
	      if (this.timer) {
	        var _this$layout$timer;
	        var wrap = main_core.Tag.render(_templateObject10 || (_templateObject10 = babelHelpers.taggedTemplateLiteral(["<div class=\"container text-center mt-4\">\n\t\t\t\t\t\t\t\t\t\t<div id=\"timer\" class=\"display-6\">", "</div>\n\t\t\t\t\t\t\t\t\t</div>"])), this.renderTime());
	        (_this$layout$timer = this.layout.timer) === null || _this$layout$timer === void 0 ? void 0 : _this$layout$timer.replaceWith(wrap);
	        this.layout.timer = wrap;
	        return this.layout.timer;
	      } else {
	        return '';
	      }
	    }
	  }, {
	    key: "renderTime",
	    value: function renderTime() {
	      var wrap = main_core.Tag.render(_templateObject11 || (_templateObject11 = babelHelpers.taggedTemplateLiteral(["<p>", ":00</p>"])), this.timer);
	      this.layout.time = wrap;
	      return this.layout.time;
	    }
	  }, {
	    key: "renderTriesRemaining",
	    value: function renderTriesRemaining() {
	      if (!this.maxTry) {
	        return null;
	      }
	      var wrap = main_core.Tag.render(_templateObject12 || (_templateObject12 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<h2 class =\"text-center\">\n\t\t\t\t\t", ": ", "\n\t\t\t\t</h2>"])), main_core.Loc.getMessage('UP_FORMS_FORM_TRYIES_REMAINING'), this.maxTry - this["try"]);
	      return wrap;
	    }
	  }, {
	    key: "renderStartButton",
	    value: function renderStartButton() {
	      var _this6 = this;
	      var wrap = main_core.Tag.render(_templateObject13 || (_templateObject13 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">\n\t\t\t\t", "\n\t\t\t</button>\n\t\t"])), main_core.Loc.getMessage('UP_FORMS_FORM_START_BUTTON'));
	      main_core.Event.bind(wrap, 'click', function () {
	        return _this6.onStartButtonClickHandler(wrap);
	      });
	      return wrap;
	    }
	  }, {
	    key: "onStartButtonClickHandler",
	    value: function () {
	      var _onStartButtonClickHandler = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(button) {
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              this.isStarted = true;
	              button.classList.add('disabled');
	              _context2.next = 4;
	              return FormManager.createResponse(this.id);
	            case 4:
	              this.startTime = _context2.sent;
	              this.startTimer();
	              this.render();
	            case 7:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, this);
	      }));
	      function onStartButtonClickHandler(_x) {
	        return _onStartButtonClickHandler.apply(this, arguments);
	      }
	      return onStartButtonClickHandler;
	    }()
	  }, {
	    key: "startTimer",
	    value: function startTimer() {
	      if (this.timer) {
	        var endTime = this.addTimeFromTimer(this.startTime, this.timer);
	        this.renderTimer();
	        this.updateTimer(endTime);
	      }
	    }
	  }, {
	    key: "addTimeFromTimer",
	    value: function addTimeFromTimer(time, timer) {
	      var jsTimeStamp = time * 1000;
	      var _timer$split$map = timer.split(':').map(Number),
	        _timer$split$map2 = babelHelpers.slicedToArray(_timer$split$map, 2),
	        hours = _timer$split$map2[0],
	        minutes = _timer$split$map2[1];
	      var totalMinutesCombined = hours * 60 + minutes;
	      var newDate = new Date(jsTimeStamp + totalMinutesCombined * 60000);
	      return newDate;
	    }
	  }, {
	    key: "updateTimer",
	    value: function updateTimer(endTime) {
	      var _this7 = this;
	      var remainingTime = endTime - new Date();
	      if (this.isSaved) {
	        return;
	      }
	      if (remainingTime <= 0) {
	        this.timeIsUp = true;
	        this.submitResponse(this.layout.submitButtonObject);
	      } else {
	        var seconds = Math.floor(remainingTime / 1000) % 60;
	        var minutes = Math.floor(remainingTime / (1000 * 60) % 60);
	        var hours = Math.floor(remainingTime / (1000 * 60 * 60) % 24);
	        var formattedSeconds = String(seconds).padStart(2, '0');
	        var formattedHours = String(hours).padStart(2, '0');
	        var formattedMinutes = String(minutes).padStart(2, '0');
	        this.layout.time.innerText = "".concat(formattedHours, ":").concat(formattedMinutes, ":").concat(formattedSeconds);
	        setTimeout(function () {
	          return _this7.updateTimer(endTime);
	        }, 1000);
	      }
	    }
	  }, {
	    key: "renderErrors",
	    value: function renderErrors(errors) {
	      var _this8 = this,
	        _this$layout$error;
	      var wrap = main_core.Tag.render(_templateObject14 || (_templateObject14 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</div>"])), errors.map(function (error) {
	        return _this8.renderError(error.message);
	      }));
	      (_this$layout$error = this.layout.error) === null || _this$layout$error === void 0 ? void 0 : _this$layout$error.replaceWith(wrap);
	      this.layout.error = wrap;
	      return this.layout.error;
	    }
	  }, {
	    key: "renderError",
	    value: function renderError(message) {
	      var wrap = main_core.Tag.render(_templateObject15 || (_templateObject15 = babelHelpers.taggedTemplateLiteral(["<div class=\"alert alert-danger\" role=\"alert\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</div>"])), message);
	      return wrap;
	    }
	  }]);
	  return Form;
	}();

	exports.Form = Form;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
