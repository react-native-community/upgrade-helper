import React from 'react'
import styled from '@emotion/styled'
import { Tooltip } from 'antd'
import type { Theme } from '../../theme'

interface UpgradeSupportAlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme
}
const UpgradeSupportAlert = styled((props: UpgradeSupportAlertProps) => (
  <div {...props}>
    <span>
      Check out{' '}
      <Tooltip
        placement="bottom"
        title="Upgrade Support is a community-backed place to request and give help when upgrading your app."
      >
        <a
          href="https://github.com/react-native-community/upgrade-support"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upgrade Support
        </a>
      </Tooltip>{' '}
      if you are experiencing issues related to React Native during the
      upgrading process.
    </span>
  </div>
))`
  span > a {
    color: ${({ theme }) => theme.link}};
  }
`

export default UpgradeSupportAlert
