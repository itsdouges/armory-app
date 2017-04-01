import 'babel-polyfill';
import path from 'path';
import { addPath } from 'app-module-path';
import noop from 'lodash/noop';

global.React = require('react');

require('jsdom-global')();

addPath(path.join(__dirname, '..', ''));
addPath(path.join(__dirname, '..', '/src'));

['css', 'png', 'less'].forEach((extension) => {
  require.extensions[`.${extension}`] = noop;
});

global.chai = require('chai');
global.sinon = require('sinon');
global.expect = require('chai').expect;
global.AssertionError = require('chai').AssertionError;

global.chai.should();
global.chai.use(require('sinon-chai'));
global.chai.use(require('chai-enzyme')());
global.chai.use(require('chai-as-promised'));

const proxyquire = require('proxyquire').noCallThru();

global.proxyquire = (modulePath, stubs, disableDefaultAssignment, ...args) => {
  const module = proxyquire(modulePath, stubs, ...args);

  if (!disableDefaultAssignment && module.default) {
    return module.default;
  }

  return module;
};
