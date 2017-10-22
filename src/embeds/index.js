// @flow

import 'babel-polyfill';
import bootstrap from './bootstrap';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  setTimeout(bootstrap, 1);
}
