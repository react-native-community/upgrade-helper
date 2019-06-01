import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
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

      setVersions(releasedVersions)
      setFromVersion(releasedVersions[1])
      setToVersion(releasedVersions[0])

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
