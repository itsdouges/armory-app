import createConfig from './webpackConfigFactory';
import paths from './paths';

const common = {
  name: 'gw2aEmbeds',
  entryPath: paths.embedSrc,
  htmlWebpackPlugin: {
    filename: 'embeds/example/index.html',
    inject: false,
    template: paths.embedsHtml,
  },
};

let productionPublicPath = '/';
if (!process.env.LOCAL) {
  productionPublicPath = process.env.TRAVIS_TAG
    ? 'https://gw2armory.com/'
    : 'https://preview.gw2armory.com/';
}

module.exports = {
  development: createConfig(common),

  production: createConfig({
    ...common,
    filename: '[name].js',
    publicPath: productionPublicPath,
    production: true,
  }),
};
