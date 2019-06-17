import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import GitHubButton from 'react-github-btn'
import ReactGA from 'react-ga'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'
import { homepage } from '../../../package.json'

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

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-136307971-1')
      ReactGA.pageview('/')
    }
  }, [])

  const handleShowDiff = ({ fromVersion, toVersion }) => {
    if (fromVersion === toVersion) {
      return
    }

    setFromVersion(fromVersion)
    setToVersion(toVersion)
    setShowDiff(true)
  }

  return (
    <Page>
      <Container>
        <TitleContainer>
          <a href={homepage}><h1>React Native upgrade guide</h1></a>

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
