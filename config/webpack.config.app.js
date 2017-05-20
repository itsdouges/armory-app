import config from './webpackConfigFactory';
import paths from './paths';

const development = config({
  name: 'app',
  entry: paths.appSrc,
  htmlWebpackPlugin: {
    filename: 'index.html',
    template: paths.appHtml,
    inject: true,
  },
});

module.exports = {
  development,
};
