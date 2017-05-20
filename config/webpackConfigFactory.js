import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import paths from './paths';
import config from '../src/config/default';
import manup from 'manup';
import manifest from '../src/manifest.json';

module.exports = ({ entry, name, htmlWebpackPlugin, publicPath = '/' }) => ({
  devtool: 'eval',
  entry: {
    [name]: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(entry, 'index'),
    ],
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
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
    rules: [{
      test: /\.js$/,
      include: paths.appSrc,
      loader: 'babel-loader',
    }, {
      test: /\.(css|less)$/,
      include: [paths.appSrc, paths.appNodeModules],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]--[local]--[hash:base64:5]',
            importLoaders: '1',
          },
        },
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
      ...htmlWebpackPlugin,
      pwaMeta: manup(manifest),
      chunks: [name],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEVELOPMENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
  ],
});
