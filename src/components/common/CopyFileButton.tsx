import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Popover } from 'antd'
import type { ButtonProps } from 'antd'
import { getBinaryFileURL, replaceAppDetails } from '../../utils'
import { CopyOutlined } from '@ant-design/icons'

const popoverContentOpts = {
  default: 'Copy raw contents',
  copied: 'Copied!',
}

interface CopyFileButtonProps extends ButtonProps {
  open: boolean
  version: string
  path: string
  packageName: string
  appName: string
  appPackage: string
}

const CopyFileButton = styled(
  ({
    open,
    version,
    path,
    packageName,
    appName,
    appPackage,
    ...props
  }: CopyFileButtonProps) => {
    const [popoverContent, setPopoverContent] = useState(
      popoverContentOpts.default
    )

    const fetchContent = () =>
      fetch(getBinaryFileURL({ packageName, version, path }))
        .then((response) => response.text())
        .then((content) => replaceAppDetails(content, appName, appPackage))

    const copyContent = () => {
      // From https://wolfgangrittner.dev/how-to-use-clipboard-api-in-firefox/
      if (typeof ClipboardItem && navigator.clipboard.write) {
        const item = new ClipboardItem({
          'text/plain': fetchContent().then(
            (content) => new Blob([content], { type: 'text/plain' })
          ),
        })

        return navigator.clipboard.write([item])
      } else {
        return fetchContent().then((content) =>
          navigator.clipboard.writeText(content)
        )
      }
    }

    if (!open) {
      return null
    }

    return (
      <Popover content={popoverContent} trigger="hover">
        <Button
          {...props}
          type="ghost"
          icon={<CopyOutlined />}
          onBlur={() => {
            setPopoverContent(popoverContentOpts.default)
          }}
          onClick={() => {
            copyContent().then(() =>
              setPopoverContent(popoverContentOpts.copied)
            )
          }}
        />
      </Popover>
    )
  }
)`
  font-size: 13px;
  margin-left: 5px;
`

export default CopyFileButton
