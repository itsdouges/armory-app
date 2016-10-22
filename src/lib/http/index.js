import axios from 'axios';
import env from 'config';

import * as lang from 'lib/i18n';

export function setApiToken (token) {
  const id = axios.interceptors.request.use((config) => {
    if (!config.ignoreAuth && config.url.indexOf(env.api.endpoint) >= 0) {
      /* eslint no-param-reassign:0 */
      config.headers.Authorization = token;
    }

    return config;
  });

  return () => axios.interceptors.request.eject(id);
}

// Set current language.
axios.interceptors.request.use((config) => {
  config.params = {
    lang: lang.get(),
  };

  return config;
});
