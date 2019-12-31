import React from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'

const Container = styled.div({
  width: '100%'
})

export const AppNameWarning = () => (
  <Container>
    <Alert
      message="Don't forget: `RnDiffApp` is a placeholder. When upgrading, all
          instances of `RnDiffApp` should be `YourProjectName`, all `rndiffapp`
          should be `yourprojectname` etc."
      type="info"
      closable
    />
  </Container>
)
