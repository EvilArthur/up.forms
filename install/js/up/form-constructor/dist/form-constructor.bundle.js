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
	          console.log(result);
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
	          var result = response.data.result;
	          resolve(result);
	        })["catch"](function (error) {
	          console.log(error);
	          reject(error);
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
	  }]);
	  return FormManager;
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
	        ID: this.id,
	        Value: this.labelObject.value
	      };
	    }
	  }]);
	  return Option;
	}();

	var _templateObject$2, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
	var Question = /*#__PURE__*/function () {
	  function Question(chapter_id, field_id, id, position, title, optionData, fieldData) {
	    babelHelpers.classCallCheck(this, Question);
	    this.layout = {};
	    this.titleObject = {
	      value: title
	    };
	    this.chapter_id = chapter_id;
	    this.field_id = field_id;
	    this.id = id;
	    this.position = position;
	    this.fieldData = fieldData;
	    this.isDeleted = false;
	    this.options = optionData.map(function (option) {
	      return new Option(option.ID, option.Value);
	    });
	  }
	  babelHelpers.createClass(Question, [{
	    key: "render",
	    value: function render() {
	      var _this$layout$wrap;
	      if (this.isDeleted) {
	        return main_core.Tag.render(_templateObject$2 || (_templateObject$2 = babelHelpers.taggedTemplateLiteral([""])));
	      }
	      var wrap = main_core.Tag.render(_templateObject2$1 || (_templateObject2$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"card mb-3 mt-3\">\n\t\t\t\t<div class=\"card-header\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col text-left\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col text-end\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col text-end\">\n\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t", "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"card-footer\">\n\t\t\t\t\t<p>\"\u041E\u0431\u044F\u0437\u0435\u0442\u043B\u044C\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441\"</p>\n\t\t\t\t</div>\n\t\t\t</div>"])), this.renderEditableTitle(), this.renderTypes(), this.renderRemoveQuestionButton(), this.renderBody());
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderRemoveQuestionButton",
	    value: function renderRemoveQuestionButton() {
	      var wrap = main_core.Tag.render(_templateObject3$1 || (_templateObject3$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn btn-danger\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onRemoveQuestionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onRemoveQuestionButtonClickHandler",
	    value: function onRemoveQuestionButtonClickHandler() {
	      this.isDeleted = true;
	      this.layout.wrap.remove();
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var wrap = main_core.Tag.render(_templateObject4$1 || (_templateObject4$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<h3 class=\"form-label\">", "</h3>\n\t\t"])), this.titleObject.value);
	      new EditableText(wrap, this.titleObject);
	      this.layout.title = wrap;
	      return this.layout.title;
	    }
	  }, {
	    key: "renderTypes",
	    value: function renderTypes() {
	      var _this = this;
	      var wrap = main_core.Tag.render(_templateObject5$1 || (_templateObject5$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<select class=\"form-select\" aria-label=\"Default select example\">\n\t\t\t\t", "\n\t\t\t</select>\n\t\t"])), this.fieldData.map(function (field) {
	        return _this.renderType(field);
	      }));
	      main_core.Event.bind(wrap, 'change', function () {
	        _this.onChangeTypesHandler(wrap.value);
	      });
	      return wrap;
	    }
	  }, {
	    key: "onChangeTypesHandler",
	    value: function onChangeTypesHandler(value) {
	      this.field_id = parseInt(value);
	      this.render();
	    }
	  }, {
	    key: "renderType",
	    value: function renderType(field) {
	      var wrap = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t\t\t<option value=\"", "\">", "</option>\n\t\t\t\t\t\t\t\t\t"])), field.ID, main_core.Loc.getMessage(field.Title));
	      if (this.field_id === parseInt(field.ID)) {
	        wrap.setAttribute('selected', '');
	      }
	      return wrap;
	    }
	  }, {
	    key: "renderBody",
	    value: function renderBody() {
	      var _this$layout$body;
	      var wrap;
	      console.log(this.field_id);
	      if (this.field_id === 1) {
	        wrap = main_core.Tag.render(_templateObject7 || (_templateObject7 = babelHelpers.taggedTemplateLiteral(["<p class=\"text-decoration-underline mb-0\">\u041A\u0440\u0430\u0442\u043A\u0438\u0439 \u043E\u0442\u0432\u0435\u0442</p>"])));
	      } else if (this.field_id === 2 || this.field_id === 3) {
	        wrap = main_core.Tag.render(_templateObject8 || (_templateObject8 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t  </div>"])), this.renderAddOptionButton(), this.renderOptions());
	      }
	      (_this$layout$body = this.layout.body) === null || _this$layout$body === void 0 ? void 0 : _this$layout$body.replaceWith(wrap);
	      this.layout.body = wrap;
	      return this.layout.body;
	    }
	  }, {
	    key: "renderOptions",
	    value: function renderOptions() {
	      var _this$layout$options;
	      var wrap = main_core.Tag.render(_templateObject9 || (_templateObject9 = babelHelpers.taggedTemplateLiteral(["<div class=\"container\">\n\t\t\t", "\n\t\t</div>"])), this.options.map(function (option) {
	        return option.render();
	      }));
	      (_this$layout$options = this.layout.options) === null || _this$layout$options === void 0 ? void 0 : _this$layout$options.replaceWith(wrap);
	      this.layout.options = wrap;
	      return this.layout.options;
	    }
	  }, {
	    key: "renderAddOptionButton",
	    value: function renderAddOptionButton() {
	      var wrap = main_core.Tag.render(_templateObject10 || (_templateObject10 = babelHelpers.taggedTemplateLiteral(["<button class=\"btn btn-primary btn-sm\">+</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onAddOptionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onAddOptionButtonClickHandler",
	    value: function onAddOptionButtonClickHandler() {
	      var option = new Option(null, 'Новая опция', this.id);
	      this.layout.body.append(option.render());
	      this.options.push(option);
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      if (this.isDeleted) {
	        return null;
	      }
	      var data = {
	        'Title': this.titleObject.value,
	        'Position': this.position,
	        'Field_ID': this.field_id,
	        'ID': this.id,
	        'Options': this.options.map(function (options) {
	          return options.getData();
	        })
	      };
	      return data;
	    }
	  }]);
	  return Question;
	}();

	var _templateObject$3, _templateObject2$2, _templateObject3$2, _templateObject4$2, _templateObject5$2, _templateObject6$1;
	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var Constructor = /*#__PURE__*/function () {
	  function Constructor(id) {
	    babelHelpers.classCallCheck(this, Constructor);
	    this.id = id;
	    this.layout = {};
	    this.formData = {
	      Chapter: []
	    };
	    this.titleObject = {
	      value: ''
	    };
	    this.fieldData = [];
	    this.questions = [];
	    this.chapters = [];
	    this.isLoading = true;
	    this.loadFormData();
	  }
	  babelHelpers.createClass(Constructor, [{
	    key: "loadFormData",
	    value: function () {
	      var _loadFormData = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        var _this = this;
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return FormManager.getFieldData();
	            case 2:
	              this.fieldData = _context.sent;
	              if (!(this.id !== 0)) {
	                _context.next = 19;
	                break;
	              }
	              _context.prev = 4;
	              _context.next = 7;
	              return FormManager.getFormData(this.id);
	            case 7:
	              this.formData = _context.sent;
	              this.titleObject.value = this.formData.Title;
	              this.isLoading = false;
	              this.formData.Chapter[0].Question.map(function (questionData) {
	                var question = null;
	                console.log(questionData);
	                question = new Question(questionData.Chapter_ID, questionData.Field_ID, questionData.ID, questionData.Position, questionData.Title, questionData.Options, _this.fieldData);
	                _this.questions.push(question);
	              });
	              this.layout.wrap = this.render();
	              _context.next = 17;
	              break;
	            case 14:
	              _context.prev = 14;
	              _context.t0 = _context["catch"](4);
	              console.log(_context.t0);
	            case 17:
	              _context.next = 23;
	              break;
	            case 19:
	              this.formData.Chapter[0] = {
	                'title': 'Заголовок раздела',
	                'description': 'Описание раздела',
	                'Position': 1,
	                'questions': [],
	                'id': null
	              };
	              this.isLoading = false;
	              this.titleObject.value = 'Новая форма';
	              this.layout.wrap = this.render();
	            case 23:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this, [[4, 14]]);
	      }));
	      function loadFormData() {
	        return _loadFormData.apply(this, arguments);
	      }
	      return loadFormData;
	    }()
	  }, {
	    key: "render",
	    value: function render() {
	      var _this$layout$wrap;
	      var wrap;
	      if (this.isLoading) {
	        wrap = main_core.Tag.render(_templateObject$3 || (_templateObject$3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n\t\t\t\t\t<span class=\"sr-only\"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t"])));
	      } else {
	        wrap = main_core.Tag.render(_templateObject2$2 || (_templateObject2$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t", "\n\t\t\t</div>\n\t\t\t<div class=\"container d-flex justify-content-center\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\n\t\t\t\t", "\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">\u0422\u0442</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">P</button>\n\t\t\t</div>\n\t\t\t", "\n\t\t\t<div class=\"d-flex justify-content-center\">\n\t\t\t\t", "\n\t\t \t</div>\n\t\t</div>\n"])), this.renderEditableTitle(), this.renderAddQuestionButton(), this.renderQuestionList(), this.renderSaveFormButton());
	      }
	      (_this$layout$wrap = this.layout.wrap) === null || _this$layout$wrap === void 0 ? void 0 : _this$layout$wrap.replaceWith(wrap);
	      this.layout.wrap = wrap;
	      return this.layout.wrap;
	    }
	  }, {
	    key: "renderQuestionList",
	    value: function renderQuestionList() {
	      var _this2 = this,
	        _this$layout$question;
	      this.questionNumber = 1;
	      var wrap = main_core.Tag.render(_templateObject3$2 || (_templateObject3$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container\">\n\t\t\t", "\n\t\t</div>\n\t\t"])), this.questions.map(function (question) {
	        question.position = _this2.questionNumber++;
	        return question.render();
	      }));
	      (_this$layout$question = this.layout.questionList) === null || _this$layout$question === void 0 ? void 0 : _this$layout$question.replaceWith(wrap);
	      this.layout.questionList = wrap;
	      return this.layout.questionList;
	    }
	  }, {
	    key: "renderAddQuestionButton",
	    value: function renderAddQuestionButton() {
	      var wrap = main_core.Tag.render(_templateObject4$2 || (_templateObject4$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button type=\"button\" class=\"btn btn-primary mx-1\">+</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onAddQuestionButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onAddQuestionButtonClickHandler",
	    value: function onAddQuestionButtonClickHandler() {
	      this.questions.push(new Question(this.formData.Chapter[0].id, 1, null, this.questionNumber++, 'Название', [], this.fieldData));
	      this.renderQuestionList();
	    }
	  }, {
	    key: "renderSaveFormButton",
	    value: function renderSaveFormButton() {
	      var wrap = main_core.Tag.render(_templateObject5$2 || (_templateObject5$2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t\t"])));
	      main_core.Event.bind(wrap, 'click', this.onSaveFormButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onSaveFormButtonClickHandler",
	    value: function onSaveFormButtonClickHandler() {
	      var hardCodeChapter = this.formData.Chapter[0];
	      hardCodeChapter.Question = this.questions.map(function (question) {
	        return question.getData();
	      });
	      var form = {
	        'ID': this.id,
	        'Title': this.titleObject.value,
	        'Creator_ID': 1,
	        'chapters': [hardCodeChapter]
	      };
	      console.log(form);
	      FormManager.saveFormData({
	        formData: form
	      }).then(function (response) {
	        console.log(response);
	        BX.SidePanel.Instance.close();
	      })["catch"](function (error) {
	        console.log(error);
	      });
	    }
	  }, {
	    key: "renderEditableTitle",
	    value: function renderEditableTitle() {
	      var wrap = main_core.Tag.render(_templateObject6$1 || (_templateObject6$1 = babelHelpers.taggedTemplateLiteral(["\n\t\t<h1 class=\"text-center mt-5 mb-4\">", "</h1>\n\t\t"])), this.titleObject.value);
	      console.log(this.titleObject.value);
	      new EditableText(wrap, this.titleObject);
	      this.layout.title = wrap;
	      return this.layout.title;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {}
	  }]);
	  return Constructor;
	}();

	var _templateObject$4, _templateObject2$3, _templateObject3$3, _templateObject4$3, _templateObject5$3, _templateObject6$2;
	var Settings = /*#__PURE__*/function () {
	  function Settings(id) {
	    babelHelpers.classCallCheck(this, Settings);
	    this.id = id;
	    this.layout = {};
	  }
	  babelHelpers.createClass(Settings, [{
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject$4 || (_templateObject$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t<div class=\"container pt-3\">\n\t\t\t<div class=\"accordion\" id=\"settingsAccordion\">\n\t\t\t\t<div class=\"accordion-item\">\n\t\t\t\t\t<h2 class=\"accordion-header\" id=\"timeHeading\">\n\t\t\t\t\t\t<button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#timeCollapse\" aria-expanded=\"true\" aria-controls=\"timeCollapse\">\n\t\t\t\t\t\t\t\u0412\u0440\u0435\u043C\u044F\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</h2>\n\t\t\t\t\t<div id=\"timeCollapse\" class=\"accordion-collapse collapse show\" aria-labelledby=\"timeHeading\" data-bs-parent=\"#settingsAccordion\">\n\t\t\t\t\t\t<div class=\"accordion-body\">\n\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t<label class=\"form-label\">\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0442\u0435\u0441\u0442\u0443</label>\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t<label class=\"form-label\">\u0412\u0440\u0435\u043C\u044F \u043A\u043E\u043D\u0446\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0442\u0435\u0441\u0442\u0443</label>\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"mb-3\">\n\t\t\t\t\t\t\t\t<label class=\"form-label\">\u0422\u0430\u0439\u043C\u0435\u0440 \u043D\u0430 \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435</label>\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"container ms-3\">\n\t\t\t\t<div class=\"form-check mt-4\">\n\t\t\t\t\t", "\n\t\t\t\t\t<label class=\"form-check-label\" for=\"anonymousCheckbox\">\n\t\t\t\t\t\t\u0410\u043D\u043E\u043D\u0438\u043C\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"container mx-0 px-0\">\n\t\t\t\t\t<label class=\"form-label\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A</label>\n\t\t\t\t\t", "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t</div>"])), this.renderStartTime(), this.renderEndTime(), this.renderTimer(), this.renderAnonymous(), this.renderNumberOfTry());
	      return wrap;
	    }
	  }, {
	    key: "renderStartTime",
	    value: function renderStartTime() {
	      var wrap = main_core.Tag.render(_templateObject2$3 || (_templateObject2$3 = babelHelpers.taggedTemplateLiteral(["<input type=\"datetime-local\" class=\"form-control w-25\">"])));
	      this.layout.startTime = wrap;
	      return this.layout.startTime;
	    }
	  }, {
	    key: "renderEndTime",
	    value: function renderEndTime() {
	      var wrap = main_core.Tag.render(_templateObject3$3 || (_templateObject3$3 = babelHelpers.taggedTemplateLiteral(["<input type=\"datetime-local\" class=\"form-control w-25\">"])));
	      this.layout.endTime = wrap;
	      return this.layout.endTime;
	    }
	  }, {
	    key: "renderTimer",
	    value: function renderTimer() {
	      var wrap = main_core.Tag.render(_templateObject4$3 || (_templateObject4$3 = babelHelpers.taggedTemplateLiteral(["<input type=\"time\" class=\"form-control w-25\">"])));
	      this.layout.timer = wrap;
	      return this.layout.timer;
	    }
	  }, {
	    key: "renderAnonymous",
	    value: function renderAnonymous() {
	      var wrap = main_core.Tag.render(_templateObject5$3 || (_templateObject5$3 = babelHelpers.taggedTemplateLiteral(["<input class=\"form-check-input\" type=\"checkbox\">"])));
	      this.layout.anonymous = wrap;
	      return wrap;
	    }
	  }, {
	    key: "renderNumberOfTry",
	    value: function renderNumberOfTry() {
	      var wrap = main_core.Tag.render(_templateObject6$2 || (_templateObject6$2 = babelHelpers.taggedTemplateLiteral(["<input type=\"number\" class=\"form-control w-25\" min=\"1\" value=\"1\">"])));
	      this.layout.numberOfTry = wrap;
	      return wrap;
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      var data = {
	        'START_TIME': this.layout.startTime.value === '' ? null : this.layout.startTime.value,
	        'END_TIME': this.layout.endTime.value === '' ? null : this.layout.endTime.value,
	        'TIMER': this.layout.timer.value === '' ? null : this.layout.timer.value,
	        'ANONYMOUS': this.layout.anonymous.checked,
	        'NUMBER_OF_TRY': this.layout.numberOfTry.value
	      };
	      return data;
	    }
	  }]);
	  return Settings;
	}();

	var _templateObject$5, _templateObject2$4, _templateObject3$4, _templateObject4$4, _templateObject5$4;
	var FormConstructor = /*#__PURE__*/function () {
	  function FormConstructor() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, FormConstructor);
	    this.layout = {};
	    this.layout.wrap = options.container;
	    this.id = options.id;
	    if (!this.layout.wrap) {
	      throw new Error("TaskList: container is not found");
	    }
	    this.construct = new Constructor(this.id);
	    this.settings = new Settings(this.id);
	    this.layout.main = this.construct.render();
	    this.layout.wrap.append(this.renderHeader());
	    this.layout.wrap.append(this.layout.main);
	    this.layout.wrap.append(this.renderFooter());
	  }
	  babelHelpers.createClass(FormConstructor, [{
	    key: "renderHeader",
	    value: function renderHeader() {
	      var wrap = main_core.Tag.render(_templateObject$5 || (_templateObject$5 = babelHelpers.taggedTemplateLiteral(["\n\t\t<ul class=\"nav nav-tabs justify-content-center\" id=\"myTab\" role=\"tablist\">\n\t\t\t<li class=\"nav-item\">\n\t\t\t\t", "\n\t\t\t</li>\n\t\t\t<li class=\"nav-item\">\n\t\t\t\t", "\n\t\t\t</li>\n\t\t</ul>"])), this.renderConstructorTab(), this.renderSettingTab());
	      return wrap;
	    }
	  }, {
	    key: "renderConstructorTab",
	    value: function renderConstructorTab() {
	      var wrap = main_core.Tag.render(_templateObject2$4 || (_templateObject2$4 = babelHelpers.taggedTemplateLiteral(["<button class=\"nav-link active\" data-toggle=\"tab\" role=\"tab\">\u0412\u043E\u043F\u0440\u043E\u0441\u044B</button>"])));
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
	      var wrap = main_core.Tag.render(_templateObject3$4 || (_templateObject3$4 = babelHelpers.taggedTemplateLiteral(["<button class=\"nav-link\" data-toggle=\"tab\" role=\"tab\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</button>"])));
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
	      var wrap = main_core.Tag.render(_templateObject4$4 || (_templateObject4$4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t\t"])));
	      return this.renderSaveButton();
	    }
	  }, {
	    key: "renderSaveButton",
	    value: function renderSaveButton() {
	      var wrap = main_core.Tag.render(_templateObject5$4 || (_templateObject5$4 = babelHelpers.taggedTemplateLiteral(["<button class=\"btn btn-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>"])));
	      main_core.Event.bind(wrap, 'click', this.onSaveButtonClickHandler.bind(this));
	      return wrap;
	    }
	  }, {
	    key: "onSaveButtonClickHandler",
	    value: function onSaveButtonClickHandler() {
	      var data = {
	        'settings': this.settings.getData()
	      };
	      console.log(data);
	    }
	  }]);
	  return FormConstructor;
	}();

	exports.FormConstructor = FormConstructor;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
