import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { getBinaryFileURL } from '../../utils'

const ViewFileButton = styled(
  ({ open, version, path, packageName, ...props }) => {
    if (!open) {
      return null
    }

    return (
      <Button
        {...props}
        type="link"
        target="_blank"
        href={getBinaryFileURL({ packageName, version, path })}
      >
        View file
      </Button>
    )
  }
)`
  font-size: 12px;
  color: #24292e;
`

export default ViewFileButton
