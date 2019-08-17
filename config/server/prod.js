const webpackMerge = require('webpack-merge');
const devConfig = require('./dev');

module.exports = webpackMerge(devConfig, {
  mode: 'production'
});
