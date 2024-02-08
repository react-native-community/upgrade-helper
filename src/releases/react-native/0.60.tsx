import React, { Fragment } from 'react'
import type { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.60 includes Cocoapods integration by default, AndroidX support, auto-linking libraries, a brand new Start screen and more.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.60',
        url: 'https://facebook.github.io/react-native/blog/2019/07/03/version-60',
      },
      {
        title: '[External] Tutorial on upgrading to React Native 0.60',
        url: 'https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.60/',
      },
    ],
  },
  comments: [
    {
      fileName: 'ios/Podfile',
      lineNumber: 4,
      lineChangeType: 'add',
      content: (
        <Fragment>
          All these libraries below have been removed from the Xcode project
          file and now live in the Podfile. Cocoapods handles the linking now.
          Here you can add more libraries with native modules.
        </Fragment>
      ),
    },
    {
      fileName: 'ios/RnDiffApp.xcodeproj/project.pbxproj',
      lineNumber: 9,
      lineChangeType: 'neutral',
      content: (
        <Fragment>
          Click
          [here](https://github.com/react-native-community/upgrade-support/issues/14)
          for an explanation and some help with upgrading this file.
        </Fragment>
      ),
    },
  ],
}
export default release
