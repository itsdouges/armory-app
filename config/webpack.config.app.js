import createConfig from './webpackConfigFactory';
import paths from './paths';

const common = {
  name: 'app',
  entryPath: paths.appSrc,
  htmlWebpackPlugin: {
    filename: 'index.html',
    template: paths.appHtml,
    inject: true,
  },
  entry: {
    vendor: [
      'react',
      'lodash',
      'moment',
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
