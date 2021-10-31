import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { getBinaryFileURL } from '../../utils'

const DownloadFileButton = styled(
  ({ visible, version, path, packageName, ...props }) =>
    visible ? (
      <Button
        {...props}
        type="ghost"
        shape="circle"
        icon={<DownloadOutlined />}
        target="_blank"
        href={getBinaryFileURL({ packageName, version, path })}
      />
    ) : null
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
