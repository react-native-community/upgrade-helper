import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  overflow: hidden;
  margin-top: 25px;
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

const VersionSelector = ({ showDiff }) => {
  const [isLoading, setLoading] = useState(true)
  const [allVersions, setAllVersions] = useState([])
  const [fromVersionList, setFromVersionList] = useState([])
  const [toVersionList, setToVersionList] = useState([])

  const [localFromVersion, setLocalFromVersion] = useState('')
  const [localToVersion, setLocalToVersion] = useState('')

  useEffect(() => {
    const fetchVersions = async () => {
      const response = await fetch(RELEASES_URL)

      const allVersionsFromResponse = (await response.text()).split('\n')

      const toVersionToBeSet = allVersionsFromResponse[0]

      // Remove `rc` versions from array
      const sanitizedVersions = getReleasedVersionsWithoutCandidates({
        releasedVersions: allVersionsFromResponse,
        toVersion: toVersionToBeSet
      })

      setAllVersions(sanitizedVersions)

      // Get first major release before latest
      const fromVersionToBeSet = getFirstMajorRelease({
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
          minVersion: fromVersionToBeSet
        })
      )
      setLocalFromVersion(fromVersionToBeSet)
      setLocalToVersion(toVersionToBeSet)

      setLoading(false)
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
        maxVersion: allVersions[0]
      })
    )
    setToVersionList(
      getReleasedVersions({
        releasedVersions: allVersions,
        minVersion: localFromVersion
      })
    )
  }, [isLoading, allVersions, localFromVersion])

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
          type="primary"
          size="large"
          onClick={() =>
            showDiff({
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
