// @flow

import * as ls from 'lib/localStorage';
import axios from 'axios';

ls.reset();

// $FlowFixMe
const loadBootstrap = require('promise?global!./bootstrap'); // eslint-disable-line import/no-webpack-loader-syntax

function appendStyle (src) {
  const style = document.createElement('link');
  style.href = `${__webpack_public_path__}${src}`;
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('type', 'text/css');
  document.head && document.head.appendChild(style);
}

function init () {
  loadBootstrap().then(({ default: bootstrap }) => bootstrap());
  axios
    .get(`${__webpack_public_path__}manifest.json`)
    .then((response) => appendStyle(response.data['gw2aEmbeds.css']));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 1);
}
