import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import semver from 'semver'
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

// Filters out release candidates from `releasedVersion` with the exception of
// the release candidates from the latest version only if the latest is a release candidate itself
const getReleasedVersionsWithoutCandidates = ({
  releasedVersions,
  toVersion
}) => {
  const isLatestAReleaseCandidate = semver.prerelease(toVersion) !== null
  const cleanedToVersion = semver.valid(semver.coerce(toVersion))

  return releasedVersions.filter(
    releasedVersion =>
      semver.prerelease(releasedVersion) === null ||
      (isLatestAReleaseCandidate &&
        semver.compare(
          cleanedToVersion,
          semver.valid(semver.coerce(releasedVersion))
        ) === 0)
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
      semver.diff(
        semver.valid(semver.coerce(releasedVersion)),
        semver.valid(semver.coerce(versionToCompare))
      ) === 'minor'
  )

const VersionSelector = ({
  fromVersion,
  toVersion,
  setFromVersion,
  setToVersion
}) => {
  const [isLoading, setLoading] = useState(true)
  const [allVersions, setAllVersions] = useState([])
  const [fromVersionList, setFromVersionList] = useState([])
  const [toVersionList, setToVersionList] = useState([])

  useEffect(() => {
    const fetchVersions = async () => {
      const response = await fetch(RELEASES_URL)

      const allVersionsFromResponse = (await response.text()).split('\n')

      allVersionsFromResponse.unshift('0.60.0-rc.2')
      allVersionsFromResponse.unshift('0.60.0-rc.3')

      const toVersionToBeSet = allVersionsFromResponse[0]

      // Remove `rc` versions from array
      const sanitizedVersions = getReleasedVersionsWithoutCandidates({
        releasedVersions: allVersionsFromResponse,
        toVersion: toVersionToBeSet
      })

      setAllVersions(sanitizedVersions)

      // Get first major release before latest
      const fromVersion = getFirstMajorRelease({
        releasedVersions: sanitizedVersions,
        versionToCompare: toVersionToBeSet
      })

      setFromVersionList(
        getReleasedVersions({
          releasedVersions: sanitizedVersions,
          maxVersion: sanitizedVersions[0]
        })
      )
      setToVersionList(
        getReleasedVersions({
          releasedVersions: sanitizedVersions,
          minVersion: fromVersion
        })
      )
      setFromVersion(fromVersion)
      setToVersion(toVersionToBeSet)

      setLoading(false)
    }

    fetchVersions()
  }, [setFromVersion, setToVersion])

  useEffect(() => {
    if (isLoading) {
      return
    }

    setFromVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        maxVersion: allVersions[0]
      })
    )
    setToVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        minVersion: fromVersion
      })
    )
  }, [allVersions, fromVersion, isLoading, toVersion])

  return (
    <Fragment>
      <h1>React Native update guide</h1>

      <Selectors>
        <FromVersionSelector
          title="What's your current React Native version?"
          loading={isLoading}
          value={fromVersion}
          options={fromVersionList}
          onChange={chosenVersion => setFromVersion(chosenVersion)}
        />

        <ToVersionSelector
          title="To which version would you like to update?"
          loading={isLoading}
          value={toVersion}
          options={toVersionList}
          onChange={chosenVersion => setToVersion(chosenVersion)}
        />
      </Selectors>
    </Fragment>
  )
}

export default VersionSelector
