export const DEFAULT_APP_NAME = 'RnDiffApp'

export const PACKAGE_NAMES = {
  RN: 'react-native',
  RNW: 'react-native-windows'
}

export const LANGUAGE_NAMES = {
  CPP: 'cpp',
  CS: 'cs'
}

export const RN_DIFF_REPOSITORIES = {
  [PACKAGE_NAMES.RN]: 'react-native-community/rn-diff-purge',
  [PACKAGE_NAMES.RNW]: 'acoates-ms/rnw-diff'
}

export const RN_CHANGELOG_URLS = {
  [PACKAGE_NAMES.RN]:
    'https://github.com/react-native-community/releases/blob/master/CHANGELOG.md',
  [PACKAGE_NAMES.RNW]:
    'https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_'
}
