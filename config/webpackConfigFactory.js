import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NameAllModulesPlugin from 'name-all-modules-plugin';
import assert from 'assert';
import ServiceWorkerPreCachePlugin from 'sw-precache-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import RollbarSourceMapPlugin from 'rollbar-sourcemap-webpack-plugin';
import _ from 'lodash';

import paths from './paths';
import config from '../src/config/default';
import manup from 'manup';
import manifest from '../src/manifest.json';
import pkg from '../package.json';

module.exports = ({
  entryPath,
  name,
  htmlWebpackPlugin,
  production,
  filename,
  serviceWorker,
  longTermCache,
  ...extra
}) => {
  assert(entryPath, 'entryPath should be defined in webpack factory');
  assert(name, 'name should be defined in webpack factory');

  let publicPath = '/';
  if (production && !process.env.LOCAL) {
    publicPath = process.env.TRAVIS_TAG
      ? 'https://gw2armory.com/'
      : 'https://preview.gw2armory.com/';
  }

  const cssRulesUse = production
    ? ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: true,
            importLoaders: '1',
            localIdentName: '[hash:base64:5]',
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        'less-loader',
      ],
    })
    : [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          importLoaders: '1',
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      'less-loader',
    ];

  return _.merge({}, {
    bail: production,

    context: __dirname,

    devtool: production ? 'source-map' : 'eval',

    entry: {
      [name]: production
        ? path.join(entryPath, 'index')
        : [
          require.resolve('webpack-dev-server/client'),
          require.resolve('webpack/hot/dev-server'),
          path.join(entryPath, 'index'),
        ],
    },

    output: {
      // Next line is not used in dev but WebpackDevServer crashes without it:
      path: paths.appBuild,
      pathinfo: true,
      filename: filename || (production ? '[name].[chunkhash:8].js' : '[name].js'),
      chunkFilename: production ? '[name]-chunk.[chunkhash:8].js' : '[name]-chunk.js',
      publicPath,
    },

    resolve: {
      modules: [
        path.resolve('./src'),
        'node_modules',
      ],

      extensions: ['.js', '.json'],
    },

    module: {
      strictExportPresence: true,

      rules: [
        {
          test: /\.js$/,
          include: paths.appSrc,
          loader: 'babel-loader',
        },
        {
          test: /\.(css|less)$/,
          include: [paths.appSrc, paths.appNodeModules],
          use: cssRulesUse,
        },
        {
          test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/, /\.svg$/, /\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
          include: [paths.appSrc, paths.appNodeModules],
          loader: 'file-loader',
          options: {
            name: production ? 'assets/[name].[hash:8].[ext]' : 'assets/[name].[ext]',
          },
        },
      ],
    },

    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),

      new webpack.ProvidePlugin({
        React: 'react',
      }),

      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),

      new HtmlWebpackPlugin({
        ...config,
        ...htmlWebpackPlugin,
        env: production ? 'production' : 'development',
        pwaMeta: manup(manifest),
        version: pkg.version,
        minify: production && {
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
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
        __DEVELOPMENT__: !production,
      }),

      !production && new webpack.HotModuleReplacementPlugin(),

      production && new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
          reduce_vars: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
        parallel: true,
      }),

      production && new ExtractTextPlugin({
        filename: 'assets/[name].[contenthash:8].css',
        allChunks: true,
      }),

      // Note that ServiceWorker plugin doesn't work with webpack dev server,
      // So we only run it in production mode.
      serviceWorker && new ServiceWorkerPreCachePlugin({
        cacheId: 'GW2Armory',
        filename: 'service-worker.js',
        minify: production,
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        navigateFallback: 'index.html',
        // Ignore any source map files and the asset manifest.
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/, /gw2aEmbeds\.js$/],
      }),

      production && process.env.ROLLBAR_POST && new RollbarSourceMapPlugin({
        accessToken: process.env.ROLLBAR_POST,
        version: pkg.version,
        // Rollbar can't have a trailing slash. Ends up creating
        // URLS like: //gw2armory.com//3-chunk.9a82d951.js
        publicPath: publicPath.slice(0, publicPath.length - 1),
      }),

      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      // See: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
      // >> Start longterm caching strategy.
      longTermCache && new webpack.NamedModulesPlugin(),

      longTermCache && new webpack.NamedChunksPlugin((chunk) => {
        return chunk.name
          ? chunk.name
          : chunk.modules.map((m) => path.relative(m.context, m.request)).join('_');
      }),

      longTermCache && new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),

      longTermCache && new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
      }),

      longTermCache && new NameAllModulesPlugin(),
      // >> End longterm caching strategy.

      // >> Perf plugins
      production && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ].filter(Boolean),

    performance: {
      hints: production ? 'warning' : false,
    },

  }, extra);
};
