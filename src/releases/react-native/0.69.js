import React, { Fragment } from 'react'

export default {
  usefulContent: {
    description:
      'React Native 0.69 includes a bundled version of the Hermes engine',
    links: [
      {
        title: 'See here to learn more about bundled Hermes',
        url: 'https://reactnative.dev/architecture/bundled-hermes'
      }
    ]
  },
  comments: [
    {
      fileName: 'android/app/build.gradle',
      lineNumber: '280',
      lineChangeType: 'add',
      content: (
        <Fragment>
          These lines instruct Gradle to build hermes from source. For further
          information on bundled Hermes, look
          <a href="https://reactnative.dev/architecture/bundled-hermes">here</a>
        </Fragment>
      )
    }
  ]
}
