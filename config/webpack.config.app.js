import createConfig from './webpackConfigFactory';
import paths from './paths';

const common = {
  name: 'app',
  entry: paths.appSrc,
  htmlWebpackPlugin: {
    filename: 'index.html',
    template: paths.appHtml,
    inject: true,
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
