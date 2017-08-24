// @flow

import axios from 'axios';
import env from 'config';

import * as lang from 'lib/i18n';

// eslint-disable-next-line import/prefer-default-export
export function setApiToken (token: string): ?() => void {
  if (!token) {
    return null;
  }

  // $FlowFixMe - But why?
  const id = axios.interceptors.request.use((config) => {
    if (config.url.indexOf(env.api.endpoint) >= 0) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: token,
        },
      };
    }

    return config;
  });

  return () => axios.interceptors.request.eject(id);
}

axios.interceptors.request.use((config) => ({
  ...config,
  params: {
    ...config.params,
    lang: lang.get(),
  },
}));
