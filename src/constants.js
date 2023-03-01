export const DEFAULT_APP_NAME = 'RnDiffApp'

export const PACKAGE_NAMES = {
  RN: 'react-native',
  RNM: 'react-native-macos',
  RNW: 'react-native-windows',
}

export const LANGUAGE_NAMES = {
  CPP: 'cpp',
  CS: 'cs',
}

export const RN_DIFF_REPOSITORIES = {
  [PACKAGE_NAMES.RN]: 'react-native-community/rn-diff-purge',
  [PACKAGE_NAMES.RNM]: 'acoates-ms/rnw-diff',
  [PACKAGE_NAMES.RNW]: 'acoates-ms/rnw-diff',
}

export const RN_CHANGELOG_URLS = {
  [PACKAGE_NAMES.RN]:
    'https://github.com/facebook/react-native/blob/main/CHANGELOG.md',
  [PACKAGE_NAMES.RNM]:
    'https://github.com/microsoft/react-native-macos/releases/tag/',
  [PACKAGE_NAMES.RNW]:
    'https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_',
}
