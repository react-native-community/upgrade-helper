module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['react-app'],
  plugins: ['prettier', '@emotion'],
  rules: {
    'prettier/prettier': 'error',
    'jsx-a11y/accessible-emoji': 'off',
    'import/no-anonymous-default-export': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: ['src/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
}
