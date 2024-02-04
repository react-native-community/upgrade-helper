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
  justify-content: space-between;
  gap: 15px;

  @media ${deviceSizes.tablet} {
    flex-direction: row;
    gap: 0;
  }
`

const FromVersionSelector = styled(Select)`
  @media ${deviceSizes.tablet} {
    padding-right: 5px;
  }
`

interface ToVersionSelectorProps extends SelectProps {
  popover?: React.ReactNode
}

const ToVersionSelector = styled(
  ({ popover, ...props }: ToVersionSelectorProps) =>
    popover ? (
      React.cloneElement(popover, {
        children: <Select {...props} />,
      })
    ) : (
      <Select {...props} />
    )
)`
  @media ${deviceSizes.tablet} {
    padding-left: 5px;
  }
`

const getVersionsInURL = () => {
  // Parses `/?from=VERSION&to=VERSION` from URL
  const { from: fromVersion, to: toVersion } = queryString.parse(
    window.location.search
  )

  return {
    fromVersion,
    toVersion,
  }
}

// Users making changes to version should not retain anchor links
// to files that may or may not change.
const stripAnchorInUrl = () => {
  if (window.location.hash) {
    const url = new URL(window.location)
    url.hash = ''
    window.history.pushState({}, '', url)
  }
  return true
}

const compareReleaseCandidateVersions = ({ version, versionToCompare }) =>
  ['prerelease', 'prepatch', null].includes(
    semver.diff(version, versionToCompare)
  )

const getLatestMajorReleaseVersion = (releasedVersions) =>
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
const checkIfVersionIsALatestRC = ({ version, latestVersion }) =>
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

const getReleasedVersions = ({ releasedVersions, minVersion, maxVersion }) => {
  const latestMajorReleaseVersion =
    getLatestMajorReleaseVersion(releasedVersions)

  const isVersionAReleaseAndOfLatest = (version) =>
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
const getFirstMajorRelease = ({ releasedVersions, versionToCompare }) =>
  releasedVersions.find(
    (releasedVersion) =>
      semver.lt(releasedVersion, versionToCompare) &&
      semver.diff(
        semver.valid(semver.coerce(releasedVersion)),
        semver.valid(semver.coerce(versionToCompare))
      ) === 'minor'
  )

// Return if version exists in the ones returned from GitHub
const doesVersionExist = ({ version, allVersions, minVersion }) => {
  try {
    return (
      version &&
      allVersions.includes(version) &&
      // Also compare the version against a `minVersion`, this is used
      // to not allow the user to have a `fromVersion` newer than `toVersion`
      (!minVersion || (minVersion && semver.gt(version, minVersion)))
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
}) => {
  const { isLoading, isDone, releaseVersions } = useFetchReleaseVersions({
    packageName,
  })
  const [allVersions, setAllVersions] = useState([])
  const [fromVersionList, setFromVersionList] = useState([])
  const [toVersionList, setToVersionList] = useState([])
  const [hasVersionsFromURL, setHasVersionsFromURL] = useState(false)

  const [localFromVersion, setLocalFromVersion] = useState('')
  const [localToVersion, setLocalToVersion] = useState('')

  const upgradeButtonEl = useRef(null)

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
          })

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

      setHasVersionsFromURL(doesHaveVersionsInURL)
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
      upgradeButtonEl.current.click()
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
