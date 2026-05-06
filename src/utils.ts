import semver from 'semver/preload'
import type { Change, File, Hunk } from 'gitdiff-parser'
import {
  RN_DIFF_REPOSITORIES,
  DEFAULT_APP_NAME,
  DEFAULT_APP_PACKAGE,
  PACKAGE_NAMES,
  RN_CHANGELOG_URLS,
} from './constants'
import versions from './releases'

const getRNDiffRepository = ({ packageName }: { packageName: string }) =>
  RN_DIFF_REPOSITORIES[packageName]

export const getReleasesFileURL = ({ packageName }: { packageName: string }) =>
  `https://raw.githubusercontent.com/${getRNDiffRepository({
    packageName,
  })}/master/${packageName === PACKAGE_NAMES.RNM ? 'RELEASES_MAC' : 'RELEASES'}`

export const getDiffURL = ({
  packageName,
  language,
  fromVersion,
  toVersion,
}: {
  packageName: string
  language: string
  fromVersion: string
  toVersion: string
}) => {
  const languageDir =
    packageName === PACKAGE_NAMES.RNM
      ? 'mac/'
      : packageName === PACKAGE_NAMES.RNW
      ? `${language}/`
      : ''

  return `https://raw.githubusercontent.com/${getRNDiffRepository({
    packageName,
  })}/diffs/diffs/${languageDir}${fromVersion}..${toVersion}.diff`
}

const getBranch = ({
  packageName,
  language,
  version,
}: {
  packageName: string
  language?: string
  version: string
}) =>
  packageName === PACKAGE_NAMES.RNM
    ? `mac/${version}`
    : packageName === PACKAGE_NAMES.RNW
    ? `${language}/${version}`
    : version

interface GetBinaryFileURLProps {
  packageName: string
  language?: string
  version: string
  path: string
}
// `path` must contain `RnDiffApp` prefix
export const getBinaryFileURL = ({
  packageName,
  language,
  version,
  path,
}: GetBinaryFileURLProps) => {
  const branch = getBranch({ packageName, language, version })

  return `https://raw.githubusercontent.com/${getRNDiffRepository({
    packageName,
  })}/release/${branch}/${path}`
}

export const removeAppPathPrefix = (path: string, appName = DEFAULT_APP_NAME) =>
  path.replace(new RegExp(`${appName}/`), '')

/**
 * Replaces DEFAULT_APP_PACKAGE and DEFAULT_APP_NAME in str with custom
 * values if provided.
 * str could be a path, or content from a text file.
 */
export const replaceAppDetails = (
  str: string,
  appName?: string,
  appPackage?: string
) => {
  const appNameOrFallback = appName || DEFAULT_APP_NAME
  const appPackageOrFallback =
    appPackage || `com.${appNameOrFallback.toLowerCase()}`

  return str
    .replaceAll(DEFAULT_APP_PACKAGE, appPackageOrFallback)
    .replaceAll(
      DEFAULT_APP_PACKAGE.replaceAll('.', '/'),
      appPackageOrFallback.replaceAll('.', '/')
    )
    .replaceAll(DEFAULT_APP_NAME, appNameOrFallback)
    .replaceAll(DEFAULT_APP_NAME.toLowerCase(), appNameOrFallback.toLowerCase())
}

export const getVersionsContentInDiff = ({
  packageName,
  fromVersion,
  toVersion,
}: {
  packageName: string
  fromVersion: string
  toVersion: string
}) => {
  if (!versions[packageName]) {
    return []
  }

  const cleanedToVersion = semver.valid(semver.coerce(toVersion))
  if (!cleanedToVersion) {
    return []
  }

  return versions[packageName].filter(({ version }) => {
    const cleanedVersion = semver.coerce(version)
    if (!cleanedVersion) {
      return false
    }

    // `cleanedVersion` can't be newer than `cleanedToVersion` nor older (or equal) than `fromVersion`
    return (
      semver.compare(cleanedToVersion, cleanedVersion) !== -1 &&
      ![0, -1].includes(semver.compare(cleanedVersion, fromVersion))
    )
  })
}

export const getChangelogURL = ({
  version,
  packageName,
}: {
  version: string
  packageName: string
}) => {
  if (packageName === PACKAGE_NAMES.RNW || packageName === PACKAGE_NAMES.RNM) {
    return `${RN_CHANGELOG_URLS[packageName]}v${version}`
  }

  return `${RN_CHANGELOG_URLS[packageName]}#v${version.replaceAll('.', '')}`
}

// If the browser is headless (running puppeteer) then it doesn't have any duration
export const getTransitionDuration = (duration: number) =>
  navigator.webdriver ? 0 : duration

// settings constants
export const SHOW_LATEST_RCS = 'Show latest release candidates'

/**
 * Returns the file paths to display for each side of the diff. Takes into account
 * custom app name and package, and truncates the leading app name to provide
 * paths relative to the project directory.
 */
export const getFilePathsToShow = ({
  oldPath,
  newPath,
  appName,
  appPackage,
}: {
  oldPath: string
  newPath: string
  appName?: string
  appPackage?: string
}) => {
  const oldPathSanitized = replaceAppDetails(oldPath, appName, appPackage)
  const newPathSanitized = replaceAppDetails(newPath, appName, appPackage)

  return {
    oldPath: removeAppPathPrefix(oldPathSanitized, appName),
    newPath: removeAppPathPrefix(newPathSanitized, appName),
  }
}

