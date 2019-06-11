import semver from 'semver'
import { versions } from './releases'

const releasedVersions = versions.map(version => ({
  ...require(`./releases/${version}`).default,
  version
}))

export const RELEASES_URL =
  'https://raw.githubusercontent.com/react-native-community/rn-diff-purge/master/RELEASES'

export const removeAppPathPrefix = path => path.replace(/RnDiffApp\//, '')

export const getVersionsInDiff = ({ fromVersion, toVersion }) => {
  const cleanedToVersion = semver.valid(semver.coerce(toVersion))

  return releasedVersions.filter(
    ({ version }) =>
      semver.lte(version, cleanedToVersion) && semver.gt(version, fromVersion)
  )
}
