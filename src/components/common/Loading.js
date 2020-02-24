import React from 'react'
import styled, { keyframes } from '@emotion/styled'
import logo from '../../assets/loading.svg'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Loading = styled(props => (
  <img alt="Loading" title="Loading" {...props} src={logo} />
))`
  width: 60px;
  margin: 15px 0;
  animation: ${rotate} 3s linear infinite;
`

export default Loading
