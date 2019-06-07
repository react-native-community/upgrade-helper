import React from 'react'
import styled from 'styled-components'
import { Select as AntdSelect } from 'antd'

const { Option } = AntdSelect

const SelectBoxContainer = styled.div`
  width: 100%;
`
const SelectBox = styled(AntdSelect)`
  width: 100%;
`

const Select = ({ title, options, ...props }) => (
  <SelectBoxContainer>
    <h4>{title}</h4>

    <SelectBox size="large" {...props}>
      {options.map(option => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </SelectBox>
  </SelectBoxContainer>
)

export default Select
