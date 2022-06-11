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
      `dep-check` is an OSS tool from Microsoft that automates dependency
      management. It knows which packages\* versions are compatible with your
      specific version of RN, and it uses that knowledge to align dependencies,
      keeping your app healthy and up-to-date\*\*. [Find out more
      here](https://microsoft.github.io/rnx-kit/docs/guides/dependency-management).
    </Markdown>
    <br />
    <Markdown>\* Not all packages are supported out-of-the-box.</Markdown>
    <br />
    <Markdown>
      \*\* You still need to do the other changes below and verify the
      changelogs of the libraries that got upgraded.
    </Markdown>
  </>
)

export default DepCheckAlert
