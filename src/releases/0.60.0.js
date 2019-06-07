import React, { Fragment } from 'react'

export default {
  comments: [
    {
      fileName: 'package.json',
      lineNumber: 22,
      lineChangeType: 'add',
      content: (
        <Fragment>
          This change is a really **cool** change that you will love!
        </Fragment>
      )
    },
    {
      fileName: 'package.json',
      lineNumber: 12,
      lineChangeType: 'add',
      content: (
        <Fragment>
          This another change is a really *cool* change that you will love!
        </Fragment>
      )
    }
  ]
}
