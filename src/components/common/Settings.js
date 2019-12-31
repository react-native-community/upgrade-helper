import React, { useState } from 'react'
import { Popover, Button, Checkbox, Form, Input } from 'antd'
import { SHOW_LATEST_RCS } from '../../utils'

const Settings = ({ handleSettingsChange, appName, setAppName }) => {
  const [popoverVisibility, setVisibility] = useState(false)

  const handleClickChange = visibility => setVisibility(visibility)

  const updateCheckboxValues = checkboxValues =>
    handleSettingsChange(checkboxValues)

  return (
    <Popover
      placement="bottomRight"
      content={
        <Form>
          <Form.Item>
            <Checkbox.Group onChange={updateCheckboxValues}>
              <div>
                <Checkbox value={SHOW_LATEST_RCS}>{SHOW_LATEST_RCS}</Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Your AppName">
            <Input
              value={appName}
              onChange={e => {
                setAppName(e.target.value)
              }}
              placeholder="MyAwesomeApp"
            />
          </Form.Item>
        </Form>
      }
      trigger="click"
      visible={popoverVisibility}
      onVisibleChange={handleClickChange}
    >
      <Button icon="setting" />
    </Popover>
  )
}

export default Settings
