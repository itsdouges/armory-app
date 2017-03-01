// @flow

// $FlowFixMe
const load = require('promise?global!./bootstrap'); // eslint-disable-line import/no-webpack-loader-syntax

document.addEventListener('DOMContentLoaded', () => {
  load().then(({ default: bootstrap }) => bootstrap());
});
