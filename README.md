# Upgrade Helper

[![CircleCI](https://circleci.com/gh/react-native-community/upgrade-helper.svg?style=shield)](https://circleci.com/gh/react-native-community/upgrade-helper)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Open the tool!](https://react-native-community.github.io/upgrade-helper)

A web tool to help you upgrading your React Native app with ease 🚀

![image](https://user-images.githubusercontent.com/6207220/59149165-90821780-8a12-11e9-97ef-d77c821f3bde.png)

## How it works

The **Upgrade Helper** tool aims to provide the full set of changes happening between any two versions, based on the previous work done in the [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) project:

> This repository exposes an untouched React Native app generated with the CLI `react-native init RnDiffApp`. Each new React Native release causes a new project to be created, removing the old one, and getting a diff between them. This way, the diff is always clean, always in sync with the changes of the init template.

This will help you see what changes you need to do in your code.

Aside from this, the tool provides you a couple of cool extra features:

- inline comments to help you with more insights about precise files
- a set of links with further explanations on what the version you are upgrading to
- a handy "done" button near each file to help you keep track of your process
- a download button for new binary files
- ...and we are planning many more features! Check the [enhancement tag](https://github.com/react-native-community/upgrade-helper/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Aenhancement) in the issue section.

## Contributing

If you want to help us making this better, you can start by forking the project and follow these steps to testing it out locally:

1. Clone the project
1. Run `yarn install`
1. Run `yarn start`
1. Open `http://localhost:3000`
1. Select starting & target versions
1. Click the `Show me how to upgrade` button

After which, you can create a branch to to make your changes and then open a PR against this repository following the provided template 🤗

## Acknowledgments

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## License

This project is released under the MIT license (check the LICENSE file for details).
