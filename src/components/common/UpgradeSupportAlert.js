import React from 'react'
import styled from '@emotion/styled'
import { Tooltip } from 'antd'

const UpgradeSupportAlert = styled(props => (
  <div {...props}>
    <span>
      Check out{' '}
      <Tooltip
        placement="bottom"
        title="Backstage's Support is a community-backed place to request and give help."
      >
        <a
          href="https://backstage.io/docs/overview/support"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          Support and community
        </a>
      </Tooltip>{' '}
      if you are experiencing issues related to Backstage during the upgrading
      process.
    </span>
  </div>
))`
  padding-top: 15px;
  span > a {
    color: #045dc1;

    &:hover {
      color: #40a9ff;
    }
  }
`

export default UpgradeSupportAlert
