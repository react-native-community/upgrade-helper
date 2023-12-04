import React from 'react'
import { Button as AntdButton, Tooltip } from 'antd'
import styled from '@emotion/styled'

const Button = styled(AntdButton)`
  width: 32px;
  padding: 0;
`

const DarkModeButton = ({ isDarkMode, ...props }) => {
  return (
    <Tooltip placement="bottomLeft" title="Toggle Light/Dark Mode">
      <Button {...props}>{isDarkMode ? '🌙' : '☀️'}</Button>
    </Tooltip>
  )
}

export { DarkModeButton }
