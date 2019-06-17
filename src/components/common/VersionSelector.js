import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import semver from 'semver'
import queryString from 'query-string'
import { RELEASES_URL } from '../../utils'
import { Select } from './'

const Selectors = styled.div`
  display: flex;
  justify-content: space-between;
`

const FromVersionSelector = styled(Select)`
  padding-right: 5px;
`

const ToVersionSelector = styled(Select)`
  padding-left: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  overflow: hidden;
  margin-top: 25px;
`

const getVersionsInURL = () => {
  if (window.location.search) {
    // Parses `/?from=VERSION&toVersion=VERSION` from URL
    const { from: fromVersion, to: toVersion } = queryString.parse(
      window.location.search
    )

    return {
      fromVersion,
      toVersion
    }
  }

  if (window.location.pathname) {
    // Parses `/VERSION...VERSION` from URL
    const [fromVersion, toVersion] = window.location.pathname
      .replace(/\//, '')
      .split('..')

    return {
      fromVersion,
      toVersion
    }
  }
}

// Compare versions by removing the `rc` from them, e.g. `0.60.0-rc.1` becomes `0.60.0`
const compareReleaseCandidateVersions = ({ version, versionToCompare }) =>
  semver.compare(
    semver.valid(semver.coerce(version)),
    semver.valid(semver.coerce(versionToCompare))
  ) === 0

// Filters out release candidates from `releasedVersion` with the exception of
// the release candidates from the latest version & target version that comes from the URL
// but only if any of them is a release candidate
const getReleasedVersionsWithoutCandidates = ({
  releasedVersions,
  toVersion,
  latestVersion
}) => {
  const isToVersionAReleaseCandidate = semver.prerelease(toVersion) !== null
  const isLatestAReleaseCandidate = semver.prerelease(latestVersion) !== null

  return releasedVersions.filter(
    releasedVersion =>
      semver.prerelease(releasedVersion) === null ||
      (isToVersionAReleaseCandidate &&
        compareReleaseCandidateVersions({
          version: toVersion,
          versionToCompare: releasedVersion
        })) ||
      (isLatestAReleaseCandidate &&
        compareReleaseCandidateVersions({
          version: latestVersion,
          versionToCompare: releasedVersion
        }))
  )
}

const getReleasedVersions = ({ releasedVersions, minVersion, maxVersion }) =>
  releasedVersions.filter(
    releasedVersion =>
      releasedVersion.length > 0 &&
      ((maxVersion && semver.lt(releasedVersion, maxVersion)) ||
        (minVersion && semver.gt(releasedVersion, minVersion)))
  )

// Finds the first minor release (which in react-native is the major) when compared to another version
const getFirstMajorRelease = ({ releasedVersions, versionToCompare }) =>
  releasedVersions.find(
    releasedVersion =>
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

const updateURLVersions = ({ fromVersion, toVersion }) => {
  const newURL = window.location.search
    ? `/?from=${fromVersion}&to=${toVersion}`
    : `/${fromVersion}..${toVersion}`

  window.history.replaceState(null, null, newURL)
}

const VersionSelector = ({ showDiff }) => {
  const [isLoading, setLoading] = useState(true)
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
      const response = await fetch(RELEASES_URL)

      const allVersionsFromResponse = (await response.text()).split('\n')

      // Check if the versions provided in the URL are valid
      const hasFromVersionInURL = doesVersionExist({
        version: versionsInURL.fromVersion,
        allVersions: allVersionsFromResponse
      })
      const hasToVersionInURL = doesVersionExist({
        version: versionsInURL.toVersion,
        allVersions: allVersionsFromResponse,
        minVersion: versionsInURL.fromVersion
      })

      const latestVersion = allVersionsFromResponse[0]
      // If the version from URL is not valid then fallback to the latest
      const toVersionToBeSet = hasToVersionInURL
        ? versionsInURL.toVersion
        : latestVersion

      // Remove `rc` versions from the array of versions
      const sanitizedVersions = getReleasedVersionsWithoutCandidates({
        releasedVersions: allVersionsFromResponse,
        toVersion: toVersionToBeSet,
        latestVersion
      })

      setAllVersions(sanitizedVersions)

      const fromVersionToBeSet = hasFromVersionInURL
        ? versionsInURL.fromVersion
        : // Get first major release before latest
          getFirstMajorRelease({
            releasedVersions: sanitizedVersions,
            versionToCompare: toVersionToBeSet
          })

      setFromVersionList(
        getReleasedVersions({
          releasedVersions: sanitizedVersions,
          maxVersion: toVersionToBeSet
        })
      )
      setToVersionList(
        getReleasedVersions({
          releasedVersions: sanitizedVersions,
          minVersion: fromVersionToBeSet
        })
      )
      setLocalFromVersion(fromVersionToBeSet)
      setLocalToVersion(toVersionToBeSet)

      setLoading(false)

      const doesHaveVersionsInURL = hasFromVersionInURL && hasToVersionInURL

      setHasVersionsFromURL(doesHaveVersionsInURL)

      if (doesHaveVersionsInURL) {
        upgradeButtonEl.current.props.onClick()
      }
    }

    fetchVersions()
  }, [setLocalFromVersion, setLocalToVersion])

  useEffect(() => {
    if (isLoading) {
      return
    }

    setFromVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        maxVersion: localToVersion
      })
    )
    setToVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        minVersion: localFromVersion
      })
    )
  }, [
    isLoading,
    allVersions,
    localFromVersion,
    localToVersion,
    hasVersionsFromURL
  ])

  const onShowDiff = ({ fromVersion, toVersion }) => {
    showDiff({
      fromVersion,
      toVersion
    })

    updateURLVersions({
      fromVersion: localFromVersion,
      toVersion: localToVersion
    })
  }

  return (
    <Fragment>
      <Selectors>
        <FromVersionSelector
          title="What's your current React Native version?"
          loading={isLoading}
          value={localFromVersion}
          options={fromVersionList}
          onChange={chosenVersion => setLocalFromVersion(chosenVersion)}
        />

        <ToVersionSelector
          title="To which version would you like to update?"
          loading={isLoading}
          value={localToVersion}
          options={toVersionList}
          onChange={chosenVersion => setLocalToVersion(chosenVersion)}
        />
      </Selectors>

      <ButtonContainer>
        <Button
          ref={upgradeButtonEl}
          type="primary"
          size="large"
          onClick={() =>
            onShowDiff({
              fromVersion: localFromVersion,
              toVersion: localToVersion
            })
          }
        >
          Show me how to upgrade!
        </Button>
      </ButtonContainer>
    </Fragment>
  )
}

export default VersionSelector
