import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button, Popover } from 'antd'
import semver from 'semver/preload'
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

const ToVersionSelector = styled(({ popover, ...props }) =>
  popover ? (
    React.cloneElement(popover, {
      children: <Select {...props} />
    })
  ) : (
    <Select {...props} />
  )
)`
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
  // Parses `/?from=VERSION&to=VERSION` from URL
  const { from: fromVersion, to: toVersion } = queryString.parse(
    window.location.search
  )

  return {
    fromVersion,
    toVersion
  }
}

const compareReleaseCandidateVersions = ({ version, versionToCompare }) =>
  ['prepatch', null].includes(semver.diff(version, versionToCompare))

const getLatestMajorReleaseVersion = releasedVersions =>
  semver.valid(
    semver.coerce(
      releasedVersions.find(
        releasedVersion =>
          !semver.prerelease(releasedVersion) &&
          semver.patch(releasedVersion) === 0
      )
    )
  )

// Check if `from` rc version is one of the latest major release (ie. 0.60.0)
const checkLatestReleaseCandidate = ({ version, latestVersion }) =>
  semver.prerelease(version) &&
  compareReleaseCandidateVersions({
    version: latestVersion,
    versionToCompare: version
  })

// Filters out release candidates from `releasedVersion` with the
// exception of the release candidates from the latest version
const getReleasedVersionsWithCandidates = ({
  releasedVersions,
  toVersion,
  latestVersion,
  showReleaseCandidates
}) => {
  const isToVersionAReleaseCandidate = semver.prerelease(toVersion) !== null
  const isLatestAReleaseCandidate = semver.prerelease(latestVersion) !== null

  return releasedVersions.filter(releasedVersion => {
    // Show the release candidates of the latest version
    const isLatestReleaseCandidate =
      showReleaseCandidates &&
      checkLatestReleaseCandidate({
        version: releasedVersion,
        latestVersion
      })

    return (
      isLatestReleaseCandidate ||
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
  })
}

const getReleasedVersions = ({ releasedVersions, minVersion, maxVersion }) => {
  const latestMajorReleaseVersion = getLatestMajorReleaseVersion(
    releasedVersions
  )

  const isVersionAReleaseAndOfLatest = version =>
    version.includes('rc') &&
    semver.valid(semver.coerce(version)) === latestMajorReleaseVersion

  return releasedVersions
  return releasedVersions.filter(
    releasedVersion =>
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
  const pageURL = window.location.href.replace(window.location.search, '')
  const newURL = `?from=${fromVersion}&to=${toVersion}`

  window.history.replaceState(null, null, `${pageURL}${newURL}`)
}

const VersionSelector = ({ showDiff, showReleaseCandidates }) => {
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
      const sanitizedVersions = getReleasedVersionsWithCandidates({
        releasedVersions: allVersionsFromResponse,
        toVersion: toVersionToBeSet,
        latestVersion,
        showReleaseCandidates
      })

      setAllVersions(allVersionsFromResponse)

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
  }, [setLocalFromVersion, setLocalToVersion, showReleaseCandidates])

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
    hasVersionsFromURL,
    showReleaseCandidates
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
          title="To which version would you like to upgrade?"
          loading={isLoading}
          value={localToVersion}
          options={toVersionList}
          popover={
            localToVersion === '0.60.1' && (
              <Popover
                visible={true}
                placement="topLeft"
                content="We recommend using the latest 0.60 patch release instead of 0.60.1."
              />
            )
          }
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
