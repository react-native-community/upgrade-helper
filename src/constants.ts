export const DEFAULT_APP_NAME = 'RnDiffApp'
export const DEFAULT_APP_PACKAGE = 'com.rndiffapp'

export const FIRST_PRE_060_VERSION = '0.60'
export const FIRST_PRE_070_VERSION = '0.70'

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
