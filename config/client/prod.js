const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = require('./common');
const { cssLoaders } = require('../css-loaders');

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  devtool: 'source-map',

  entry: [path.resolve(__dirname, '../../src/client/prod')],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /node_modules/u,
          name: 'vendor'
        }
      }
    }
  },

  module: {
    rules: [cssLoaders('production')]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFileName: 'css/[id].[hash:8].css'
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: true })
  ]
});
