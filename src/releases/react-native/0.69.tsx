import React, { Fragment } from 'react'
import type { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.69 includes a bundled version of the Hermes engine',
    links: [
      {
        title: 'See here to learn more about bundled Hermes',
        url: 'https://reactnative.dev/architecture/bundled-hermes',
      },
    ],
  },
  comments: [
    {
      fileName: 'android/app/build.gradle',
      lineNumber: 280,
      lineChangeType: 'add',
      content: (
        <Fragment>
          These lines instruct Gradle to consume the bundled version of Hermes.
          For further information on Bundled Hermes and how this mechanism
          works, look
          [here](https://reactnative.dev/architecture/bundled-hermes).
        </Fragment>
      ),
    },
  ],
}

export default release
