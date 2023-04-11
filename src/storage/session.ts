export function setSession(key: string, value: unknown) {
  sessionStorage.setItem(key, String(value));
}

export function getSession(key: string) {
  const json = sessionStorage.getItem(key);
  let data: string | null = null;
  if (json) {
    try {
      data = String(json);
    } catch {
      // 防止解析失败
    }
  }
  return data;
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key);
}

export function clearSession() {
  window.sessionStorage.clear();
}
