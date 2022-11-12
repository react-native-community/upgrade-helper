import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Card } from 'antd'
import GitHubButton from 'react-github-btn'
import ReactGA from 'react-ga'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'
import Settings from '../common/Settings'
import { homepage } from '../../../package.json'
import logo from '../../assets/logo.svg'
import { SHOW_LATEST_RCS } from '../../utils'
import { useGetLanguageFromURL } from '../../hooks/get-language-from-url'
import { useGetPackageNameFromURL } from '../../hooks/get-package-name-from-url'
import { PACKAGE_NAMES } from '../../constants'
import { TroubleshootingGuidesButton } from '../common/TroubleshootingGuidesButton'
import { updateURL } from '../../utils/update-url'
import { deviceSizes } from '../../utils/device-sizes'

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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${deviceSizes.tablet} {
    flex-direction: row;
  }
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 8px;
  flex: 1;
`



const Home = () => {
  const {
    packageName: defaultPackageName,
    isPackageNameDefinedInURL
  } = useGetPackageNameFromURL()
  const defaultLanguage = useGetLanguageFromURL()
  const [packageName, setPackageName] = useState(defaultPackageName)
  const [language, setLanguage] = useState(defaultLanguage)
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')
  const [shouldShowDiff, setShouldShowDiff] = useState(false)
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

  const handlePackageNameAndLanguageChange = ({
    newPackageName,
    newLanguage
  }) => {
    let localPackageName =
      newPackageName === undefined ? packageName : newPackageName
    let localLanguage = newLanguage === undefined ? language : newLanguage

    updateURL({
      packageName: localPackageName,
      language: localLanguage,
      isPackageNameDefinedInURL:
        isPackageNameDefinedInURL || newPackageName !== undefined,
      toVersion: '',
      fromVersion: ''
    })
    setPackageName(localPackageName)
    setLanguage(localLanguage)
    setFromVersion('')
    setToVersion('')
    setShouldShowDiff(false)
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
        <HeaderContainer>
          <SettingsContainer>
            {packageName === PACKAGE_NAMES.RN && (
              <TroubleshootingGuidesButton />
            )}
            <Settings
              handleSettingsChange={handleSettingsChange}
              appName={appName}
              packageName={packageName}
              onChangePackageNameAndLanguage={
                handlePackageNameAndLanguageChange
              }
              language={language}
              onChangeAppName={setAppName}
            />
          </SettingsContainer>
        </HeaderContainer>

        <VersionSelector
          key={packageName}
          showDiff={handleShowDiff}
          showReleaseCandidates={settings[SHOW_LATEST_RCS]}
          packageName={packageName}
          language={language}
          isPackageNameDefinedInURL={isPackageNameDefinedInURL}
        />
      </Container>
      <DiffViewer
        shouldShowDiff={shouldShowDiff}
        fromVersion={fromVersion}
        toVersion={toVersion}
        appName={appName}
        packageName={packageName}
        language={language}
      />
    </Page>
  )
}

export default Home
