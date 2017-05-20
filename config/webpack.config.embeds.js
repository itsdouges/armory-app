import config from './webpackConfigFactory';
import paths from './paths';

const development = config({
  name: 'gw2aEmbeds',
  entry: paths.embedSrc,
  htmlWebpackPlugin: {
    filename: 'embeds/example/index.html',
    inject: false,
    template: paths.embedsHtml,
  },
});

module.exports = {
  development,
};
