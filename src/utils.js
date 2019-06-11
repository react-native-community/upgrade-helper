import semver from 'semver'
import { versions } from './releases'

const RN_DIFF_REPO = 'react-native-community/rn-diff-purge'

const releasedVersions = versions.map(version => ({
  ...require(`./releases/${version}`).default,
  version
}))

export const RELEASES_URL = `https://raw.githubusercontent.com/${RN_DIFF_REPO}/master/RELEASES`

export const getDiffPatchURL = ({ fromVersion, toVersion }) =>
  `https://raw.githubusercontent.com/${RN_DIFF_REPO}/diffs/diffs/${fromVersion}..${toVersion}.diff`

export const removeAppPathPrefix = path => path.replace(/RnDiffApp\//, '')

export const getVersionsInDiff = ({ fromVersion, toVersion }) => {
  const cleanedToVersion = semver.valid(semver.coerce(toVersion))

  return releasedVersions.filter(
    ({ version }) =>
      semver.lte(version, cleanedToVersion) && semver.gt(version, fromVersion)
  )
}
