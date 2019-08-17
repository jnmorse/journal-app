const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const commonConfig = require('./common');
const { cssLoaders } = require('../css-loaders');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../../src/client')
  ],

  module: {
    rules: [
      cssLoaders('development', {
        modules: {
          mode: 'local',
          localIdentName: '[name]__[local]__[hash:8]',
          context: path.resolve(__dirname, '../', 'src')
        }
      })
    ]
  },

  optimization: {
    minimize: false
  },

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template.html')
    })
  ]
});
