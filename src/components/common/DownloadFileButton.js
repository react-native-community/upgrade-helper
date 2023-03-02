import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { getBinaryFileURL } from '../../utils'

const DownloadFileButton = styled(
  ({ open, version, path, packageName, ...props }) => {
    return open ? (
      <Button
        {...props}
        type="ghost"
        shape="circle"
        icon={<DownloadOutlined />}
        target="_blank"
        href={getBinaryFileURL({ packageName, version, path })}
      />
    ) : null
  }
)`
  color: #24292e;
  font-size: 12px;
  border-width: 0;
  &:hover,
  &:focus {
    color: #24292e;
  }
`

export default DownloadFileButton
