import React from 'react'
import { Button, Radio, Icon } from 'antd'
import styled from 'styled-components'
import { PACKAGE_MANAGERS } from '../../utils'

const packageManagers = Object.keys(PACKAGE_MANAGERS)

const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`

const PackageManagerSelector = ({ value, onChange }) => {
  return (
    <Container>
      <h4>Which package manager do you use?</h4>

      <Radio.Group
        value={value}
        onChange={({ target }) => onChange(target.value)}
      >
        {packageManagers.map(packageManager => (
          <Radio.Button key={packageManager} value={packageManager}>
            {packageManager}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Container>
  )
}

export default PackageManagerSelector
