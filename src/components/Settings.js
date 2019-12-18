import React, { useState } from 'react'
import { Popover, Button, Checkbox } from 'antd'

import { SHOW_LATEST_RCS } from '../utils'


export const Settings = ({ handleSettingsChange }) => {
	const [popoverVisibility, setVisibility] = useState(false)

	const handleClickChange = visibility => setVisibility(visibility)

	const updateCheckboxValues = checkboxValues =>
		handleSettingsChange(checkboxValues)

	return (
		<Popover
			placement="bottomRight"
			content={
				<Checkbox.Group onChange={updateCheckboxValues}>
					<div>
						<span>{SHOW_LATEST_RCS}</span>
						<Checkbox value={SHOW_LATEST_RCS} style={{ marginLeft: 10 }} />
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
