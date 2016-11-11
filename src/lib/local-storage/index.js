// @flow

const LAST_STORAGE_CLEAN_DATE_KEY = 'LAST_STORAGE_CLEAN_DATE';
const CLEAR_INTERVAL_IN_DAYS = 7;

export function clear (key: string, clearKey?: string) {
  localStorage.removeItem(key);

  if (clearKey) localStorage.setItem(clearKey, new Date().toString());
}

export function clearIfPastStoreInterval (key: string) {
  const clearKey = `${LAST_STORAGE_CLEAN_DATE_KEY}-${key}`;
  const lastCleared = localStorage.getItem(clearKey);
  if (!lastCleared) {
    clear(key, clearKey);
    return;
  }

  const today = new Date();
  const dateToClear = new Date(lastCleared);
  dateToClear.setDate(dateToClear.getDate() + CLEAR_INTERVAL_IN_DAYS);

  if (dateToClear <= today) {
    clear(key);
  }
}

export function set (key: string, value: string) {
  localStorage.setItem(key, value);
}

export function get (key: string): ?string {
  return localStorage.getItem(key);
}
