// @flow

import * as ls from 'lib/localStorage';

ls.reset();

// $FlowFixMe
const load = require('promise?global!./bootstrap'); // eslint-disable-line import/no-webpack-loader-syntax

function init () {
  load().then(({ default: bootstrap }) => bootstrap());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 1);
}
