import React from 'react'
import styled from '@emotion/styled'
import { Button as AntdButton } from 'antd'

export const testIDs = {
  upgradeButton: 'upgradeButton',
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  overflow: hidden;
  margin-top: 28px;
`

const Button = styled(AntdButton)`
  border-radius: 3px;
`

const UpgradeButton = React.forwardRef(({ onShowDiff, ...props }, ref) => (
  <Container>
    <Button
      {...props}
      ref={ref}
      type="primary"
      size="large"
      data-testid={testIDs.upgradeButton}
      onClick={onShowDiff}
    >
      Show me how to upgrade!
    </Button>
  </Container>
))

export default UpgradeButton
