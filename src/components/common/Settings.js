import React, { useState } from 'react'
import { Popover, Button, Checkbox, Input } from 'antd'
import { SHOW_LATEST_RCS } from '../../utils'
import styled from '@emotion/styled'

const InputContainer = styled.div({
  marginTop: '16px'
})

const SettingsButton = styled(Button)`
  color: initial;
`

const SettingsIcon = styled(props => <span {...props}>⚙️</span>)`
  font-family: initial;
`

const Settings = ({ handleSettingsChange, appName, onChangeAppName }) => {
  const [popoverVisibility, setVisibility] = useState(false)
  const [newAppName, setNewAppName] = useState(appName)

  const handleClickChange = visibility => {
    setVisibility(visibility)

    if (newAppName !== appName) {
      onChangeAppName(newAppName)
    }
  }

  const updateCheckboxValues = checkboxValues =>
    handleSettingsChange(checkboxValues)

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
          <InputContainer>
            <h4>What's your app name?</h4>
            <Input
              value={newAppName}
              onChange={({ target }) => setNewAppName(target.value)}
              placeholder="MyAwesomeApp"
            />
          </InputContainer>
        </>
      }
      trigger="click"
      visible={popoverVisibility}
      onVisibleChange={handleClickChange}
    >
      <SettingsButton icon={<SettingsIcon />} />
    </Popover>
  )
}

export default Settings