const isBinaryFile = (file: File) =>
  !!file.isBinary ||
  (file.hunks.length === 0 && !['rename', 'copy'].includes(file.type))

const isDeletedBinaryFile = (file: File) => {
  return (
    isBinaryFile(file) &&
    (file.type === 'delete' || file.newRevision === '000000')
  )
}

const NO_LINE_LEVEL_PATCH_MESSAGE =
  '- No line-level patch was included for this file.'

const serializeChange = ({
  change,
  appName,
  appPackage,
}: {
  change: Change
  appName?: string
  appPackage?: string
}) => {
  const prefix =
    change.type === 'insert' ? '+' : change.type === 'delete' ? '-' : ' '

  return `${prefix}${replaceAppDetails(change.content, appName, appPackage)}`
}

const serializeHunk = ({
  hunk,
  appName,
  appPackage,
}: {
  hunk: Hunk
  appName?: string
  appPackage?: string
}) =>
  [hunk.content]
    .concat(
      hunk.changes.map((change) =>
        serializeChange({ change, appName, appPackage })
      )
    )
    .join('\n')

const FILE_CHANGE_LABELS: Record<File['type'], string> = {
  add: 'Added',
  copy: 'Copied',
  delete: 'Deleted',
  modify: 'Modified',
  rename: 'Renamed',
}

export const buildAiUpgradePrompt = ({
  files,
  packageName,
  language,
  fromVersion,
  toVersion,
  appName,
  appPackage,
}: {
  files: File[]
  packageName: string
  language: string
  fromVersion: string
  toVersion: string
  appName?: string
  appPackage?: string
}) => {
  const effectiveAppName = appName || DEFAULT_APP_NAME
  const effectiveAppPackage =
    appPackage || `com.${effectiveAppName.toLowerCase()}`
  const binaryFiles = files.filter(isBinaryFile)
  const textFiles = files.filter((file) => !isBinaryFile(file))
  const binaryInstructions =
    binaryFiles.length > 0
      ? [
          '',
          '## Binary file handling',
          '- Binary files are listed separately because inline patch payloads are not useful here.',
          ...binaryFiles.flatMap((file) => {
            const localPaths = getFilePathsToShow({
              oldPath: file.oldPath,
              newPath: file.newPath,
              appName,
              appPackage,
            })
            const localPath = isDeletedBinaryFile(file)
              ? localPaths.oldPath
              : localPaths.newPath

            if (isDeletedBinaryFile(file)) {
              return [
                '',
                `### \`${localPath}\``,
                '- Remove this file from the target project if it still exists.',
              ]
            }

            const downloadURL = getBinaryFileURL({
              packageName,
              language,
              version: toVersion,
              path: file.newPath,
            })

            return [
              '',
              `### \`${localPath}\``,
              '```bash',
              `curl -L "${downloadURL}" -o "${localPath}"`,
              '```',
            ]
          }),
        ]
      : []
  const structuredFileChanges =
    textFiles.length > 0
      ? [
          '',
          '## File changes',
          ...textFiles.flatMap((file) => {
            const localPaths = getFilePathsToShow({
              oldPath: file.oldPath,
              newPath: file.newPath,
              appName,
              appPackage,
            })
            const localPath =
              file.type === 'delete' ? localPaths.oldPath : localPaths.newPath
            const fileChanges = [
              `### \`${localPath}\``,
              `- Change type: ${FILE_CHANGE_LABELS[file.type]}`,
            ]

            if (
              ['rename', 'copy'].includes(file.type) &&
              localPaths.oldPath !== localPaths.newPath
            ) {
              fileChanges.push(`- Previous path: \`${localPaths.oldPath}\``)
            }

            if (file.hunks.length > 0) {
              fileChanges.push(
                '```diff',
                file.hunks
                  .map((hunk) => serializeHunk({ hunk, appName, appPackage }))
                  .join('\n'),
                '```'
              )
            } else {
              fileChanges.push(NO_LINE_LEVEL_PATCH_MESSAGE)
            }

            return ['', ...fileChanges]
          }),
        ]
      : []

  return [
    '# React Native upgrade guidance request',
    '',
    'You are helping upgrade a React Native app using the provided template diff.',
    '',
    '## Task overview',
    `- From version: ${fromVersion}`,
    `- To version: ${toVersion}`,
    `- App name input or fallback: ${effectiveAppName}`,
    `- App package input or fallback: ${effectiveAppPackage}`,
    '',
    '## Important notes',
    '- Use the structured file changes below as the source of truth for parsed template changes.',
    '- This diff only represents the React Native bootstrap/template project between versions. First understand the current project structure and apply only the changes that are relevant to this codebase.',
    '- Preserve project-specific code and merge carefully instead of blindly overwriting files.',
    '- Review binary file changes separately if any are present.',
    '- The app name and app package values may be inaccurate because the user may have left them unchanged, blank, or approximate. Verify them against the real project before applying changes.',
    ...binaryInstructions,
    ...structuredFileChanges,
  ]
    .filter((line) => line !== undefined)
    .join('\n')
}
