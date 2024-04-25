import { PACKAGE_NAMES } from '../constants'

const versionsWithContent = {
  [PACKAGE_NAMES.RN]: [
    '0.73',
    '0.74',
    '0.72',
    '0.71',
    '0.69',
    '0.68',
    '0.64',
    '0.62',
    '0.61',
    '0.60',
    '0.59',
    '0.58',
    '0.57',
  ],
  [PACKAGE_NAMES.RNM]: [],
  [PACKAGE_NAMES.RNW]: [],
}

const getReleaseVersionFiles = (packageName) =>
  versionsWithContent[packageName].map((version) => ({
    ...require(`./${packageName}/${version}`).default,
    version,
  }))

export default {
  [PACKAGE_NAMES.RN]: getReleaseVersionFiles(PACKAGE_NAMES.RN),
  [PACKAGE_NAMES.RNM]: getReleaseVersionFiles(PACKAGE_NAMES.RNM),
  [PACKAGE_NAMES.RNW]: getReleaseVersionFiles(PACKAGE_NAMES.RNW),
}
