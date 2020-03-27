import React, { Fragment } from 'react'

export default {
  usefulContent: {
    description:
      'React Native 0.62 includes built-in integration with Flipper.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.62',
        url: 'https://reactnative.dev/blog/2020/03/26/version-0.62'
      },
      {
        title:
          '[iOS] Tutorial on upgrading Xcode-related files to React Native 0.62',
        url:
          'https://github.com/react-native-community/upgrade-helper/issues/191'
      }
    ]
  },
  comments: [
    {
      fileName: 'ios/RnDiffApp.xcodeproj/project.pbxproj',
      lineNumber: 19,
      lineChangeType: 'add',
      content: (
        <Fragment>
          Click
          [here](https://github.com/react-native-community/upgrade-helper/issues/191)
          for an explanation and some help with upgrading this file.
        </Fragment>
      )
    }
  ]
}
