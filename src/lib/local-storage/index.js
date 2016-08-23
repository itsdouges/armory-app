const LAST_STORAGE_CLEAN_DATE_KEY = 'LAST_STORAGE_CLEAN_DATE';
const CLEAR_INTERVAL_IN_DAYS = 7;

export function clear (key, clearKey) {
  localStorage.removeItem(key);

  if (clearKey) localStorage.setItem(clearKey, new Date().toString());
}

export function clearIfPastStoreInterval (key) {
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

export function set (key, value) {
  localStorage.setItem(key, value);
}

export function get (key) {
  return localStorage.getItem(key);
}
