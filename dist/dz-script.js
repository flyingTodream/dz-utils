(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.dzUtils = {}));
}(this, (function (exports) { 'use strict';

  /**
   *
   * @param from 开始的值
   * @param to 结束的值
   * @param duration 动画执行时间
   * @param callBack 回调函数
   */
  function animate(from, to, callBack, duration) {
      let start = performance.now();
      requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1)
              timeFraction = 1;
          callBack(from + (to - from) * timeFraction);
          if (timeFraction < 1) {
              requestAnimationFrame(animate);
          }
      });
  }

  /**
   *
   * @param time 时间
   * @returns
   */
  function delay(time = 1000) {
      return new Promise((resolve) => {
          setTimeout(resolve, time);
      });
  }

  /*
   * @Descripttion: 判断值类型
   * @version:
   * @Author: 周正顺<zhou.zhengshun@h3c.com>
   * @Date: 2022-04-11 08:58:35
   * @LastEditors: Please set LastEditors
   * @LastEditTime: 2022-04-20 11:05:20
   */
  function isTypes(value, type) {
      return Object.prototype.toString.call(value) === `[object ${type}]`;
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

  /**
   *
   * @param src
   * @param target
   * @returns
   */
  function deepMerge(src = {}, target = {}) {
      Object.keys(target).forEach((key) => {
          // eslint-disable-next-line no-param-reassign
          src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
      });
      return src;
  }
  /**
   * 文件下载
   *
   * @param url 下载链接
   * @param fileName 下载文件名
   */
  const downloadFile = (url, fileName) => {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.download = fileName || '';
      link.href = url;
      link.click();
      setTimeout(() => document.body.removeChild(link));
  };
  /**
   *
   * @param string 要转换的字符串
   * @returns
   */
  function formatStringToJson(string) {
      if (isEmpty(string))
          return null;
      try {
          const json = JSON.parse(string);
          return json;
      }
      catch (error) {
          throw new Error(error);
      }
  }

  function serialize(params) {
      const searchParams = new URLSearchParams('');
      Object.keys(params).forEach((k) => {
          searchParams.append(k, params[k]);
      });
      return searchParams.toString();
  }

  /** 手机号码正则 */
  const REGEXP_PHONE = /^[1](([3]\d)|([4][0-1,4-9])|([5][0-3,5-9])|([6][2,5-7])|([7][0-8])|([8]\d)|([9][0-3,5-9]))\d{8}$/;
  /** 邮箱正则 */
  const REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  /** 密码正则(密码为8-18位数字/字符/符号的组合) */
  const REGEXP_PWD = /^(?!\d+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|\d){8,18}$/;
  /** 6位数字验证码正则 */
  const REGEXP_CODE_SIX = /^\d{6}$/;
  const REGEXP_CODE_FOUR = /^\d{4}$/;
  /** url链接正则 */
  const REGEXP_URL = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  const REGEXP_IPV4 = /^(?:(?:2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(?:2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
  const REFEXP_IPV6 = /(^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$)|(^\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$)/i;

  // interface StorageData {
  // 	value: unknown;
  // 	expire: number | null;
  // }
  /** 默认缓存期限为7天 */
  // const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
  /**
   *
   * @param key
   * @param value
   */
  function setLocal(key, value
  // expire: number | null = DEFAULT_CACHE_TIME
  ) {
      window.localStorage.setItem(key, String(value));
  }
  /**
   *
   * @param key
   * @returns
   */
  function getLocal(key) {
      const json = window.localStorage.getItem(key);
      if (json) {
          return json;
      }
      return null;
  }
  /**
   *
   * @param key
   */
  function removeLocal(key) {
      window.localStorage.removeItem(key);
  }
  /**
   *
   */
  function clearLocal() {
      window.localStorage.clear();
  }

  function setSession(key, value) {
      sessionStorage.setItem(key, String(value));
  }
  function getSession(key) {
      const json = sessionStorage.getItem(key);
      let data = null;
      if (json) {
          try {
              data = String(json);
          }
          catch (_a) {
              // 防止解析失败
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

  /**
   *
   * @param executeUpload 上传文件，发送请求
   * @param onError 错误回调
   * @returns
   */
  function useUploadFile(executeUpload, onError) {
      if (typeof executeUpload !== 'function') {
          throw new Error('the firse param muse be a function');
      }
      if (onError && typeof onError !== 'function') {
          throw new Error('the secend param muse be a function');
      }
      const uploadFun = () => {
          const els = document.querySelectorAll('[data-id="upload"]');
          els.forEach((item) => {
              item.remove();
          });
          const upload = document.createElement('input');
          upload.setAttribute('style', `display: none;`);
          upload.setAttribute('data-id', 'upload');
          upload.setAttribute('type', 'file');
          document.body.appendChild(upload);
          upload.focus();
          upload.click();
          upload.addEventListener('change', () => __awaiter(this, void 0, void 0, function* () {
              if (upload.files) {
                  if (upload.files.length === 0)
                      onError('请选择文件');
                  executeUpload(upload.files[0]);
                  setTimeout(() => {
                      upload.remove();
                  }, 0);
              }
          }));
      };
      return {
          uploadFun,
      };
  }
  /**
   * 组装请求数据
   * @param formData 要发送的FormData对象
   * @param data 要传递给服务器的数据
   * @returns
   */
  function appendData(formData, data) {
      if (!data)
          return;
      Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
      });
  }

  let sign_enum = {
      SIGN_END: 'SIGN_END',
      SIGN_END_OK: 'SIGN_EN_OK',
      SIGN_START: 'SIGN_START',
      SIGN_START_OK: 'SIGN_START_OK',
  };
  function htmlTransform(htmlStr) {
      const str = htmlStr.replace(/\n/g, '');
      let result = { nodeName: 'root', children: [] };
      let use_line = [0];
      let current_index = 0; // 记录当前插入children的下标
      let node = result; // 当前操作的节点
      let sign = ''; // 标记标签字符串（可能包含属性字符）、文本信息
      let status = ''; // 当前状态，为空的时候我们认为是在读取当前节点（node）的文本信息
      for (var i = 0; i < str.length; i++) {
          var current = str.charAt(i);
          var next = str.charAt(i + 1);
          if (current === '<') {
              // 在开始标签完成后记录文本信息到当前节点
              if (sign && status === sign_enum.SIGN_START_OK) {
                  node.text = sign;
                  sign = '';
              }
              // 根据“</”来区分是 结束标签的（</xxx>）读取中  还是开始的标签(<xxx>) 读取中
              if (next === '/') {
                  status = sign_enum.SIGN_END;
              }
              else {
                  status = sign_enum.SIGN_START;
              }
          }
          else if (current === '>') {
              // (<xxx>) 读取中，遇到“>”， (<xxx>) 读取中完成
              if (status === sign_enum.SIGN_START) {
                  // 记录当前node所在的位置，并更改node
                  node = result;
                  use_line.map((_, index) => {
                      if (!node.children)
                          node.children = [];
                      if (index === use_line.length - 1) {
                          sign = sign.replace(/^\s*/g, '').replace(/\"/g, '');
                          let mark = sign.match(/^[a-zA-Z0-9]*\s*/)[0].replace(/\s/g, ''); // 记录标签
                          // 标签上定义的属性获取
                          let attributeStr = sign.replace(mark, '').replace(/\s+/g, ',').split(',');
                          let attrbuteObj = {};
                          let style = {};
                          attributeStr.map((attr) => {
                              if (attr) {
                                  let value = attr.split('=')[1];
                                  let key = attr.split('=')[0];
                                  if (key === 'style') {
                                      value.split(';').map((s) => {
                                          if (s) {
                                              style[s.split(':')[0]] = s.split(':')[1];
                                          }
                                      });
                                      return (attrbuteObj[key] = style);
                                  }
                                  attrbuteObj[key] = value;
                              }
                          });
                          node.children.push(Object.assign({ nodeName: mark, children: [] }, attrbuteObj));
                      }
                      current_index = node.children.length - 1;
                      node = node.children[current_index];
                  });
                  use_line.push(current_index);
                  sign = '';
                  status = sign_enum.SIGN_START_OK;
              }
              // (</xxx>) 读取中，遇到“>”， (</xxx>) 读取中完成
              if (status === sign_enum.SIGN_END) {
                  use_line.pop();
                  node = result;
                  // 重新寻找操作的node
                  use_line.map((i) => {
                      var _a;
                      node = (_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a[i];
                  });
                  sign = '';
                  status = sign_enum.SIGN_END_OK;
              }
          }
          else {
              sign = sign + current;
          }
      }
      return result;
  }

  class updateWorkerjs {
      constructor(opt) {
          this.path = opt.path;
          this.pollingTime = opt.pollingTime || 15;
          this.myWork = undefined;
          this.scriptUrl = opt.scriptUrl;
          this.eventMap = new Map();
          this.eventMap.set('update', new Set());
          this.eventMap.set('close', new Set());
          this.createWorkerjs();
      }
      on(event, handler) {
          this.eventMap.get(event).add(handler);
      }
      off(event, handler) {
          this.eventMap.get(event).delete(handler);
      }
      emit(event) {
          this.eventMap.get(event).forEach((handler) => {
              handler(this, this);
          });
      }
      _error(err) {
          throw new Error(err);
      }
      _getHtmlObj() {
          return __awaiter(this, void 0, void 0, function* () {
              const res = yield fetch(window.location.origin, {
                  method: 'GET',
              });
              const data = yield res.text();
              return htmlTransform(data);
          });
      }
      _getCurrentHash(htmlObj) {
          for (const child of htmlObj.children) {
              if ((child === null || child === void 0 ? void 0 : child.nodeName) === 'script' && (child === null || child === void 0 ? void 0 : child.src)) {
                  return child.src;
              }
              // 递归查找子节点
              const result = this._getCurrentHash(child);
              if (result !== null) {
                  return result;
              }
          }
          return null;
      }
      _getScript() {
          return fetch(this.scriptUrl || 'https://static.flytodream.cn/dz-reload.js', { method: 'get' }).then((res) => res.text());
      }
      // 创建worker线程
      createWorkerjs() {
          return __awaiter(this, void 0, void 0, function* () {
              const htmlObj = yield this._getHtmlObj();
              const currentHash = this._getCurrentHash(htmlObj);
              if (window.Worker) {
                  const workjsTemplate = yield this._getScript();
                  const localWorkerUrl = window.URL.createObjectURL(new Blob([workjsTemplate], {
                      type: 'application/javascript',
                  }));
                  this.myWork = new Worker(localWorkerUrl);
                  this.myWork.postMessage({
                      pollingTime: this.pollingTime,
                      location: this.path || window.location.origin,
                      currentHash,
                  });
                  this.myWork.onmessage = (e) => __awaiter(this, void 0, void 0, function* () {
                      const message = e.data;
                      if (message === 'update') {
                          this.emit('update');
                          this.close();
                      }
                      else if (message === 'cancel') {
                          this._error('do not find a script tag');
                          this.close();
                      }
                  });
              }
              else {
                  this._error('Your browser does not support web workers.');
              }
          });
      }
      close() {
          if (this.myWork) {
              this.myWork.terminate();
              this.myWork = undefined;
              this.emit('close');
          }
      }
  }

  function groupBy(arr, generateKey) {
      if (typeof generateKey === 'string') {
          const propName = generateKey;
          generateKey = (item) => item[propName];
      }
      const result = {};
      for (const item of arr) {
          const key = generateKey(item);
          if (!result[key]) {
              result[key] = [];
          }
          result[key].push(item);
      }
      return result;
  }

  const version = '0.0.6';

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
  exports.groupBy = groupBy;
  exports.htmlTransform = htmlTransform;
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
  exports.updateWorkerjs = updateWorkerjs;
  exports.useUploadFile = useUploadFile;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
