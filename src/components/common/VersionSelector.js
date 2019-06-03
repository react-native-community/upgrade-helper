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
const getReleasedVersionsWithoutCandidates = (
  releasedVersions,
  toVersionToBeSet
) => {
  const isLatestAReleaseCandidate = semver.prerelease(toVersionToBeSet) !== null
  const toVersion = semver.valid(semver.coerce(toVersionToBeSet))

  return releasedVersions.filter(
    releasedVersion =>
      semver.prerelease(releasedVersion) === null ||
      (isLatestAReleaseCandidate &&
        semver.compare(
          toVersion,
          semver.valid(semver.coerce(releasedVersion))
        ) === 0)
  )
}

// Finds the first minor release (which in react-native is the major) when compared to another version
const getFirstMajorRelease = (releasedVersions, versionToCompare) =>
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
  const [versions, setVersions] = useState([])

  useEffect(() => {
    const fetchVersions = async () => {
      const response = await fetch(RELEASES_URL)
      const text = await response.text()

      const releasedVersions = text.split('\n')

      const toVersionToBeSet = releasedVersions[0]

      setVersions(
        getReleasedVersionsWithoutCandidates(releasedVersions, toVersionToBeSet)
      )
      setFromVersion(getFirstMajorRelease(releasedVersions, toVersionToBeSet))
      setToVersion(toVersionToBeSet)

      setLoading(false)
    }

    fetchVersions()
  }, [setFromVersion, setToVersion])

  return (
    <Fragment>
      <h1>React Native update guide</h1>

      <Selectors>
        <FromVersionSelector
          title="What's your current React Native version?"
          loading={isLoading}
          value={fromVersion}
          options={versions}
          onChange={chosenVersion => setFromVersion(chosenVersion)}
        />

        <ToVersionSelector
          title="To which version would you like to update?"
          loading={isLoading}
          value={toVersion}
          options={versions}
          onChange={chosenVersion => setToVersion(chosenVersion)}
        />
      </Selectors>
    </Fragment>
  )
}

export default VersionSelector
