const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const config = require('../src/config/default');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.appSrc, 'index'),
    ],
    character: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.embedSrc, 'character'),
    ],
    custom: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.embedSrc, 'custom'),
    ],
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    pathinfo: true,
    filename: '[name].js',
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
        query: require('./babel.dev'),
      },
      {
        test: /\.(css|less)$/,
        include: [paths.appSrc, paths.appNodeModules],
        // eslint-disable-next-line
        loader: 'style!css?localIdentName=[name]--[local]--[hash:base64:5]&modules&importLoaders=1!postcss!less',
      },
      {
        test: /\.json$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'json',
      },
      {
        test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'file',
        query: {
          name: '[name]--[hash:8].[ext]',
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
    new HtmlWebpackPlugin(Object.assign({
      inject: true,
      template: paths.appHtml,
      chunks: ['app'],
    }, config)),
    new HtmlWebpackPlugin(Object.assign({
      inject: true,
      template: paths.appHtml,
      filename: `${config.embedEndpoints.character}/index.html`,
      chunks: ['character'],
    }, config)),
    new HtmlWebpackPlugin(Object.assign({
      inject: true,
      template: paths.appHtml,
      filename: `${config.embedEndpoints.custom}/index.html`,
      chunks: ['custom'],
    }, config)),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DATE__: `${new Date()}`,
      __SHORT_GIT_HASH__: '"local-build"',
      __DEVELOPMENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
