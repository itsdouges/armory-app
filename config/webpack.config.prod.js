const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    path.join(paths.appSrc, 'index'),
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'bundle-[hash:8].js',
    publicPath: '/',
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.json'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: paths.appSrc,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel',
        query: require('./babel.prod'),
      },
      {
        test: /\.(css|less)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss!less'),
      },
      {
        test: /\.json$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'json',
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'file',
        query: {
          name: '/assets/[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'url?limit=10000',
      },
    ],
  },
  eslint: {
    useEslintrc: true,
  },
  postcss () {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon,
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
      __DATE__: `${new Date()}`,
      __SHORT_GIT_HASH__: '"local-build"',
      __DEVELOPMENT__: 'false',
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
  ],
};
