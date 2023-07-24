import React, { useState, useEffect, useDeferredValue } from 'react'
import styled from '@emotion/styled'
import { Card, Input, Typography } from 'antd'
import GitHubButton from 'react-github-btn'
import ReactGA from 'react-ga'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'
import Settings from '../common/Settings'
import logo from '../../assets/logo.svg'
import { SHOW_LATEST_RCS } from '../../utils'
import { useGetLanguageFromURL } from '../../hooks/get-language-from-url'
import { useGetPackageNameFromURL } from '../../hooks/get-package-name-from-url'
import {
  DEFAULT_APP_NAME,
  DEFAULT_APP_PACKAGE,
  PACKAGE_NAMES,
} from '../../constants'
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

const LogoImg = styled.img`
  width: 50px;
  margin-bottom: 15px;

  @media ${deviceSizes.tablet} {
    width: 100px;
  }
`

const TitleHeader = styled.h1`
  margin: 0;
  margin-left: 15px;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const AppNameField = styled.div`
  width: 100%;

  @media ${deviceSizes.tablet} {
    padding-right: 5px;
  }
`

const AppPackageField = styled.div`
  width: 100%;

  @media ${deviceSizes.tablet} {
    padding-left: 5px;
  }
`

const AppDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;

  @media ${deviceSizes.tablet} {
    flex-direction: row;
    gap: 0;
  }
`

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 8px;
  flex: 1;
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

const Home = () => {
  const { packageName: defaultPackageName, isPackageNameDefinedInURL } =
    useGetPackageNameFromURL()
  const defaultLanguage = useGetLanguageFromURL()
  const [packageName, setPackageName] = useState(defaultPackageName)
  const [language, setLanguage] = useState(defaultLanguage)
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')
  const [shouldShowDiff, setShouldShowDiff] = useState(false)
  const [settings, setSettings] = useState({
    [`${SHOW_LATEST_RCS}`]: false,
  })

  const [appName, setAppName] = useState('')
  const [appPackage, setAppPackage] = useState('')

  // Avoid UI lag when typing.
  const deferredAppName = useDeferredValue(appName)
  const deferredAppPackage = useDeferredValue(appPackage)

  const homepageUrl = process.env.PUBLIC_URL

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
    newLanguage,
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
      fromVersion: '',
    })
    setPackageName(localPackageName)
    setLanguage(localLanguage)
    setFromVersion('')
    setToVersion('')
    setShouldShowDiff(false)
  }

  const handleSettingsChange = (settingsValues) => {
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
          <TitleContainer>
            <LogoImg
              alt="React Native Upgrade Helper logo"
              title="React Native Upgrade Helper logo"
              src={logo}
            />
            <a href={homepageUrl}>
              <TitleHeader>React Native Upgrade Helper</TitleHeader>
            </a>
          </TitleContainer>

          <SettingsContainer>
            <StarButton
              href="https://github.com/react-native-community/upgrade-helper"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star react-native-community/upgrade-helper on GitHub"
            >
              Star
            </StarButton>
            {packageName === PACKAGE_NAMES.RN && (
              <TroubleshootingGuidesButton />
            )}
            <Settings
              handleSettingsChange={handleSettingsChange}
              packageName={packageName}
              onChangePackageNameAndLanguage={
                handlePackageNameAndLanguageChange
              }
              language={language}
            />
          </SettingsContainer>
        </HeaderContainer>

        <AppDetailsContainer>
          <AppNameField>
            <Typography.Title level={5}>What's your app name?</Typography.Title>

            <Input
              size="large"
              placeholder={DEFAULT_APP_NAME}
              value={appName}
              onChange={({ target }) => setAppName((value) => target.value)}
            />
          </AppNameField>

          <AppPackageField>
            <Typography.Title level={5}>
              What's your app package?
            </Typography.Title>

            <Input
              size="large"
              placeholder={DEFAULT_APP_PACKAGE}
              value={appPackage}
              onChange={({ target }) => setAppPackage((value) => target.value)}
            />
          </AppPackageField>
        </AppDetailsContainer>
        <VersionSelector
          key={packageName}
          showDiff={handleShowDiff}
          showReleaseCandidates={settings[SHOW_LATEST_RCS]}
          packageName={packageName}
          language={language}
          isPackageNameDefinedInURL={isPackageNameDefinedInURL}
        />
      </Container>
      {/*
        Pass empty values for app name and package if they're the defaults to 
        hint to diffing components they don't need to further patch the 
        rn-diff-purge output.
      */}
      <DiffViewer
        shouldShowDiff={shouldShowDiff}
        fromVersion={fromVersion}
        toVersion={toVersion}
        appName={deferredAppName !== DEFAULT_APP_NAME ? deferredAppName : ''}
        appPackage={
          deferredAppPackage !== DEFAULT_APP_PACKAGE ? deferredAppPackage : ''
        }
        packageName={packageName}
        language={language}
      />
    </Page>
  )
}

export default Home
