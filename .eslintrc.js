/* eslint-disable no-unused-vars */
const OFF = 0
const WARN = 1
const ERR = 2

module.exports = {
	root: true,
	extends: ['react-app','eslint:recommended', 'plugin:react/recommended'],
	plugins: ['react'],
	rules: {
		// stuff that prettier fails to do well
		// https://itnext.io/how-to-replace-prettier-by-eslint-rules-21574359e041
		'semi': [ERR, 'never'],
		'indent': [ERR, 'tab'],
		'quotes': [ERR, 'single'],
		// 'max-len': [WARN, { 'code': 80 }],
		'comma-dangle': [ERR, 'always-multiline'],
		'object-curly-spacing': [ERR, 'always'],
		'react/jsx-closing-bracket-location': [ERR, 'line-aligned'],

		'no-console': OFF,
		'no-multiple-empty-lines': [ERR ,  { max: 2, maxBOF: 0, maxEOF: 0 }],
	},
}
