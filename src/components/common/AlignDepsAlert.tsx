import React from 'react'
import Markdown from './Markdown'

const AlignDepsAlert = () => (
  <>
    <Markdown>
      **Diffs on `.xcodeproj/project.pbxproj` files**

      - If you see anything `pods` related, don't worry about it, you can skip it. If your `pod install` worked, then you should already have the diff you need in your repo for that file.
      - If there's anything that's not `pods` related, then usually we will have a note to tell you how to add/remove any files using the XCode UI. This happens *very* rarely.
      - Else, you can open an issue or a discussion with a specific line and question.

      With these, you should be good to go with these messy XCode files!
      
      Explainer video: https://youtu.be/fmh_ZGHh_eg?t=1368
    </Markdown>/>
    <br />
    <br />
    <Markdown>
      You can use the following command to kick off the upgrade: `npx
      @rnx-kit/align-deps --requirements react-native@[major.minor]`.
    </Markdown>
    <br />
    <br />
    <Markdown>
      [`align-deps`](https://microsoft.github.io/rnx-kit/docs/tools/align-deps)
      is an OSS tool from Microsoft that automates dependency management. It
      knows which packages\* versions are compatible with your specific version
      of RN, and it uses that knowledge to align dependencies, keeping your app
      healthy and up-to-date\*\*. [Find out more
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

export default AlignDepsAlert
