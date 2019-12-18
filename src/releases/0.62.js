import React, { Fragment } from 'react'

export default {
  usefulContent: {
    description:
      'React Native 0.62 includes built-in integration with Flipper.',
    links: []
  },
  comments: [
    {
      fileName: '.gitignore',
      lineNumber: 23,
      lineChangeType: 'add',
      content: (
        <Fragment>
          This line should not be here. Please ignore this. It will be removed
          on an upcoming release.
        </Fragment>
      )
    },
    {
      fileName:
        'ios/RnDiffApp.xcodeproj/xcshareddata/xcschemes/RnDiffApp.xcscheme',
      lineNumber: 0,
      lineChangeType: 'delete',
      content: (
        <Fragment>
          This file should not be deleted. The diff on this file is caused by
          `.gitignore`. It will be fixed in an upcoming release.
        </Fragment>
      )
    },
    {
      fileName:
        'ios/RnDiffApp.xcodeproj/xcshareddata/xcschemes/RnDiffApp-tvOS.xcscheme',
      lineNumber: 0,
      lineChangeType: 'delete',
      content: (
        <Fragment>
          This file should not be deleted. The diff on this file is caused by
          `.gitignore`. It will be fixed in an upcoming release.
        </Fragment>
      )
    }
  ]
}
