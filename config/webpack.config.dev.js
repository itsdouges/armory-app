import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// import { createEmbedEntryPoints, createEmbedPlugins } from './embedBuilders';
import paths from './paths';
import config from '../src/config/default';

module.exports = {
  devtool: 'eval',
  entry: {
    // ...createEmbedEntryPoints(),
    app: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.appSrc, 'index'),
    ],
    gw2aEmbed: [
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/dev-server'),
      path.join(paths.embedSrc, 'index'),
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
    root: path.resolve('./src'),
    extensions: ['', '.js', '.json'],
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: paths.appSrc,
    }],
    loaders: [{
      test: /\.js$/,
      include: paths.appSrc,
      loader: 'babel',
      query: require('./babel.dev'),
    }, {
      test: /\.(css|less)$/,
      include: [paths.appSrc, paths.appNodeModules],
      // eslint-disable-next-line
      loader: 'style!css?localIdentName=[path][name]--[local]--[hash:base64:5]&modules&importLoaders=1!postcss!less',
    }, {
      test: /\.json$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'json',
    }, {
      test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'file',
      query: {
        name: '[name]--[hash:8].[ext]',
      },
    }, {
      test: /\.(mp4|webm)$/,
      include: [paths.appSrc, paths.appNodeModules],
      loader: 'url?limit=10000',
    }],
  },
  eslint: {
    useEslintrc: true,
  },
  postcss () {
    return [autoprefixer];
  },
  plugins: [
    // ...createEmbedPlugins(),
    new HtmlWebpackPlugin({
      ...config,
      inject: true,
      template: paths.appHtml,
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      ...config,
      inject: true,
      template: paths.embedsHtml,
      filename: 'embeds/example/index.html',
      chunks: ['gw2aEmbed'],
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
