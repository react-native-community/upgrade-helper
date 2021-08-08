module.exports = {
  extends: 'react-app',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'jsx-a11y/accessible-emoji': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
