export function groupBy(arr: any[], generateKey: string | Function) {
  if (typeof generateKey === 'string') {
    const propName = generateKey;
    generateKey = (item: any) => item[propName];
  }
  const result: any = {};
  for (const item of arr) {
    const key = generateKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
