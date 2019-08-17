const webpackMerge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const path = require('path');

const baseConfig = require('../base-config');

module.exports = webpackMerge(baseConfig, {
  name: 'server',
  target: 'node',

  externals: [webpackNodeExternals()],

  entry: path.resolve(__dirname, '../../src/server.ts'),

  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/u,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/u,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              limit: 8000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
});
