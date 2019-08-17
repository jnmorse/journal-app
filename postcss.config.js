const autoprefixer = require('autoprefixer');
const fontMagician = require('postcss-font-magician');
const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    fontMagician({
      protocol: 'https:'
    }),
    autoprefixer(),
    postcssNormalize()
  ]
};
