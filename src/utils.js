import semver from 'semver/preload'
import versions from './releases'

const RN_DIFF_REPO = 'react-native-community/rn-diff-purge'
const APP_NAME = 'RnDiffApp'

export const RELEASES_URL = `https://raw.githubusercontent.com/${RN_DIFF_REPO}/master/RELEASES`

export const getDiffPatchURL = ({ fromVersion, toVersion }) =>
  `https://raw.githubusercontent.com/${RN_DIFF_REPO}/diffs/diffs/${fromVersion}..${toVersion}.diff`

// `path` must contain `RnDiffApp` prefix
export const getBinaryFileURL = ({ version, path }) =>
  `https://github.com/${RN_DIFF_REPO}/raw/release/${version}/${path}`

export const removeAppPathPrefix = (path, appName) =>
  path.replace(new RegExp(`${appName || APP_NAME}/`), '')

export const getOriginalPath = (path, appName) =>
  appName.length ? path.replace(new RegExp(appName, 'g'), APP_NAME) : path

export const getVersionsInDiff = ({ fromVersion, toVersion }) => {
  const cleanedToVersion = semver.valid(semver.coerce(toVersion))

  return versions.filter(({ version }) => {
    const cleanedVersion = semver.coerce(version)

    // `cleanedVersion` can't be newer than `cleanedToVersion` nor older (or equal) than `fromVersion`
    return (
      semver.compare(cleanedToVersion, cleanedVersion) !== -1 &&
      ![0, -1].includes(semver.compare(cleanedVersion, fromVersion))
    )
  })
}

export const getChangelogURL = ({ version }) =>
  `https://github.com/react-native-community/releases/blob/master/CHANGELOG.md#${version.replace(
    '.',
    ''
  )}`

// settings constants
export const SHOW_LATEST_RCS = 'Show latest release candidates'
