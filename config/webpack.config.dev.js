import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';
import config from '../src/config/default';
import manup from 'manup';
import manifest from '../src/manifest.json';

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.appSrc, 'index'),
    ],
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: paths.appSrc,
      loader: 'babel-loader',
    }, {
      test: /\.(css|less)$/,
      include: [paths.appSrc, paths.appNodeModules],
      use: [
        'style-loader',
        'css-loader?localIdentName=[path][name]--[local]--[hash:base64:5]&modules&importLoaders=1',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer(),
            ],
          },
        },
        'less-loader',
      ],
    }, {
      test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'file-loader',
      query: {
        name: '[name]--[hash:8].[ext]',
      },
    }, {
      test: /\.(mp4|webm)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'url-loader?limit=10000',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...config,
      pwaMeta: manup(manifest),
      inject: true,
      template: paths.appHtml,
      chunks: ['app'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEVELOPMENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
