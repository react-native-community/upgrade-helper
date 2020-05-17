import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Button, Card } from 'antd'
import GitHubButton from 'react-github-btn'
import ReactGA from 'react-ga'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'
import Settings from '../common/Settings'
import HowToUseModal from '../common/HowToUseModal'
import { homepage } from '../../../package.json'
import logo from '../../assets/logo.svg'
import { SHOW_LATEST_RCS } from '../../utils'

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
  border-color: #e8e8e8;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
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
  margin-right: auto;
`

const HowToUseButton = styled(({ className, ...props }) => (
  <div className={className}>
    <Button {...props}>How to Use</Button>
  </div>
))`
  margin-right: 15px;
`

const Home = () => {
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')
  const [shouldShowDiff, setShouldShowDiff] = useState(false)
  const [shouldShowTutorial, setShouldShowTutorial] = useState(false)
  const [settings, setSettings] = useState({
    [`${SHOW_LATEST_RCS}`]: false
  })
  const [appName, setAppName] = useState('')

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
    setShouldShowDiff(true)
  }

  const handleSettingsChange = settingsValues => {
    const normalizedIncomingSettings = settingsValues.reduce((acc, val) => {
      acc[val] = true
      return acc
    }, {})

    setSettings(normalizedIncomingSettings)
  }

  return (
    <Page>
      <Container>
        <TitleContainer>
          <LogoImg
            alt="React Native Upgrade Helper logo"
            title="React Native Upgrade Helper logo"
            src={logo}
          />

          <a href={homepage}>
            <TitleHeader>React Native Upgrade Helper</TitleHeader>
          </a>

          <StarButton
            href="https://github.com/react-native-community/upgrade-helper"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star react-native-community/upgrade-helper on GitHub"
          >
            Star
          </StarButton>

          <Row>
            <HowToUseButton
              type="link"
              onClick={() => setShouldShowTutorial(true)}
            />
            <HowToUseModal
              visible={shouldShowTutorial}
              onClose={() => setShouldShowTutorial(false)}
            />
            <Settings
              handleSettingsChange={handleSettingsChange}
              appName={appName}
              setAppName={setAppName}
            />
          </Row>
        </TitleContainer>

        <VersionSelector
          showDiff={handleShowDiff}
          showReleaseCandidates={settings[SHOW_LATEST_RCS]}
        />
      </Container>

      <DiffViewer
        shouldShowDiff={shouldShowDiff}
        fromVersion={fromVersion}
        toVersion={toVersion}
        appName={appName}
      />
    </Page>
  )
}

export default Home
