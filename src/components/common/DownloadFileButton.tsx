import React from 'react'
import { Button, ButtonProps } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { getBinaryFileURL } from '../../utils'

interface DownloadFileButtonProps extends ButtonProps {
  open: boolean
  version: string
  path: string
  packageName: string
}
const DownloadFileButton = ({
  open,
  version,
  path,
  packageName,
  ...props
}: DownloadFileButtonProps) => {
  return open ? (
    <Button
      {...props}
      shape="circle"
      icon={<DownloadOutlined />}
      target="_blank"
      href={getBinaryFileURL({ packageName, version, path })}
    />
  ) : null
}

export default DownloadFileButton
