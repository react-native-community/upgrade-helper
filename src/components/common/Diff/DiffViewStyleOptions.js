import React from 'react'
import styled from '@emotion/styled'
import { Radio } from 'antd'

const Container = styled.div`
  position: relative;
  border-width: 1px;
  margin-top: 16px;
  flex-direction: row-reverse;
  display: flex;
`

const DiffViewStyleOptions = styled(
  ({ handleViewStyleChange, diffViewStyle }) => {
    return (
      <Container>
        <Radio.Group value={diffViewStyle}>
          <Radio.Button
            value="split"
            onChange={() => handleViewStyleChange('split')}
          >
            Split
          </Radio.Button>
          <Radio.Button
            value="unified"
            onChange={() => handleViewStyleChange('unified')}
          >
            Unified
          </Radio.Button>
        </Radio.Group>
      </Container>
    )
  }
)`
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
