import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
`

const Container = styled(Card)`
  width: 90%;
  border-radius: 3px;
`

const Home = () => {
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')
  const [showDiff, setShowDiff] = useState(false)

  const handleShowDiff = ({ fromVersion, toVersion }) => {
    setFromVersion(fromVersion)
    setToVersion(toVersion)
    setShowDiff(true)
  }

  return (
    <Page>
      <Container>
        <VersionSelector showDiff={handleShowDiff} />
      </Container>

      <DiffViewer
        showDiff={showDiff}
        fromVersion={fromVersion}
        toVersion={toVersion}
      />
    </Page>
  )
}

export default Home
