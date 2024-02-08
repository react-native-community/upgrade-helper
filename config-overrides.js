const { override, addBabelPreset } = require('customize-cra')

const ignoreWarnings = (value) => (config) => {
  config.ignoreWarnings = value
  return config
}

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),

  // Ignore warnings about the react-diff-view sourcemap files.
  ignoreWarnings([/Failed to parse source map/])
)
