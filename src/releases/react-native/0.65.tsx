import type { ReleaseT } from '../types'

const release: ReleaseT = {
  usefulContent: {
    description:
      'React Native 0.65 upgrades Hermes to 0.8.1, removes JCenter in favor of MavenCentral, upgrades OkHttp to v4, and adds Android Gradle Plugin 7 support. This version requires react-native-codegen 0.0.7 as a devDependency and includes over 1,100 commits from 61 contributors.',
    links: [
      {
        title:
          'Official blog post about the major changes on React Native 0.65',
        url: 'https://reactnative.dev/blog/2021/08/17/version-065',
      },
      {
        title: 'Hermes 0.8.1 release notes',
        url: 'https://github.com/facebook/hermes/releases/tag/v0.8.1',
      },
      {
        title: 'OkHttp v4 migration guide',
        url: 'https://square.github.io/okhttp/upgrading_to_okhttp_4/',
      },
    ],
  },
}

export default release
