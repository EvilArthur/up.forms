/* eslint-disable */
this.BX = this.BX || {};
this.BX.Up = this.BX.Up || {};
(function (exports,main_core) {
	'use strict';

	var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
	function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
	var FormList = /*#__PURE__*/function () {
	  function FormList() {
	    var _this = this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, FormList);
	    this.layout = {};
	    this.layout.wrap = options.container;
	    this.formList = [];
	    this.isLoading = true;
	    if (!this.layout.wrap) {
	      throw new Error("Forms: container is not found");
	    }
	    this.layout.wrap.append(this.render());
	    this.layout.wrap.append(this.renderFormTable());
	    this.loadFormsData();
	    BX.addCustomEvent('onPullEvent', function (module_id, command, params) {
	      if (command === 'update') {
	        _this.reload();
	      }
	    });
	    BX.PULL.extendWatch('FORMS-UPDATE');
	  }
	  babelHelpers.createClass(FormList, [{
	    key: "loadFormsData",
	    value: function () {
	      var _loadFormsData = babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) switch (_context.prev = _context.next) {
	            case 0:
	              _context.prev = 0;
	              _context.next = 3;
	              return this.loadList();
	            case 3:
	              this.formList = _context.sent;
	              this.isLoading = false;
	              this.layout.form = this.renderFormTable();
	              _context.next = 11;
	              break;
	            case 8:
	              _context.prev = 8;
	              _context.t0 = _context["catch"](0);
	              console.log(_context.t0);
	            case 11:
	            case "end":
	              return _context.stop();
	          }
	        }, _callee, this, [[0, 8]]);
	      }));
	      function loadFormsData() {
	        return _loadFormsData.apply(this, arguments);
	      }
	      return loadFormsData;
	    }()
	  }, {
	    key: "render",
	    value: function render() {
	      var wrap = main_core.Tag.render(_templateObject || (_templateObject = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<nav class=\"navbar navbar-expand-lg bg-body-tertiary mb-10\">\n\t\t\t\t<div class=\"container-fluid\">\n\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n\t\t\t\t\t\t<ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\n\t\t\t\t\t\t\t<div class=\"container-fluid justify-content-start\">\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<form class=\"d-flex\" role=\"search\">\n\t\t\t\t\t\t\t<input class=\"form-control me-2\" type=\"search\" placeholder=\"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u043E\u0440\u043C\u044B...\" aria-label=\"Search\">\n\t\t\t\t\t\t\t<button class=\"btn btn-outline-success\" type=\"submit\">\u041F\u043E\u0438\u0441\u043A</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</nav>"])), this.renderOpenCreateButton());
	      return wrap;
	    }
	  }, {
	    key: "renderFormTable",
	    value: function renderFormTable() {
	      var _this2 = this,
	        _this$layout$form;
	      var wrap;
	      if (this.isLoading) {
	        wrap = main_core.Tag.render(_templateObject2 || (_templateObject2 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<div class=\"container d-flex justify-content-center\">\n\t\t\t\t\t<div class=\"spinner-border\" style=\"width: 3rem; height: 3rem;\" role=\"status\">\n\t\t\t\t\t\t<span class=\"sr-only\"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t"])));
	      } else {
	        wrap = main_core.Tag.render(_templateObject3 || (_templateObject3 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t\t<table class=\"table\" id=\"form-list-app\">\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t", "\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t\t"])), this.formList.map(function (form) {
	          return _this2.renderForm(form);
	        }));
	      }
	      (_this$layout$form = this.layout.form) === null || _this$layout$form === void 0 ? void 0 : _this$layout$form.replaceWith(wrap);
	      this.layout.form = wrap;
	      return this.layout.form;
	    }
	  }, {
	    key: "renderForm",
	    value: function renderForm(form) {
	      return main_core.Tag.render(_templateObject4 || (_templateObject4 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<tr>\n\t\t\t\t<td class=\"align-middle\">", "</td>\n\t\t\t\t<td>", "</td>\n\t\t\t\t<td>", "</td>\n\t\t\t\t<td><button class=\"btn btn-info\">", "</button></td>\n\t\t\t\t<td>", "</td>\n\t\t\t</tr>\n\t\t\t"])), form.Title, this.renderOpenEditButton(form.ID), this.renderOpenFormButton(form.ID), main_core.Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_RESULTS'), this.renderDeleteButton(form.ID));
	    }
	  }, {
	    key: "renderOpenEditButton",
	    value: function renderOpenEditButton(formId) {
	      var _this3 = this;
	      var wrap = main_core.Tag.render(_templateObject5 || (_templateObject5 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-primary\">", "</button>\n\t\t\t"])), main_core.Loc.getMessage('UP_FORMS_FORM_LIST_EDIT'));
	      main_core.Event.bind(wrap, 'click', function () {
	        _this3.openSlider("/form/edit/".concat(formId, "/"));
	      });
	      return wrap;
	    }
	  }, {
	    key: "renderOpenCreateButton",
	    value: function renderOpenCreateButton() {
	      var _this4 = this;
	      var wrap = main_core.Tag.render(_templateObject6 || (_templateObject6 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-success\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0424\u043E\u0440\u043C\u0443</button>\n\t\t\t"])));
	      main_core.Event.bind(wrap, 'click', function () {
	        _this4.openSlider("/form/create/");
	      });
	      return wrap;
	    }
	  }, {
	    key: "renderOpenFormButton",
	    value: function renderOpenFormButton(formId) {
	      var _this5 = this;
	      var wrap = main_core.Tag.render(_templateObject7 || (_templateObject7 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<button class=\"btn btn-success\">", "</button>\n\t\t\t"])), main_core.Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_LINK'));
	      main_core.Event.bind(wrap, 'click', function () {
	        _this5.openSlider("/form/view/".concat(formId, "/"));
	      });
	      return wrap;
	    }
	  }, {
	    key: "renderDeleteButton",
	    value: function renderDeleteButton(formId) {
	      var _this6 = this;
	      var wrap = main_core.Tag.render(_templateObject8 || (_templateObject8 = babelHelpers.taggedTemplateLiteral(["\n\t\t\t<td><button class=\"btn btn-danger\">", "</button></td>\n\t\t\t"])), main_core.Loc.getMessage('UP_FORMS_FORM_LIST_PUBLIC_DELETE'));
	      main_core.Event.bind(wrap, 'click', function () {
	        _this6.onRemoveFormButtonClickHandler(formId);
	      });
	      return wrap;
	    }
	  }, {
	    key: "onRemoveFormButtonClickHandler",
	    value: function onRemoveFormButtonClickHandler(formId) {
	      var _this7 = this;
	      console.log(formId);
	      BX.ajax.runAction('up:forms.form.deleteForm', {
	        data: {
	          id: formId
	        }
	      }).then(function () {
	        return _this7.reload();
	      });
	    }
	  }, {
	    key: "loadList",
	    value: function loadList() {
	      return new Promise(function (resolve, reject) {
	        BX.ajax.runAction('up:forms.form.getList', {}).then(function (response) {
	          var formList = response.data.formList;
	          resolve(formList);
	        })["catch"](function (error) {
	          console.error(error);
	          reject(error);
	        });
	      });
	    }
	  }, {
	    key: "reload",
	    value: function reload() {
	      this.isLoading = true;
	      this.layout.form = this.renderFormTable();
	      this.loadFormsData();
	    }
	  }, {
	    key: "openSlider",
	    value: function openSlider(url) {
	      BX.SidePanel.Instance.open(url);
	    }
	  }]);
	  return FormList;
	}();

	exports.FormList = FormList;

}((this.BX.Up.Forms = this.BX.Up.Forms || {}),BX));
