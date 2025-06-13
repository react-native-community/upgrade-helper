import type { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      "React Native 0.76 enables the New Architecture by default, which is a significant architectural change. This version includes over 1,491 commits from 165 contributors and introduces important changes that may affect your app's compatibility. Make sure to thoroughly test your application and review the New Architecture documentation.",
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.76',
        url: 'https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture',
      },
      {
        title: 'New Architecture documentation',
        url: 'https://reactnative.dev/docs/the-new-architecture/landing-page',
      },
    ],
  },
}

export default release
