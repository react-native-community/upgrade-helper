import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Popover } from 'antd'
import { getFileApiURL, replaceWithProvidedAppName } from '../../utils'
import { CopyOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'

const popoverContentOpts = {
  default: 'Copy raw contents',
  copied: 'Copied!',
}

const CopyFileButton = styled(
  ({ open, version, path, packageName, appName, ...props }) => {
    const [popoverContent, setPopoverContent] = useState(
      popoverContentOpts.default
    )

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
            fetch(getFileApiURL({ packageName, version, path }))
              .then((response) => response.json())
              .then((json) => window.atob(json.content))
              .then((content) => replaceWithProvidedAppName(content, appName))
              .then((content) => copy(content))
              .then(() => setPopoverContent(popoverContentOpts.copied))
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
