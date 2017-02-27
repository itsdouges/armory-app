import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../src/config/default';
import paths from './paths';

const createDevEntry = (name) => [
  require.resolve('webpack-dev-server/client'),
  require.resolve('webpack/hot/dev-server'),
  path.join(paths.embedSrc, name),
];

const createProdEntry = (name) => path.join(paths.embedSrc, name);

export const createEmbedEntry = (name, prod) => ({
  [name]: prod ? createProdEntry(name) : createDevEntry(name),
});

const htmlPluginProd = () => ({
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});

export const createEmbedHtml = (name, prod) =>
  new HtmlWebpackPlugin(({
    ...config,
    ...prod && htmlPluginProd(),
    inject: true,
    template: paths.appHtml,
    filename: `${config.embeds[name]}/index.html`,
    chunks: [name],
  }));

export const createEmbedEntryPoints = (prod) => Object.keys(config.embeds).reduce((obj, name) => ({
  ...obj,
  ...createEmbedEntry(name, prod),
}), {});

export const createEmbedPlugins = (prod) =>
  Object.keys(config.embeds).map((name) => createEmbedHtml(name, prod));
