import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import paths from './paths';
import config from '../src/config/default';

module.exports = {
  devtool: 'eval',
  entry: {
    gw2aEmbeds: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.embedSrc, 'index'),
    ],
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
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
      query: require('./babel.dev'),
    }, {
      test: /\.(css|less)$/,
      include: [paths.appSrc, paths.appNodeModules],
      // eslint-disable-next-line
      loader: ExtractTextPlugin.extract('style', 'css?localIdentName=[path][name]--[local]--[hash:base64:5]&modules&importLoaders=1!postcss!less'),
    }, {
      test: /\.json$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'json',
    }, {
      test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'file',
      query: {
        name: '[name].[ext]',
      },
    }],
  },
  eslint: {
    useEslintrc: true,
  },
  postcss () {
    return [autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...config,
      inject: false,
      template: paths.embedsHtml,
      filename: 'embeds/example/index.html',
      chunks: ['gw2aEmbeds'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEVELOPMENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ExtractTextPlugin('assets/[name].css', {
      allChunks: true,
    }),
    new ManifestPlugin(),
  ],
};
