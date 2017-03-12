// @flow

import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

const LAST_STORAGE_CLEAN_DATE_KEY = 'LAST_CLEAN_DATE';
const CLEAR_INTERVAL_IN_DAYS = 7;

const makeKey = (str) => `GW2A:${str.toUpperCase()}`;

export function set (key: string, value: string) {
  const compressed = compressToUTF16(value);
  try {
    localStorage.setItem(makeKey(key), compressed);
  } catch (e) {
    // TODO: How do we want to handle local storage
    // being full? We could clear everything and
    // start over - but perhaps that's not right
    // to consumers using the embeds.
    console.error('Local storage is full!');
  }
}

export function get (key: string): ?string {
  const compressed = localStorage.getItem(makeKey(key));
  return decompressFromUTF16(compressed);
}

export function clear (key: string, clearKey?: string) {
  localStorage.removeItem(makeKey(key));
  if (clearKey) {
    set(clearKey, new Date().toString());
  }
}

export function clearIfPastStoreInterval (key: string) {
  const clearKey = `${LAST_STORAGE_CLEAN_DATE_KEY}:${key}`;
  const lastCleared = get(clearKey);
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

export function reset () {
  // Increment RESET_N when you need local storage to be
  // reset before the application bootstraps. Do this
  // cautiously, and varely rarely.
  const lsKey = 'RESET_1';
  if (!get(lsKey)) {
    localStorage.clear();
    set(lsKey, 'true');
  }
}
