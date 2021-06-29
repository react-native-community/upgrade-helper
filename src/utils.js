import semver from 'semver/preload'
import { RN_DIFF_REPOSITORIES, DEFAULT_APP_NAME } from './constants'
import versions from './releases'

const getRNDiffRepository = ({ packageName }) =>
  RN_DIFF_REPOSITORIES[packageName]

export const getReleasesFileURL = ({ packageName }) =>
  `https://raw.githubusercontent.com/${getRNDiffRepository({
    packageName
  })}/master/RELEASES`

export const getDiffURL = ({ packageName, fromVersion, toVersion }) =>
  `https://raw.githubusercontent.com/${getRNDiffRepository({
    packageName
  })}/diffs/diffs/${fromVersion}..${toVersion}.diff`

// `path` must contain `RnDiffApp` prefix
export const getBinaryFileURL = ({ packageName, version, path }) =>
  `https://github.com/${getRNDiffRepository({
    packageName
  })}/raw/release/${version}/${path}`

export const removeAppPathPrefix = (path, appName) =>
  path.replace(new RegExp(`${appName || DEFAULT_APP_NAME}/`), '')

export const replaceWithProvidedAppName = (path, appName) => {
  if (!appName) {
    return path
  }

  return path
    .replace(new RegExp(DEFAULT_APP_NAME, 'g'), appName)
    .replace(
      new RegExp(DEFAULT_APP_NAME.toLowerCase(), 'g'),
      appName.toLowerCase()
    )
}

export const getVersionsContentInDiff = ({
  packageName,
  fromVersion,
  toVersion
}) => {
  const cleanedToVersion = semver.valid(semver.coerce(toVersion))

  return versions[packageName].filter(({ version }) => {
    const cleanedVersion = semver.coerce(version)

    // `cleanedVersion` can't be newer than `cleanedToVersion` nor older (or equal) than `fromVersion`
    return (
      semver.compare(cleanedToVersion, cleanedVersion) !== -1 &&
      ![0, -1].includes(semver.compare(cleanedVersion, fromVersion))
    )
  })
}

const baseChangelogURL =
  'https://github.com/react-native-community/releases/blob/master/CHANGELOG.md'
export const getChangelogURL = ({ version }) =>
  `${baseChangelogURL}#v${version.replace('.', '')}0`

// settings constants
export const SHOW_LATEST_RCS = 'Show latest release candidates'

export const getFilePathsToShow = ({ oldPath, newPath, appName }) => {
  const oldPathSanitized = replaceWithProvidedAppName(oldPath, appName)
  const newPathSanitized = replaceWithProvidedAppName(newPath, appName)

  return {
    oldPath: removeAppPathPrefix(oldPathSanitized, appName),
    newPath: removeAppPathPrefix(newPathSanitized, appName)
  }
}
