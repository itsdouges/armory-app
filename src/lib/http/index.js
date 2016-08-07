import axios from 'axios';
import env from 'env';

export function setApiToken (token) {
  const id = axios.interceptors.request.use((config) => {
    if (config.url.indexOf(env.api.endpoint) >= 0) {
      /* eslint no-param-reassign:0 */
      config.headers.Authorization = token;
    }

    return config;
  });

  return () => axios.interceptors.request.eject(id);
}
