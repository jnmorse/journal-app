const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');

const config = require('./config/client/dev');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, {
  compress: true,
  hot: true,
  clientLogLevel: 'warn',
  contentBase: path.join(__dirname, 'dist'),
  publicPath: '/',
  watchOptions: {
    ignored: [/node_modules/]
  },
  historyApiFallback: {
    disableDotRule: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3010'
    }
  },
  open: true
});

devServer.listen(3000, '0.0.0.0', () => {
  console.log('App Running: http://localhost:3000/');
});
