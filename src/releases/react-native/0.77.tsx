import Markdown from '../../components/common/Markdown'
import type { ReleaseT } from '../types'
const release: ReleaseT = {
  usefulContent: {
    description: (
      <Markdown>
        React Native 0.77 changes the AppDelegate template from Obj-C++ to
        Swift, but it's not only a syntax change. If you stick with the
        `AppDelegate.mm` file, be sure to add the new line with
        `RCTAppDependencyProvider`, as explained in the blog post below.
      </Markdown>
    ),
    links: [
      {
        title: 'React Native 0.77 blog post',
        url: 'https://reactnative.dev/blog/2025/01/21/version-0.77#rctappdependencyprovider',
      },
    ],
  },
}

export default release
