import React, { Fragment } from 'react'

export default {
  usefulContent: {
    description: 'This is a description of the useful content section.',
    links: [
      {
        title: 'Nice upgrade link',
        url: 'https://github.com/react-native-community/upgrade-helper'
      },
      {
        title: 'Another nice upgrade link',
        url: 'https://github.com/react-native-community/upgrade-helper/issues'
      }
    ]
  },
  comments: [
    {
      fileName: 'package.json',
      lineNumber: 22,
      lineChangeType: 'add',
      content: (
        <Fragment>
          This is a really **cool** change that you will love!
        </Fragment>
      )
    },
    {
      fileName: 'App.js',
      lineNumber: 19,
      lineChangeType: 'delete',
      content: (
        <Fragment>
          I don't even need to talk about this one, it's `A-M-A-Z-I-N-G`!
        </Fragment>
      )
    }
  ]
}
