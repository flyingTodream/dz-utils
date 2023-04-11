/*
 * @Descripttion: 判断值类型
 * @version:
 * @Author: 周正顺<zhou.zhengshun@h3c.com>
 * @Date: 2022-04-11 08:58:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 11:05:20
 */

function isTypes(value: any, type: string): boolean {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

export function isUndefined(value: any): boolean {
  return isTypes(value, 'Undefined');
}

export function isNull(value: any): boolean {
  return isTypes(value, 'Null');
}

export function isObject(value: any): boolean {
  return isTypes(value, 'Object');
}

export function isFunction(value: any): boolean {
  return isTypes(value, 'Function');
}

export function isArray(value: any): value is Array<any> {
  return value && Array.isArray(value);
}

export function isEmptyArray(value: any) {
  return Array.isArray(value) && value.length === 0;
}

export function isEmptyObject(value: object): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}

export function isEmpty(value: any): boolean {
  return isNull(value) || isUndefined(value) || value === '' || isEmptyArray(value) || isEmptyObject(value);
}

export function isString(value: any): boolean {
  return isTypes(value, 'String');
}

export function isNullOrUnDef(value: any): boolean {
  return isUndefined(value) || isNull(value);
}
