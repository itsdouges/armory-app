const createConfig = require('./webpackConfigFactory');
const paths = require('./paths');
const dependencies = require('../package.json').dependencies;

const ignoreDependencies = ['normalize.css', 'babel-polyfill'];

const common = {
  name: 'app',
  entryPath: paths.appSrc,
  longTermCache: true,
  htmlWebpackPlugin: {
    filename: 'index.html',
    template: paths.appHtml,
    inject: true,
  },
  entry: {
    vendor: Object.keys(dependencies).filter(dep => !ignoreDependencies.includes(dep)),
  },
};

module.exports = {
  development: createConfig(common),

  production: createConfig({
    ...common,
    production: true,
    serviceWorker: true,
  }),
};
