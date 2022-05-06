import React from 'react'
import Markdown from './Markdown'

const DepCheckAlert = () => (
  <>
    <Markdown>
      You can use the following command to kick off the upgrade: `npx
      @rnx-kit/dep-check --set-version [major.minor]`.
    </Markdown>
    <br />
    <Markdown>
      `dep-check` is a tool by Microsoft that helps your dependencies
      management, aligning the main RN libraries on the version of RN used (find
      out more in the [dedicated
      documentation](https://microsoft.github.io/rnx-kit/docs/guides/dependency-management)).
    </Markdown>
    <br />
    <Markdown>
      You still need to do the other changes below and verify the changelogs of
      the libraries that got upgraded.
    </Markdown>
  </>
)

export default DepCheckAlert
