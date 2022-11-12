<p align="center">
  <img src="/src/assets/logo.svg" width="150" />
</p>

<h1 align="center">Upgrade Helper</h1>

<p align="center">
  A web tool to help you upgrade your React Native app with ease! 🚀
</p>

<p align="center">
  <a href="https://circleci.com/gh/react-native-community/upgrade-helper"><img src="https://circleci.com/gh/react-native-community/upgrade-helper.svg?style=shield" alt="CircleCI" title="CircleCI"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shield" alt="PRs Welcome" title="PRs Welcome"></a>
</p>

<p align="center">
  <a href="https://react-native-community.github.io/upgrade-helper">
    Open the tool!
  </a>
</p>

![Image showing a screenshot of Upgrade Helper with the phrase "You are gonna love this!"](https://user-images.githubusercontent.com/6207220/61382138-7a3a6780-a8ac-11e9-8c74-b4cb4830e131.png)

## ⚙️ How to use

https://www.youtube.com/watch?v=fmh_ZGHh_eg

## 🎩 How it works

The **Upgrade Helper** tool aims to provide the full set of changes happening between any two versions, based on the previous work done in the [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) project:

> This repository exposes an untouched React Native app generated with the CLI `react-native init RnDiffApp`. Each new React Native release causes a new project to be created, removing the old one, and getting a diff between them. This way, the diff is always clean, always in sync with the changes of the init template.

This will help you see what changes you need to do in your code.

Aside from this, the tool provides you a couple of cool extra features:

- inline comments to help you with more insights about precise files
- a set of links with further explanations on what the version you are upgrading to
- a handy "done" button near each file to help you keep track of your process
- a download button for new binary files
- the ability to toggle all files by holding the alt key and clicking on expand/collapse
- ...and we are planning many more features! Check the [enhancement tag](https://github.com/react-native-community/upgrade-helper/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Aenhancement) in the issue section.

## 💻 Contributing

If you want to help us making this better, you can start by forking the project and follow these steps to testing it out locally:

1. Clone the project
1. Run `yarn install`
1. Run `yarn start`
1. Open `http://localhost:3000`
1. Select starting & target versions
1. Click the `Show me how to upgrade` button

After which, you can create a branch to to make your changes and then open a PR against this repository following the provided template 🤗

## 📣 Acknowledgments

This project proudly uses [`rn-diff-purge`](https://github.com/react-native-community/rn-diff-purge), [`react-diff-view`](https://github.com/otakustay/react-diff-view) and [`create-react-app`](https://github.com/facebook/create-react-app).

## 📝 License

This project is released under the MIT license (check the LICENSE file for details).
