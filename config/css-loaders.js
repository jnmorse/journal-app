const MiniCssExtractplugin = require('mini-css-extract-plugin');
const path = require('path');

exports.cssLoaders = env => {
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';

  return {
    test: /\.css$/u,
    exclude: /node_modules/u,
    use: [
      isDevelopment
        ? {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }
        : { loader: MiniCssExtractplugin.loader },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      }
    ].filter(Boolean)
  };
};
