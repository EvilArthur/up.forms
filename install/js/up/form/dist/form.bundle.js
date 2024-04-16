/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject;
	var EditableText = /*#__PURE__*/function () {
	  function EditableText(element, textObject) {
	    babelHelpers.classCallCheck(this, EditableText);
	    this.element = element;
	    this.textObject = textObject;
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
	      var newTitle = this.input.value;
	      this.element.innerText = newTitle;
	      this.textObject.value = newTitle;
	      this.input.replaceWith(this.element);
	    }
	  }]);
	  return EditableText;
	}();

	var _templateObject$1, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
	var Option = /*#__PURE__*/function () {
	  function Option(id, value, questionName) {
	    babelHelpers.classCallCheck(this, Option);
	    this.id = id;
	    this.questionName = questionName;
	    this.labelObject = {
	      value: value
	    };
	    this.layout = {};
	    this.isDeleted = false;
	  }
	  babelHelpers.createClass(Option, [{
	    key: "render",
	    value: function render() {
	      var _this$layout$wrap;
	      if (this.isDeleted) {
	        return;
	      }
	      var wrap = main_core.Tag.render(_templateObject$1 || (_templateObject$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"form-check\">\n\t\t\t", "\n\t\t\t", "\n\t\t</div>"])), this.renderEditableLabel(), this.renderDeleteButton());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderEditableLabel",
	    value: function renderEditableLabel() {
	      var wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["<label class=\"form-check-label\">", "</label>"])), this.labelObject.value);
	      new EditableText(wrap, this.labelObject);
	      return wrap;
	    }
	  }, {
	    key: "renderRadioButton",
	    value: function renderRadioButton() {
	      var wrap = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"radio\" name=\"", "\" value=\"", "\" autocomplete=\"off\">"])), this.questionName, this.id);
	      this.layout.radioButton = wrap;
	      return this.layout.radioButton;
	    }
	  }, {
	    key: "renderDeleteButton",
	    value: function renderDeleteButton() {
	      if (this.isDeleted) {
	        return main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral([""])));
	      }
	      var wrap = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn-close\"></button>\n\t\t"])));
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
	        'TITLE': this.labelObject.value
	      };
	    }
	  }]);
	  return Option;
	}();

	var _templateObject$2, _templateObject2$1, _templateObject3$1;
	var Options = /*#__PURE__*/function () {
	  function Options(options) {
	    babelHelpers.classCallCheck(this, Options);
	    this.layout = {};
	    this.options = options;
	    this.type = null;
	    this.subAnswer = [];
	  }
	  babelHelpers.createClass(Options, [{
	    key: "render",
	    value: function render() {
	      var _this = this,
	        _this$layout$wrap;
	      var wrap = main_core.Tag.render(_templateObject$2 || (_templateObject$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t", "\n\t\t\t", "\n\t\t</div>"])), this.options.map(function (option) {
	        return _this.renderButton(option.ID, option.TITLE, _this.type);
	      }), this.renderClearButton());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderButton",
	    value: function renderButton(id, value, type) {
	      var wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"form-check\">\n\t\t\t\t<input class=\"form-check-input\" type=\"", "\" name=\"", "_", "\" value=\"", "\">\n\t\t\t\t<label class=\"form-check-label\">", "</label>\n\t\t\t</div>\n\t\t"])), type, this.title, this.id, id, value);
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
	      var wrap = main_core.Tag.render(_templateObject3$1 || (_templateObject3$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<button class=\"btn btn-primary btn-sm\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button>"])));
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
	  function Radio(options) {
	    var _this;
	    babelHelpers.classCallCheck(this, Radio);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Radio).call(this, options));
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

	var _templateObject$3;
	var ShortText = /*#__PURE__*/function () {
	  function ShortText() {
	    babelHelpers.classCallCheck(this, ShortText);
	    this.subAnswer = [];
	  }
	  babelHelpers.createClass(ShortText, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$3 || (_templateObject$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<input class=\"form-control\" type=\"text\">\n\t\t"])));
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
	  function Checkbox(options) {
	    var _this;
	    babelHelpers.classCallCheck(this, Checkbox);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Checkbox).call(this, options));
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

	var _templateObject$4;
	var Question = /*#__PURE__*/function () {
	  function Question(chapter_id, field_id, id, position, title, optionData) {
	    babelHelpers.classCallCheck(this, Question);
	    this.layout = {};
	    this.layout.wrap = null;
	    this.layout.input = null;
	    this.title = title;
	    this.chapter_id = chapter_id;
	    this.field_id = field_id;
	    this.id = id;
	    this.position = position;
	    this.options = optionData;
	    this.field = null;
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$4 || (_templateObject$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"mb-3\">\n\t\t\t<label class=\"form-label\">", "</label>\n\t\t\t", "\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.title, this, this.renderInput());
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderInput",
	    value: function renderInput() {
	      if (this.field_id === 1) {
	        this.field = new ShortText();
	      } else if (this.field_id === 2) {
	        this.field = new Radio(this.options);
	      } else if (this.field_id === 3) {
	        this.field = new Checkbox(this.options);
	      }
	      this.layout.input = this.field.render();
	      return this.layout.input;
	    }
	  }, {
	    key: "getAnswer",
	    value: function getAnswer() {
	      return {
	        'ID': this.id,
	        'SUBANSWER': this.field.getAnswer()
	      };
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
	    value: function getFormData(id) {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.FormCreate.getFormData', {
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
	  }, {
	    key: "saveAnswerData",
	    value: function saveAnswerData(data) {
	      console.log(data);
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.Form.saveAnswers', {
	          data: {
	            answers: data
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

	var _templateObject$5, _templateObject2$2, _templateObject3$2, _templateObject4$1;
	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var Form = /*#__PURE__*/function () {
	  function Form() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Form);
	    this.layout = {};
	    this.id = options.id;
	    this.layout.wrap = options.container;
	    this.questions = [];
	    this.formData = {};
	    this.isLoading = true;
	    this.layout.wrap.append(this.render());
	    this.loadFormData();
	  }
	  babelHelpers.createClass(Form, [{
	    key: "loadFormData",
	    value: function () {
	      var _loadFormData = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        var _this = this;
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              if (!(this.id !== 0)) {
	                _context.next = 15;
	                break;
	              }
	              _context.prev = 1;
	              _context.next = 4;
	              return FormManager.getFormData(this.id);
	            case 4:
	              this.formData = _context.sent;
	              this.isLoading = false;
	              console.log(this.formData);
	              this.formData.CHAPTER[0].QUESTION.map(function (questionData) {
	                var question = new Question(questionData.CHAPTER_ID, questionData.FIELD_ID, questionData.ID, questionData.POSITION, questionData.TITLE, questionData.OPTION);
	                _this.questions.push(question);
	              });
	              console.log(this.questions);
	              this.layout.form = this.render();
	              _context.next = 15;
	              break;
	            case 12:
	              _context.prev = 12;
	              _context.t0 = _context["catch"](1);
	              console.log(_context.t0);
	            case 15:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this, [[1, 12]]);
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
	        wrap = main_core.Tag.render(_templateObject$5 || (_templateObject$5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n\t\t\t\t\t<span class=\"sr-only\"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t"])));
	      } else {
	        wrap = main_core.Tag.render(_templateObject2$2 || (_templateObject2$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container\">\n\t\t\t\t<h1 class=\"text-center mt-5 mb-4\">", "</h1>\n\t\t\t\t", "\n\t\t\t\t", "\n\t\t\t</div>\n\t\t"])), this.formData.TITLE, this.renderQuestionList(), this.renderSubmitButton());
	      }
	      (_this$layout$form = this.layout.form) === null || _this$layout$form === void 0 ? void 0 : _this$layout$form.replaceWith(wrap);
	      this.layout.form = wrap;
	      return this.layout.form;
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      var wrap = main_core.Tag.render(_templateObject3$2 || (_templateObject3$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<form>\n\t\t\t", "\n\t\t</form>\n\t\t"])), this.questions.map(function (question) {
	        return question.render();
	      }));
	      return wrap;
	    }
	  }, {
	    key: "renderSubmitButton",
	    value: function renderSubmitButton() {
	      var wrap = main_core.Tag.render(_templateObject4$1 || (_templateObject4$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onSubmitButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onSubmitButtonClickHandler",
	    value: function onSubmitButtonClickHandler() {
	      var answers = this.questions.map(function (question) {
	        return question.getAnswer();
	      });
	      var data = {
	        'FORM_ID': this.id,
	        'USER_ID': 1,
	        'TRY_NUMBER': 1,
	        'ANSWER': answers
	      };
	      console.log(data);
	      FormManager.saveAnswerData(data).then(function (response) {
	        BX.SidePanel.Instance.close();
	        console.log(response);
	      })["catch"](function (error) {
	        return console.log(error);
	      });
	    }
	  }]);
	  return Form;
	}();

	exports.Form = Form;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
