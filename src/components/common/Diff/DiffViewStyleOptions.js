import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const Options = Button.Group

const Container = styled.div`
  position: relative;
  border-width: 1px;
  margin-top: 10px;
  flex-direction: row-reverse;
  display: flex;
`

const DiffViewStyleOptions = styled(({ setViewStyle, ...props }) => {
  return (
    <Container>
      <Options>
        <Button onClick={() => setViewStyle('split')}>Split</Button>
        <Button onClick={() => setViewStyle('unified')}>Unified</Button>
      </Options>
    </Container>
  )
})`
  float: right;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  border-width: 0px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  &,
  &:hover,
  &:focus {
    color: #24292e;
  }
`
export default DiffViewStyleOptions
