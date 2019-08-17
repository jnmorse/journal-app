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
    minimize: true
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
