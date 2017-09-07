// @flow

import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import axios from 'axios';
import config from 'config';

const GW2_BUILD_KEY = 'GW2_BUILD';
const CLEAR_LS_NEXT_LOAD_KEY = 'CLEAR_LS_NEXT_LOAD';

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

    // eslint-disable-next-line
    console.error('Local storage is full!');
  }
}

export function get (key: string): ?string {
  const compressed = localStorage.getItem(makeKey(key));
  return decompressFromUTF16(compressed);
}

export function clear (key: string) {
  localStorage.removeItem(makeKey(key));
}

export function clearIfNewBuild (key: string) {
  const shouldClearLs = get(CLEAR_LS_NEXT_LOAD_KEY) === 'true';
  if (shouldClearLs) {
    clear(key);
    clear(CLEAR_LS_NEXT_LOAD_KEY);
  }
}

export function initialise () {
  return axios.get(`${config.gw2.endpoint}v2/build`)
    .then(({ data }) => {
      const currentBuildId = `${data.id}`;
      const savedBuildId = get(GW2_BUILD_KEY);

      if (!savedBuildId) {
        set(GW2_BUILD_KEY, currentBuildId);
      } else if (currentBuildId !== savedBuildId) {
        set(GW2_BUILD_KEY, currentBuildId);
        set(CLEAR_LS_NEXT_LOAD_KEY, 'true');
      }
    });
}
