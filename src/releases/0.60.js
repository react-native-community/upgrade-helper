import React, { Fragment } from 'react'

export default {
  usefulContent: {
    description:
      'React Native 0.60 includes Cocoapods integration by default, AndroidX support, auto-linking libraries, a brand new Start screen and more.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.59',
        url:
          'https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059'
      },
      {
        title: 'Tutorial on upgrading to React Native 0.59',
        url:
          'https://reactnative.thenativebits.com/courses/upgrading-react-native/upgrade-to-react-native-0.59/'
      }
    ],
  },
  comments: [
    {
      fileName: 'ios/Podfile',
      lineNumber: 4,
      lineChangeType: 'add',
      content: (
        <Fragment>
          All these libraries below have been removed from the Xcode project file and now live in the Podfile.
          Cocoapods handles the linking now.
        </Fragment>
        )
      },
    ],
  }
