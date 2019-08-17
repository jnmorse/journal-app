const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  output: {
    path: path.resolve(__dirname, '../dist')
  }
};
