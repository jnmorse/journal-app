const webpackMerge = require('webpack-merge');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

const baseConfig = require('../base-config');

module.exports = webpackMerge(baseConfig, {
  name: 'client',
  target: 'web',

  output: {
    libraryTarget: 'umd',
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        exclude: [/node_modules/u],
        use: ['babel-loader', 'react-hot-loader/webpack', 'ts-loader']
      },

      {
        test: /\.(png|jp(e*)g|svg)$/u,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              limit: 8000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [new WebpackManifestPlugin()]
});
