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
export function setLocal(
  key: string,
  value: unknown
  // expire: number | null = DEFAULT_CACHE_TIME
) {
  window.localStorage.setItem(key, String(value));
}

/**
 *
 * @param key
 * @returns
 */
export function getLocal<T>(key: string) {
  const json: unknown = window.localStorage.getItem(key);
  if (json) {
    return json as T;
  }
  return null;
}

/**
 *
 * @param key
 */
export function removeLocal(key: string) {
  window.localStorage.removeItem(key);
}

/**
 *
 */
export function clearLocal() {
  window.localStorage.clear();
}
