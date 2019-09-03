import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card } from 'antd'
import GitHubButton from 'react-github-btn'
import ReactGA from 'react-ga'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'
import { homepage } from '../../../package.json'
import logo from '../../assets/logo.svg'

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

const LogoImg = styled.img`
  width: 100px;
  margin-bottom: 15px;
`

const TitleHeader = styled.h1`
  margin: 0;
  margin-left: 15px;
`

const StarButton = styled(({ className, ...props }) => (
  <div className={className}>
    <GitHubButton {...props} />
  </div>
))`
  margin-top: 10px;
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
          <LogoImg
            alt="React Native upgrade helper logo"
            title="React Native upgrade helper logo"
            src={logo}
          />

          <a href={homepage}>
            <TitleHeader>React Native upgrade guide</TitleHeader>
          </a>

          <StarButton
            href="https://github.com/react-native-community/upgrade-helper"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star react-native-community/upgrade-helper on GitHub"
          >
            Star
          </StarButton>

          <a
            href="https://osawards.com/reactnative"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/Open%20Source%20Awards-Vote-blue?logo=react&style=badge"
              title="Vote for upgrade-helper on React Native Open Source Awards!"
              alt="Vote for upgrade-helper on React Native Open Source Awards!"
              style={{ marginLeft: 20, marginTop: 5 }}
            />
          </a>
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
