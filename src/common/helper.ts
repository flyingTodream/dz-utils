import { isEmpty, isObject } from './isTypes';

/**
 *
 * @param src
 * @param target
 * @returns
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  Object.keys(target).forEach((key: string) => {
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
export const downloadFile = (url: string, fileName?: string): void => {
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
export function formatStringToJson(string: string): void {
  if (isEmpty(string)) return null;
  try {
    const json = JSON.parse(string);
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
}
