const { override, addBabelPreset } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addReactRefresh()
)
