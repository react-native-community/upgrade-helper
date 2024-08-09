import React, { useState, useEffect, useDeferredValue } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import { Card, Input, Typography, ConfigProvider, theme } from 'antd'
import GitHubButton, { ReactGitHubButtonProps } from 'react-github-btn'
import ReactGA from 'react-ga'
import createPersistedState from 'use-persisted-state'
import queryString from 'query-string'
import VersionSelector from '../common/VersionSelector'
import DiffViewer from '../common/DiffViewer'
import Settings from '../common/Settings'
// @ts-ignore-next-line
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
import { DarkModeButton } from '../common/DarkModeButton'
import { updateURL } from '../../utils/update-url'
import { deviceSizes } from '../../utils/device-sizes'
import { lightTheme, darkTheme, type Theme } from '../../theme'

const Page = styled.div<{ theme?: Theme }>`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
`

const Container = styled(Card)<{ theme?: Theme }>`
  background-color: ${({ theme }) => theme.background};
  width: 90%;
  border-radius: 3px;
  border-color: ${({ theme }) => theme.border};
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
`

const AppPackageField = styled.div`
  width: 100%;
`

const AppDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${deviceSizes.tablet} {
    flex-direction: row;
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

const getAppInfoInURL = (): {
  appPackage: string
  appName: string
} => {
  // Parses `/?name=RnDiffApp&package=com.rndiffapp` from URL
  const { name, package: pkg } = queryString.parse(window.location.search)

  return {
    appPackage: pkg as string,
    appName: name as string,
  }
}

interface StarButtonProps extends ReactGitHubButtonProps {
  className?: string
}

const StarButton = styled(({ className, ...props }: StarButtonProps) => (
  <div className={className}>
    <GitHubButton {...props} />
  </div>
))`
  margin-top: 10px;
  margin-left: 15px;
  margin-right: auto;
`

// Set up a persisted state hook for for dark mode so users coming back
// will have dark mode automatically if they've selected it previously.
const useDarkModeState = createPersistedState('darkMode')

const Home = () => {
  const { packageName: defaultPackageName, isPackageNameDefinedInURL } =
    useGetPackageNameFromURL()
  const defaultLanguage = useGetLanguageFromURL()
  const [packageName, setPackageName] = useState(defaultPackageName)
  const [language, setLanguage] = useState(defaultLanguage)
  const [fromVersion, setFromVersion] = useState<string>('')
  const [toVersion, setToVersion] = useState<string>('')
  const [shouldShowDiff, setShouldShowDiff] = useState<boolean>(false)
  const [settings, setSettings] = useState<Record<string, boolean>>({
    [`${SHOW_LATEST_RCS}`]: false,
  })

  const appInfoInURL = getAppInfoInURL()
  const [appName, setAppName] = useState<string>(appInfoInURL.appName)
  const [appPackage, setAppPackage] = useState<string>(appInfoInURL.appPackage)

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

  const handleShowDiff = ({
    fromVersion,
    toVersion,
  }: {
    fromVersion: string
    toVersion: string
  }) => {
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
  }: {
    newPackageName?: string
    newLanguage: string
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

  const handleSettingsChange = (settingsValues: string[]) => {
    const normalizedIncomingSettings = settingsValues.reduce((acc, val) => {
      acc[val] = true
      return acc
    }, {})

    setSettings(normalizedIncomingSettings)
  }

  // Dark Mode Setup:
  const { defaultAlgorithm, darkAlgorithm } = theme // Get default and dark mode states from antd.
  const [isDarkMode, setIsDarkMode] = useDarkModeState(false) // Remembers dark mode state between sessions.
  const toggleDarkMode = () =>
    setIsDarkMode((previousValue: boolean) => !previousValue)
  const themeString = isDarkMode ? 'dark' : 'light'
  useEffect(() => {
    // Set the document's background color to the theme's body color.
    document.body.style.backgroundColor = isDarkMode
      ? darkTheme.background
      : lightTheme.background
  }, [isDarkMode])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
                  data-color-scheme={`no-preference: ${themeString}; light: ${themeString}; dark: ${themeString};`}
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
                <DarkModeButton
                  isDarkMode={isDarkMode as boolean}
                  onClick={toggleDarkMode}
                />
              </SettingsContainer>
            </HeaderContainer>

            <AppDetailsContainer>
              <AppNameField>
                <Typography.Title level={5}>
                  What's your app name?
                </Typography.Title>

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
                  onChange={({ target }) =>
                    setAppPackage((value) => target.value)
                  }
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
              appPackage={appPackage}
              appName={appName}
            />
          </Container>
          {/*
        Pass empty values for app name and package if they're the defaults to 
        hint to diffing components they don't need to further patch the 
        rn-diff-purge output.
      */}
          <DiffViewer
            //@ts-ignore-next-line
            shouldShowDiff={shouldShowDiff}
            fromVersion={fromVersion}
            toVersion={toVersion}
            appName={
              deferredAppName !== DEFAULT_APP_NAME ? deferredAppName : ''
            }
            appPackage={
              deferredAppPackage !== DEFAULT_APP_PACKAGE
                ? deferredAppPackage
                : ''
            }
            packageName={packageName}
            language={language}
          />
        </Page>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default Home
