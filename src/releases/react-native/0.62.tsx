import React, { Fragment } from 'react'
import { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.62 includes built-in integration with Flipper.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.62',
        url: 'https://reactnative.dev/blog/2020/03/26/version-0.62',
      },
      {
        title: '[External] Tutorial on upgrading to React Native 0.62',
        url: 'https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.62/',
      },
      {
        title:
          '[iOS] Tutorial on upgrading Xcode-related files to React Native 0.62',
        url: 'https://github.com/react-native-community/upgrade-helper/issues/191',
      },
    ],
  },
  comments: [
    {
      fileName: 'ios/RnDiffApp.xcodeproj/project.pbxproj',
      lineNumber: 19,
      lineChangeType: 'add',
      content: (
        <Fragment>
          Click
          [here](https://github.com/react-native-community/upgrade-support/issues/13)
          for an explanation and some help with upgrading this file.
        </Fragment>
      ),
    },
    {
      fileName: 'android/app/build.gradle',
      lineNumber: 81,
      lineChangeType: 'neutral',
      content: (
        <Fragment>
          If you are using Hermes Engine and ProGuard, make sure to update the
          rules in `proguard-rules.pro` to what is specified in the
          [documentation](https://reactnative.dev/docs/hermes) for `0.62`.
        </Fragment>
      ),
    },
  ],
}

export default release
