import React from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'
import Markdown from './Markdown'

const Container = styled.div({
  width: '100%',
  marginTop: '16px'
})

export const AppNameWarning = () => (
  <Container>
    <Alert
      message={
        <Markdown>
          Keep in mind that `RnDiffApp` and `rndiffapp` are placeholders. When
          upgrading, you should replace them with your actual project's name.
        </Markdown>
      }
      type="info"
      closable
    />
  </Container>
)
