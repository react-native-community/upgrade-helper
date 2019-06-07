export const INSTRUCTION_PLATFORMS = {
  IOS: 'iOS',
  ANDROID: 'Android'
}

export const INSTRUCTION_CATEGORIES = {
  ADDED: 'Added',
  WARNINGS: 'Warnings',
  CHANGES: 'Changes',
  BREAKING_CHANGES: 'Breaking Changes',
  TROUBLESHOOTING: 'Troubleshooting'
}

export const RELEASED_VERSIONS = ['0.59.0']

export const RELEASES_URL =
  'https://raw.githubusercontent.com/react-native-community/rn-diff-purge/master/RELEASES'

export const PACKAGE_MANAGERS = {
  yarn: {
    command: pkg => `yarn add ${pkg}`
  },
  npm: {
    command: pkg => `npm install ${pkg} --save`
  }
}
