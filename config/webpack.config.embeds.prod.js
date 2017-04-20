import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import paths from './paths';
import config from '../src/config/default';

// As there is the potential for people to use the preview
// embeds, we need to set the public path to the preview
// environment if we're building the preview bundle.
// TRAVIS_TAG will be defined if we're deploying to production.
const publicPath = process.env.TRAVIS_TAG
  ? 'https://gw2armory.com/'
  : 'https://preview.gw2armory.com/';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    gw2aEmbeds: [path.join(paths.embedSrc, 'index')],
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    publicPath,
    filename: '[name].js',
    chunkFilename: '[name]-chunk-[chunkhash:8].js',
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.json'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: paths.appSrc,
      loader: 'babel',
    }, {
      test: /\.(css|less)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss!less'),
    }, {
      test: /\.json$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'json',
    }, {
      test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'file',
      query: {
        name: 'assets/[hash:8].[ext]',
      },
    }],
  },
  postcss () {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...config,
      inject: false,
      template: paths.embedsHtml,
      chunks: ['gw2aEmbeds'],
      filename: 'embeds/example/index.html',
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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEVELOPMENT__: false,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('assets/[name].[contenthash:8].css', {
      allChunks: true,
    }),
    new ManifestPlugin(),
  ],
};
