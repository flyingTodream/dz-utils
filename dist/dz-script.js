(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.dzUtils = {}));
}(this, (function (exports) { 'use strict';

  function animate(from, to, callBack, duration) {
      var start = performance.now();
      requestAnimationFrame(function animate(time) {
          var timeFraction = (time - start) / duration;
          if (timeFraction > 1)
              timeFraction = 1;
          callBack(from + (to - from) * timeFraction);
          if (timeFraction < 1) {
              requestAnimationFrame(animate);
          }
      });
  }

  function delay(time) {
      if (time === void 0) { time = 1000; }
      return new Promise(function (resolve) {
          setTimeout(resolve, time);
      });
  }

  function isTypes(value, type) {
      return Object.prototype.toString.call(value) === "[object ".concat(type, "]");
  }
  function isUndefined(value) {
      return isTypes(value, 'Undefined');
  }
  function isNull(value) {
      return isTypes(value, 'Null');
  }
  function isObject(value) {
      return isTypes(value, 'Object');
  }
  function isFunction(value) {
      return isTypes(value, 'Function');
  }
  function isArray(value) {
      return value && Array.isArray(value);
  }
  function isEmptyArray(value) {
      return Array.isArray(value) && value.length === 0;
  }
  function isEmptyObject(value) {
      return isObject(value) && Object.keys(value).length === 0;
  }
  function isEmpty(value) {
      return isNull(value) || isUndefined(value) || value === '' || isEmptyArray(value) || isEmptyObject(value);
  }
  function isString(value) {
      return isTypes(value, 'String');
  }
  function isNullOrUnDef(value) {
      return isUndefined(value) || isNull(value);
  }

  function deepMerge(src, target) {
      if (src === void 0) { src = {}; }
      if (target === void 0) { target = {}; }
      Object.keys(target).forEach(function (key) {
          src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
      });
      return src;
  }
  var downloadFile = function (url, fileName) {
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.download = fileName || '';
      link.href = url;
      link.click();
      setTimeout(function () { return document.body.removeChild(link); });
  };
  function formatStringToJson(string) {
      if (isEmpty(string))
          return null;
      try {
          var json = JSON.parse(string);
          return json;
      }
      catch (error) {
          throw new Error(error);
      }
  }

  function serialize(params) {
      var searchParams = new URLSearchParams('');
      Object.keys(params).forEach(function (k) {
          searchParams.append(k, params[k]);
      });
      return searchParams.toString();
  }

  var REGEXP_PHONE = /^[1](([3]\d)|([4][0-1,4-9])|([5][0-3,5-9])|([6][2,5-7])|([7][0-8])|([8]\d)|([9][0-3,5-9]))\d{8}$/;
  var REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  var REGEXP_PWD = /^(?!\d+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|\d){8,18}$/;
  var REGEXP_CODE_SIX = /^\d{6}$/;
  var REGEXP_CODE_FOUR = /^\d{4}$/;
  var REGEXP_URL = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  var REGEXP_IPV4 = /^(?:(?:2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(?:2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
  var REFEXP_IPV6 = /(^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$)|(^\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$)/i;

  function setLocal(key, value) {
      window.localStorage.setItem(key, String(value));
  }
  function getLocal(key) {
      var json = window.localStorage.getItem(key);
      if (json) {
          return json;
      }
      return null;
  }
  function removeLocal(key) {
      window.localStorage.removeItem(key);
  }
  function clearLocal() {
      window.localStorage.clear();
  }

  function setSession(key, value) {
      sessionStorage.setItem(key, String(value));
  }
  function getSession(key) {
      var json = sessionStorage.getItem(key);
      var data = null;
      if (json) {
          try {
              data = String(json);
          }
          catch (_a) {
          }
      }
      return data;
  }
  function removeSession(key) {
      window.sessionStorage.removeItem(key);
  }
  function clearSession() {
      window.sessionStorage.clear();
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function useUploadFile(executeUpload, onError) {
      var _this = this;
      if (typeof executeUpload !== 'function') {
          throw new Error('the firse param muse be a function');
      }
      if (onError && typeof onError !== 'function') {
          throw new Error('the secend param muse be a function');
      }
      var uploadFun = function () {
          var els = document.querySelectorAll('[data-id="upload"]');
          els.forEach(function (item) {
              item.remove();
          });
          var upload = document.createElement('input');
          upload.setAttribute('style', "display: none;");
          upload.setAttribute('data-id', 'upload');
          upload.setAttribute('type', 'file');
          document.body.appendChild(upload);
          upload.focus();
          upload.click();
          upload.addEventListener('change', function () { return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  if (upload.files) {
                      if (upload.files.length === 0)
                          onError('请选择文件');
                      executeUpload(upload.files[0]);
                      setTimeout(function () {
                          upload.remove();
                      }, 0);
                  }
                  return [2];
              });
          }); });
      };
      return {
          uploadFun: uploadFun
      };
  }
  function appendData(formData, data) {
      if (!data)
          return;
      Object.keys(data).forEach(function (key) {
          formData.append(key, data[key]);
      });
  }

  var version = '0.0.3';

  exports.REFEXP_IPV6 = REFEXP_IPV6;
  exports.REGEXP_CODE_FOUR = REGEXP_CODE_FOUR;
  exports.REGEXP_CODE_SIX = REGEXP_CODE_SIX;
  exports.REGEXP_EMAIL = REGEXP_EMAIL;
  exports.REGEXP_IPV4 = REGEXP_IPV4;
  exports.REGEXP_PHONE = REGEXP_PHONE;
  exports.REGEXP_PWD = REGEXP_PWD;
  exports.REGEXP_URL = REGEXP_URL;
  exports.animate = animate;
  exports.appendData = appendData;
  exports.clearLocal = clearLocal;
  exports.clearSession = clearSession;
  exports.deepMerge = deepMerge;
  exports.delay = delay;
  exports.downloadFile = downloadFile;
  exports.formatStringToJson = formatStringToJson;
  exports.getLocal = getLocal;
  exports.getSession = getSession;
  exports.isArray = isArray;
  exports.isEmpty = isEmpty;
  exports.isEmptyArray = isEmptyArray;
  exports.isEmptyObject = isEmptyObject;
  exports.isFunction = isFunction;
  exports.isNull = isNull;
  exports.isNullOrUnDef = isNullOrUnDef;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.removeLocal = removeLocal;
  exports.removeSession = removeSession;
  exports.serialize = serialize;
  exports.setLocal = setLocal;
  exports.setSession = setSession;
  exports.useUploadFile = useUploadFile;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
