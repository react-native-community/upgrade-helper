import React, { useState } from 'react'
import { Popover, Button, Checkbox } from 'antd'
import { SHOW_LATEST_RCS } from '../../utils'

const Settings = ({ handleSettingsChange }) => {
  const [popoverVisibility, setVisibility] = useState(false)

  const handleClickChange = visibility => setVisibility(visibility)

  const updateCheckboxValues = checkboxValues =>
    handleSettingsChange(checkboxValues)

  return (
    <Popover
      placement="bottomRight"
      content={
        <Checkbox.Group
          onChange={updateCheckboxValues}
          defaultValue={[SHOW_LATEST_RCS]}
        >
          <div>
            <Checkbox value={SHOW_LATEST_RCS}>{SHOW_LATEST_RCS}</Checkbox>
          </div>
        </Checkbox.Group>
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
