/* @jsx mdx */

import React from 'react'
import { mdx } from '@mdx-js/react'
import { inline } from 'inline-mdx.macro'

export default {
  usefulContent: {
    description:
      'React Native 0.60 includes CocoaPods integration by default, AndroidX support, auto-linking libraries, a brand new Start screen and more.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.60',
        url:
          'https://facebook.github.io/react-native/blog/2019/07/03/version-60'
      }
    ]
  },
  comments: [
    {
      fileName: 'ios/Podfile',
      lineNumber: 4,
      lineChangeType: 'add',
      content: inline`
        ~~strikethrough~~

        All these libraries below have been removed from the Xcode project
        file and now live in the Podfile. CocoaPods handles the linking now.
        Here you can add more libraries with native modules.
      `
    },
    {
      fileName: 'ios/RnDiffApp.xcodeproj/project.pbxproj',
      lineNumber: 9,
      lineChangeType: 'neutral',
      content: inline`
        ~~strikethrough~~

        Click [here](https://github.com/react-native-community/upgrade-helper/issues/47)
        for an explanation and some help with upgrading this file.
      `
    }
  ]
}
