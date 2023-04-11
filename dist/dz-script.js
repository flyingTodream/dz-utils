(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.dzUtils = {}));
}(this, (function (exports) { 'use strict';

  function isTypes(value, type) {
      return Object.prototype.toString.call(value) === "[object " + type + "]";
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

  var version = '0.0.1';

  exports.REFEXP_IPV6 = REFEXP_IPV6;
  exports.REGEXP_CODE_FOUR = REGEXP_CODE_FOUR;
  exports.REGEXP_CODE_SIX = REGEXP_CODE_SIX;
  exports.REGEXP_EMAIL = REGEXP_EMAIL;
  exports.REGEXP_IPV4 = REGEXP_IPV4;
  exports.REGEXP_PHONE = REGEXP_PHONE;
  exports.REGEXP_PWD = REGEXP_PWD;
  exports.REGEXP_URL = REGEXP_URL;
  exports.clearLocal = clearLocal;
  exports.clearSession = clearSession;
  exports.deepMerge = deepMerge;
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
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
