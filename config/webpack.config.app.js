const createConfig = require('./webpackConfigFactory');
const paths = require('./paths');

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
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-router-dom',
    ],
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
