import React, { Fragment } from 'react'
import type { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.74 includes Yoga 3.0, Bridgeless by default under the New Architecture, batched onLayout updates, Yarn 3, removal of previously deprecated PropTypes, and some breaking changes, including updates to PushNotificationIOS. The Android Minimum SDK is now 23 (Android 6.0).',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.74',
        url: 'https://reactnative.dev/blog/2024/04/22/release-0.74',
      },
    ],
  },
  comments: [
    {
      fileName: '.yarnrc',
      lineNumber: 3,
      lineChangeType: 'add',
      content: (
        <Fragment>
          In React Native 0.74, for projects bootstrapped with React Native
          Community CLI, we've added first-class support for modern Yarn
          versions. For new projects Yarn 3.6.4 is the default package manager,
          and for existing projects, you can upgrade to Yarn 3.6.4 by running
          `yarn set version berry` in the project root. Read more
          [here](https://reactnative.dev/blog/2024/04/22/release-0.74#yarn-3-for-new-projects).
        </Fragment>
      ),
    },
  ],
}

export default release
