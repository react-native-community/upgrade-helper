import React from 'react'
import styled from '@emotion/styled'
import { Button as AntdButton, ButtonProps } from 'antd'

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

interface UpgradeButtonProps extends React.PropsWithRef<ButtonProps> {
  onShowDiff: () => void
}

const UpgradeButton = React.forwardRef<
  HTMLElement,
  UpgradeButtonProps & React.RefAttributes<HTMLElement>
>(({ onShowDiff, ...props }, ref) => (
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
