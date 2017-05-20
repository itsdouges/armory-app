import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import paths from './paths';
import config from '../src/config/default';
import ManifestPlugin from 'webpack-manifest-plugin';
import manup from 'manup';
import manifest from '../src/manifest.json';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.join(paths.appSrc, 'index'),
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: '[name]-[hash:8].js',
    publicPath: '/',
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
    }, {
      test: /\.(mp4|webm)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'url?limit=10000',
    }],
  },
  postcss () {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...config,
      inject: true,
      pwaMeta: manup(manifest),
      template: paths.appHtml,
      chunks: ['app'],
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
    new ExtractTextPlugin('assets/[name].[contenthash:8].css'),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      // dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      // logger (message) {
      //   if (message.indexOf('Total precache size is') === 0) {
      //     // This message occurs for every build and is a bit too noisy.
      //     return;
      //   }
      //   console.log(message);
      // },
      // minify: true,
      // navigateFallback: 'index.html',
      // staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
      // Work around Windows path issue in SWPrecacheWebpackPlugin:
      // https://github.com/facebookincubator/create-react-app/issues/2235
      // eslint-disable-next-line
      // stripPrefix: paths.appBuild.replace(/\\/g, '/') + '/',
    }),
  ],
};
