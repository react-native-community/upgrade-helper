import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import GitHubButton from 'react-github-btn'
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const StarButton = styled(({ className, ...props }) => (
  <div className={className}>
    <GitHubButton {...props} />
  </div>
))`
  margin-bottom: 5px;
  margin-left: 15px;
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
        <TitleContainer>
          <h1>React Native upgrade guide</h1>

          <StarButton
            href="https://github.com/react-native-community/upgrade-helper"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star react-native-community/upgrade-helper on GitHub"
          >
            Star
          </StarButton>
        </TitleContainer>

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
