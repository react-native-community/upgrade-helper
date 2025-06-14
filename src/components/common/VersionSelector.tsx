import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Popover } from 'antd'
import semver from 'semver/preload'
import queryString from 'query-string'
import { Select } from '.'
import UpgradeButton from './UpgradeButton'
import { useFetchReleaseVersions } from '../../hooks/fetch-release-versions'
import { updateURL } from '../../utils/update-url'
import { deviceSizes } from '../../utils/device-sizes'
import type { SelectProps } from './Select'

export const testIDs = {
  fromVersionSelector: 'fromVersionSelector',
  toVersionSelector: 'toVersionSelector',
}

const Selectors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${deviceSizes.tablet} {
    flex-direction: row;
  }
`

const FromVersionSelector = styled(Select)``

interface ToVersionSelectorProps extends SelectProps {
  popover?: React.ReactNode
}

const ToVersionSelector = styled(
  ({ popover, ...props }: ToVersionSelectorProps) =>
    popover ? (
      // @ts-ignore-next-line
      React.cloneElement(popover, {
        children: <Select {...props} />,
      })
    ) : (
      <Select {...props} />
    )
)``

const getVersionsInURL = (): {
  fromVersion: string
  toVersion: string
} => {
  // Parses `/?from=VERSION&to=VERSION` from URL
  const { from: fromVersion, to: toVersion } = queryString.parse(
    window.location.search
  )

  return {
    fromVersion: fromVersion as string,
    toVersion: toVersion as string,
  }
}

// Users making changes to version should not retain anchor links
// to files that may or may not change.
const stripAnchorInUrl = () => {
  if (window.location.hash) {
    const url = new URL(window.location.toString())
    url.hash = ''
    window.history.pushState({}, '', url)
  }
  return true
}

const compareReleaseCandidateVersions = ({
  version,
  versionToCompare,
}: {
  version: string | semver.SemVer
  versionToCompare: string | semver.SemVer
}) =>
  ['prerelease', 'prepatch', null].includes(
    semver.diff(version, versionToCompare)
  )

const getLatestMajorReleaseVersion = (releasedVersions: string[]) =>
  semver.valid(
    semver.coerce(
      releasedVersions.find(
        (releasedVersion) =>
          !semver.prerelease(releasedVersion) &&
          semver.patch(releasedVersion) === 0
      )
    )
  )

// Check if `from` rc version is one of the latest major release (ie. 0.60.0)
const checkIfVersionIsALatestRC = ({
  version,
  latestVersion,
}: {
  version: string
  latestVersion: string
}) =>
  semver.prerelease(version) &&
  compareReleaseCandidateVersions({
    version: latestVersion,
    versionToCompare: version,
  })

// Filters out release candidates from `releasedVersion` with the
// exception of the release candidates from the latest version
const getReleasedVersionsWithCandidates = ({
  releasedVersions,
  toVersion,
  latestVersion,
  showReleaseCandidates,
}: {
  releasedVersions: string[]
  toVersion: string
  latestVersion: string
  showReleaseCandidates: boolean
}) => {
  const isToVersionAReleaseCandidate = semver.prerelease(toVersion) !== null
  const isLatestAReleaseCandidate = semver.prerelease(latestVersion) !== null

  return releasedVersions.filter((releasedVersion) => {
    // Show the release candidates of the latest version
    const isLatestReleaseCandidate =
      showReleaseCandidates &&
      checkIfVersionIsALatestRC({
        version: releasedVersion,
        latestVersion,
      })

    return (
      isLatestReleaseCandidate ||
      semver.prerelease(releasedVersion) === null ||
      (isToVersionAReleaseCandidate &&
        compareReleaseCandidateVersions({
          version: toVersion,
          versionToCompare: releasedVersion,
        })) ||
      (isLatestAReleaseCandidate &&
        compareReleaseCandidateVersions({
          version: latestVersion,
          versionToCompare: releasedVersion,
        }))
    )
  })
}

const getReleasedVersions = ({
  releasedVersions,
  minVersion,
  maxVersion,
}: {
  releasedVersions: string[]
  minVersion?: string
  maxVersion?: string
}): string[] => {
  const latestMajorReleaseVersion =
    getLatestMajorReleaseVersion(releasedVersions)

  const isVersionAReleaseAndOfLatest = (version: string) =>
    version.includes('rc') &&
    semver.valid(semver.coerce(version)) === latestMajorReleaseVersion

  return releasedVersions.filter(
    (releasedVersion) =>
      releasedVersion.length > 0 &&
      ((maxVersion && semver.lt(releasedVersion, maxVersion)) ||
        (minVersion &&
          semver.gt(releasedVersion, minVersion) &&
          !isVersionAReleaseAndOfLatest(releasedVersion)))
  )
}

// Finds the first minor release (which in react-native is the major) when compared to another version
const getFirstMajorRelease = ({
  releasedVersions,
  versionToCompare,
}: {
  releasedVersions: string[]
  versionToCompare: string
}) =>
  releasedVersions.find((releasedVersion) => {
    const releasedVersionValid = semver.valid(semver.coerce(releasedVersion))
    const versionToCompareValid = semver.valid(semver.coerce(versionToCompare))

    return (
      semver.lt(releasedVersion, versionToCompare) &&
      releasedVersionValid &&
      versionToCompareValid &&
      semver.diff(releasedVersionValid, versionToCompareValid) === 'minor'
    )
  })

// Return if version exists in the ones returned from GitHub
const doesVersionExist = ({
  version,
  allVersions,
  minVersion,
}: {
  version: string | null
  allVersions: string[]
  minVersion?: string
}): boolean => {
  try {
    if (version === null) {
      return false
    }

    return (
      allVersions.includes(version) &&
      (!minVersion || semver.gt(version, minVersion))
    )
  } catch (_error) {
    return false
  }
}

const VersionSelector = ({
  packageName,
  language,
  isPackageNameDefinedInURL,
  showDiff,
  showReleaseCandidates,
  appPackage,
  appName,
}: {
  packageName: string
  language: string
  isPackageNameDefinedInURL: boolean
  showDiff: (args: { fromVersion: string; toVersion: string }) => void
  showReleaseCandidates: boolean
  appPackage: string
  appName?: string
}) => {
  const { isLoading, isDone, releaseVersions } = useFetchReleaseVersions({
    packageName,
  })
  const [allVersions, setAllVersions] = useState<string[]>([])
  const [fromVersionList, setFromVersionList] = useState<string[]>([])
  const [toVersionList, setToVersionList] = useState<string[]>([])
  const [hasVersionsFromURL, setHasVersionsFromURL] = useState<boolean>(false)

  const [localFromVersion, setLocalFromVersion] = useState<string>('')
  const [localToVersion, setLocalToVersion] = useState<string>('')

  const upgradeButtonEl = useRef<HTMLElement>(null)

  useEffect(() => {
    const versionsInURL = getVersionsInURL()

    const fetchVersions = async () => {
      // Check if the versions provided in the URL are valid
      const hasFromVersionInURL = doesVersionExist({
        version: versionsInURL.fromVersion,
        allVersions: releaseVersions,
      })

      const hasToVersionInURL = doesVersionExist({
        version: versionsInURL.toVersion,
        allVersions: releaseVersions,
        minVersion: versionsInURL.fromVersion,
      })

      const latestVersion = releaseVersions[0]
      // If the version from URL is not valid then fallback to the latest
      const toVersionToBeSet = hasToVersionInURL
        ? versionsInURL.toVersion
        : latestVersion

      // Remove `rc` versions from the array of versions
      const sanitizedVersions = getReleasedVersionsWithCandidates({
        releasedVersions: releaseVersions,
        toVersion: toVersionToBeSet,
        latestVersion,
        showReleaseCandidates,
      })

      setAllVersions(sanitizedVersions)

      const fromVersionToBeSet = hasFromVersionInURL
        ? versionsInURL.fromVersion
        : // Get first major release before latest
          getFirstMajorRelease({
            releasedVersions: sanitizedVersions,
            versionToCompare: toVersionToBeSet,
          }) || sanitizedVersions[sanitizedVersions.length - 1] // Fallback to last version if no major release found

      setFromVersionList(
        getReleasedVersions({
          releasedVersions: sanitizedVersions,
          maxVersion: toVersionToBeSet,
        })
      )
      setToVersionList(
        getReleasedVersions({
          releasedVersions: sanitizedVersions,
          minVersion: fromVersionToBeSet,
        })
      )

      setLocalFromVersion(fromVersionToBeSet)
      setLocalToVersion(toVersionToBeSet)

      const doesHaveVersionsInURL = hasFromVersionInURL && hasToVersionInURL

      setHasVersionsFromURL(!!doesHaveVersionsInURL)
    }

    if (isDone) {
      fetchVersions()
    }
  }, [
    isDone,
    releaseVersions,
    setLocalFromVersion,
    setLocalToVersion,
    showReleaseCandidates,
  ])

  useEffect(() => {
    if (isLoading) {
      return
    }

    setFromVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        maxVersion: localToVersion,
      })
    )
    setToVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        minVersion: localFromVersion,
      })
    )

    if (hasVersionsFromURL) {
      upgradeButtonEl?.current?.click()
    }
  }, [
    isLoading,
    allVersions,
    localFromVersion,
    localToVersion,
    hasVersionsFromURL,
    showReleaseCandidates,
  ])

  const onShowDiff = () => {
    showDiff({
      fromVersion: localFromVersion,
      toVersion: localToVersion,
    })

    updateURL({
      packageName,
      language,
      isPackageNameDefinedInURL,
      fromVersion: localFromVersion,
      toVersion: localToVersion,
      appPackage,
      appName,
    })
  }

  return (
    <Fragment>
      <Selectors>
        <FromVersionSelector
          showSearch
          data-testid={testIDs.fromVersionSelector}
          title={`What's your current ${packageName} version?`}
          loading={isLoading}
          value={localFromVersion}
          options={fromVersionList}
          onChange={(chosenVersion) =>
            stripAnchorInUrl() && setLocalFromVersion(chosenVersion)
          }
        />

        <ToVersionSelector
          showSearch
          data-testid={testIDs.toVersionSelector}
          title="To which version would you like to upgrade?"
          loading={isLoading}
          value={localToVersion}
          options={toVersionList}
          popover={
            localToVersion === '0.60.1' && (
              <Popover
                open={true}
                placement="topLeft"
                content="We recommend using the latest 0.60 patch release instead of 0.60.1."
              />
            )
          }
          onChange={(chosenVersion) =>
            stripAnchorInUrl() && setLocalToVersion(chosenVersion)
          }
        />
      </Selectors>

      <UpgradeButton ref={upgradeButtonEl} onShowDiff={onShowDiff} />
    </Fragment>
  )
}

export default VersionSelector
