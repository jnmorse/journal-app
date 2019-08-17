const webpackMerge = require('webpack-merge');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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

  optimization: {
    minimize: false,
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
    rules: [
      {
        test: /\.tsx?$/u,
        exclude: [/node_modules/u, /react-renderer\.ts/u],
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

  plugins: [new WebpackManifestPlugin()],

  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
});
