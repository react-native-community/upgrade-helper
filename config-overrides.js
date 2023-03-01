const { override, addBabelPreset } = require('customize-cra')

module.exports = override(addBabelPreset('@emotion/babel-preset-css-prop'))
