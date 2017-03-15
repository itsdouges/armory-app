// @flow

// $FlowFixMe
const loadBootstrap = require('promise?global!./bootstrap'); // eslint-disable-line import/no-webpack-loader-syntax

function init () {
  loadBootstrap().then(({ default: bootstrap }) => bootstrap());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 1);
}
