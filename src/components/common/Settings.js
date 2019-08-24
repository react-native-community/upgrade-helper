import React, { useState } from 'react'
import { Popover, Button, Checkbox } from 'antd'

const Group = Checkbox.Group

const Settings = ({ handleSettingsChange }) => {
  const [popoverVisibility, setVisibility] = useState(false)
  const [checkboxValues, setCheckboxValues] = useState([])

  const handleClickChange = visibility => setVisibility(visibility)
  const updateCheckboxValues = checkboxValues =>
    setCheckboxValues(checkboxValues)

  const hidePopover = () => {
    setVisibility(false)
    handleSettingsChange(checkboxValues)
  }

  const cancel = () => setVisibility(false)

  return (
    <Popover
      content={
        <Group
          onChange={updateCheckboxValues}
          defaultValue={['show release candidates']}
        >
          <div>
            <Checkbox value="show release candidates">
              show release candidates
            </Checkbox>
          </div>
          <Button onClick={hidePopover}>Apply</Button>
          <Button onClick={cancel}>Cancel</Button>
        </Group>
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
