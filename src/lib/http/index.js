// @flow

import axios from 'axios';
import env from 'config';

import * as lang from 'lib/i18n';

// eslint-disable-next-line import/prefer-default-export
export function setApiToken (token: string): Function {
  const id = axios.interceptors.request.use((config) => {
    if (config.headers && config.authenticated && config.url.indexOf(env.api.endpoint) >= 0) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }

    return config;
  });

  return () => axios.interceptors.request.eject(id);
}

axios.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.params = {
    ...config.params,
    lang: lang.get(),
  };

  return config;
});
