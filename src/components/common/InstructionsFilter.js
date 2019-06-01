import React, { useState } from 'react'
import styled from 'styled-components'
import { Popover, Button, Checkbox } from 'antd'
import { instructionCategories } from '../../utils'

const options = instructionCategories.map(category => ({
  label: category,
  value: category
}))

const FilterPopover = styled(Popover)`
  position: absolute;
  right: 20px;
`

const InstructionsFilter = ({ filters, setFilters }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <FilterPopover
      content={<Checkbox.Group options={options} defaultValue={filters} onChange={setFilters} />}
      trigger="hover"
      placement="left"
      visible={isVisible}
      onVisibleChange={() => setIsVisible(!isVisible)}
    >
      <Button size="large" type="circle" icon="setting" />
    </FilterPopover>
  )
}

export default InstructionsFilter
