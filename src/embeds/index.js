// @flow

// eslint-disable-next-line import/no-webpack-loader-syntax
const load = require('promise?global!./bootstrap');

document.addEventListener('DOMContentLoaded', () => {
  load().then(({ default: bootstrap }) => bootstrap());
});
