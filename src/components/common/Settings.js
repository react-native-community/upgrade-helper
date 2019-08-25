import React, { useState } from 'react'
import styled from 'styled-components'
import { Popover, Button, Checkbox } from 'antd'
import { SHOW_LATEST_RCS } from '../../utils'

const ApplyButton = styled(Button)`
  margin-top: 10px;
  margin-right: 8px;
`
const Settings = ({ handleSettingsChange }) => {
  const [popoverVisibility, setVisibility] = useState(false)
  const [checkboxValues, setCheckboxValues] = useState([SHOW_LATEST_RCS])

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
      placement="bottomRight"
      content={
        <Checkbox.Group
          onChange={updateCheckboxValues}
          defaultValue={[SHOW_LATEST_RCS]}
        >
          <div>
            <Checkbox value={SHOW_LATEST_RCS}>{SHOW_LATEST_RCS}</Checkbox>
          </div>
          <ApplyButton type="primary" size="small" onClick={hidePopover}>
            Apply
          </ApplyButton>
          <Button size="small" onClick={cancel}>
            Cancel
          </Button>
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
