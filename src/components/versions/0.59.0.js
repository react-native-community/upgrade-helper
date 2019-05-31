import React, { Fragment } from 'react'
import { INSTRUCTION_CATEGORIES, INSTRUCTION_PLATFORMS } from '../../utils'

export default {
  version: '0.59.0',
  reactVersion: '16.8.3',
  [INSTRUCTION_CATEGORIES.ADDED]: {
    [INSTRUCTION_PLATFORMS.ANDROID]: [
      {
        title: (
          <Fragment>
            *Text* and *TextInput* now have prop
            [maxFontSizeMultiplier](https://facebook.github.io/react-native/docs/text#maxfontsizemultiplier)
          </Fragment>
        )
      },
      {
        title: (
          <Fragment>
            *TextInput* now has prop
            [autoComplete](https://facebook.github.io/react-native/docs/textinput#autocomplete)
            prop
          </Fragment>
        )
      }
    ]
  },
  [INSTRUCTION_CATEGORIES.CHANGES]: {
    [INSTRUCTION_PLATFORMS.ANDROID]: [
      {
        title: <Fragment>Update Gradle from `3.3.0` to `3.3.1`</Fragment>,
        description: (
          <Fragment>
            Go to your app folder, open `./android/build.gradle`, search for
            `classpath 'com.android.tools.build:gradle:3.3.0'` and change to
            `classpath 'com.android.tools.build:gradle:3.3.1'`
          </Fragment>
        )
      }
    ]
  }
}
