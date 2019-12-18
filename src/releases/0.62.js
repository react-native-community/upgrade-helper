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
          on an upcoming release. Because of this line, the files
          `ios/RnDiffApp.xcodeproj/xcshareddata/xcschemes/RnDiffApp.xcscheme`
          and
          `ios/RnDiffApp.xcodeproj/xcshareddata/xcschemes/RnDiffApp-tvOS.xcscheme`
          appear as deleted. They should not be deleted from your project.
          Ignore these two changes as well.
        </Fragment>
      )
    }
  ]
}
