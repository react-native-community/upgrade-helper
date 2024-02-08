import React from 'react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from 'antd'
import { getBinaryFileURL } from '../../utils'

interface ViewFileButtonProps extends ButtonProps {
  open: boolean
  version: string
  path: string
  packageName: string
}
const ViewFileButton = styled(
  ({ open, version, path, packageName, ...props }: ViewFileButtonProps) => {
    if (!open) {
      return null
    }

    return (
      <Button
        {...props}
        target="_blank"
        size="small"
        href={getBinaryFileURL({ packageName, version, path })}
      >
        Raw
      </Button>
    )
  }
)`
  font-size: 13px;
`

export default ViewFileButton
