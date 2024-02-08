import React from 'react'
import styled from '@emotion/styled'
import { Radio } from 'antd'
import type { Theme } from '../../../theme'
import type { ViewType } from 'react-diff-view'

interface DiffViewStyleOptionsProps {
  handleViewStyleChange: (style: ViewType) => void
  diffViewStyle: ViewType
  theme?: Theme
}
const DiffViewStyleOptions = styled(
  ({ handleViewStyleChange, diffViewStyle }: DiffViewStyleOptionsProps) => (
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
  )
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
    color: ${({ theme }) => theme.text};
  }
`
export default DiffViewStyleOptions
