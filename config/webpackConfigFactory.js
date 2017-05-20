import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import assert from 'assert';

import paths from './paths';
import config from '../src/config/default';
import manup from 'manup';
import manifest from '../src/manifest.json';

module.exports = ({ entry, name, htmlWebpackPlugin, publicPath = '/', production, filename }) => {
  assert(entry, 'entry should be defined in webpack factory');
  assert(name, 'name should be defined in webpack factory');

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
          },
        },
        'postcss-loader',
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
    ];

  return {
    devtool: production ? 'cheap-module-source-map' : 'eval',
    entry: {
      [name]: production
        ? path.join(entry, 'index')
        : [
          require.resolve('webpack-dev-server/client'),
          require.resolve('webpack/hot/dev-server'),
          path.join(entry, 'index'),
        ],
    },
    output: {
      // Next line is not used in dev but WebpackDevServer crashes without it:
      path: paths.appBuild,
      pathinfo: true,
      filename: filename || (production ? '[name]-[hash:8].js' : '[name].js'),
      chunkFilename: production ? '[name]-chunk-[chunkhash:8].js' : '[name]-chunk.js',
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
        use: cssRulesUse,
      }, {
        test: /\.(ico|jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'file-loader',
        query: {
          name: production ? 'assets/[name]--[hash:8].[ext]' : 'assets/[name].[ext]',
        },
      }, {
        test: /\.(mp4|webm)$/,
        include: [paths.appSrc, paths.appNodeModules],
        loader: 'url-loader?limit=10000',
      }],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),

      new HtmlWebpackPlugin({
        ...config,
        ...htmlWebpackPlugin,
        pwaMeta: manup(manifest),
        chunks: [name],
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
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),

      production && new ExtractTextPlugin({
        filename: 'assets/[name]--[contenthash:8].css',
        allChunks: true,
      }),
    ].filter(Boolean),
  };
};
