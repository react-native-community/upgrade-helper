import React, { useState } from 'react'
import { Popover, Button, Checkbox, Radio, Typography } from 'antd'
import { SHOW_LATEST_RCS } from '../../utils'
import styled from '@emotion/styled'
import { WindowsFilled } from '@ant-design/icons'
import { PACKAGE_NAMES, LANGUAGE_NAMES } from '../../constants'

const SettingsButton = styled(Button)`
  color: initial;
`

const SettingsIcon = styled((props) => <span {...props}>⚙️</span>)`
  font-family: initial;
`

const PlatformsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 12px;
`

const PackagesGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Settings = ({
  handleSettingsChange,
  packageName,
  language,
  onChangePackageNameAndLanguage,
  themeName,
  handleThemeToggle,
}) => {
  const [popoverVisibility, setVisibility] = useState(false)
  const [newPackageName, setNewPackageName] = useState(packageName)
  const [newLanguage, setNewLanguage] = useState(language)

  const handleClickChange = (visibility) => {
    setVisibility(visibility)

    const processedNewLanguage =
      newLanguage !== language && newPackageName === PACKAGE_NAMES.RNW
        ? newLanguage
        : LANGUAGE_NAMES.CPP

    if (
      !visibility &&
      (newPackageName !== packageName || processedNewLanguage !== language)
    ) {
      onChangePackageNameAndLanguage({
        newPackageName:
          newPackageName !== packageName ? newPackageName : undefined,
        newLanguage: processedNewLanguage,
      })
    }
  }

  const updateCheckboxValues = (checkboxValues) =>
    handleSettingsChange(checkboxValues)

  const humanThemeName = themeName[0].toUpperCase() + themeName.substring(1)

  return (
    <Popover
      placement="bottomRight"
      content={
        <>
          <Checkbox.Group onChange={updateCheckboxValues}>
            <div>
              <Checkbox value={SHOW_LATEST_RCS}>{SHOW_LATEST_RCS}</Checkbox>
            </div>
          </Checkbox.Group>
          <PlatformsContainer>
            <h5>Upgrading another platform?</h5>
            <Radio.Group
              value={newPackageName}
              onChange={(e) => setNewPackageName(e.target.value)}
            >
              <PackagesGroupContainer>
                <Radio value={PACKAGE_NAMES.RN}>react-native</Radio>
                <Radio value={PACKAGE_NAMES.RNW}>
                  <Radio.Group
                    size="small"
                    value={
                      newPackageName === PACKAGE_NAMES.RNW
                        ? newLanguage
                        : undefined
                    }
                    onChange={(e) => {
                      setNewPackageName(PACKAGE_NAMES.RNW)
                      setNewLanguage(e.target.value)
                    }}
                  >
                    <Typography.Text style={{ marginRight: 10 }}>
                      react-native-windows
                      <WindowsFilled style={{ margin: 5 }} />
                    </Typography.Text>
                    <Radio.Button value="cpp">C++</Radio.Button>
                    <Radio.Button value="cs">C#</Radio.Button>
                  </Radio.Group>
                </Radio>
                <Radio value={PACKAGE_NAMES.RNM}>react-native-macos</Radio>
              </PackagesGroupContainer>
            </Radio.Group>
          </PlatformsContainer>
          <h5>Theme:</h5>
          <Button title={humanThemeName} onClick={handleThemeToggle}>
            {humanThemeName}
          </Button>
        </>
      }
      trigger="click"
      open={popoverVisibility}
      onOpenChange={handleClickChange}
    >
      <SettingsButton icon={<SettingsIcon />} />
    </Popover>
  )
}

export default Settings
