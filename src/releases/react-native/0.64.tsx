import React, { Fragment } from 'react'
import { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.64 includes Hermes opt-in on iOS and React 17.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.64',
        url: 'https://reactnative.dev/blog/2021/03/12/version-0.64',
      },
    ],
  },
  comments: [
    {
      fileName: 'package.json',
      lineNumber: 14,
      lineChangeType: 'add',
      content: (
        <Fragment>
          If you have the `hermes-engine` dependency you need to upgrade to
          0.7.2 [see release
          here](https://github.com/facebook/hermes/releases/tag/v0.7.2) if you
          are on a previous version you might get crashes at boot on Android.
        </Fragment>
      ),
    },
  ],
}

export default release
