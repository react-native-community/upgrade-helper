import React, { Fragment } from 'react'
import type { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.72 includes a new metro config setup and an updated process for the iOS privacy manifest, now required by Apple',
    links: [
      {
        title: 'Show about the major changes on React Native 0.72.0-rc.1',
        url: 'https://github.com/facebook/react-native/releases/tag/v0.72.0-rc.1',
      },
      {
        title: "Learn how to update your app's Apple privacy settings",
        url: 'https://github.com/react-native-community/discussions-and-proposals/discussions/776',
      },
    ],
  },
  comments: [
    {
      fileName: 'metro.config.js',
      lineNumber: 1,
      lineChangeType: 'add',
      content: (
        <Fragment>
          In React Native 0.72, we've changed the config loading setup for Metro
          in React Native CLI. The base React Native Metro config is now
          explicitly required and extended here in your project's Metro config
          file, giving you full control over the final config. In addition, this
          means that standalone Metro CLI commands, such as [`metro
          get-dependencies`](https://facebook.github.io/metro/docs/cli/#get-dependencies-entryfile)
          will work. We've also cleaned up the leftover defaults.
        </Fragment>
      ),
    },
  ],
}

export default release
