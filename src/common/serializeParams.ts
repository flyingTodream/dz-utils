/*
 * @Description:序列化对象至查询参数字符串
 * @Author: 周文博<23956@h3c.com>
 * @Date: 2022-06-29 16:40:57
 * @LastEditors: 周文博<23956@h3c.com>
 * @LastEditTime: 2022-06-29 16:41:19
 */
export type ObjectType = { [key: string]: any };

export function serialize(params: ObjectType) {
  const searchParams = new URLSearchParams('');
  Object.keys(params).forEach((k: string) => {
    searchParams.append(k, params[k]);
  });
  return searchParams.toString();
}
