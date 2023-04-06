import React, { Fragment } from 'react'

export default {
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
