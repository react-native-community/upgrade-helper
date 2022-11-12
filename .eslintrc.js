module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "baseui"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"baseui/deprecated-theme-api": "warn",
		"baseui/deprecated-component-api": "warn",
		"baseui/no-deep-imports": "warn",
	},
}
