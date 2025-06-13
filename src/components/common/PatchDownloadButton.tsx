import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { replaceAppDetails } from '../../utils'
import PatchInstructionsModal from './PatchInstructionsModal'

interface PatchDownloadButtonProps {
  rawDiff: string
  fromVersion: string
  toVersion: string
  appName?: string
  appPackage?: string
  disabled?: boolean
  hasBinaryFiles?: boolean
}

const PatchDownloadButton = ({
  rawDiff,
  fromVersion,
  toVersion,
  appName,
  appPackage,
  disabled = false,
  hasBinaryFiles = false,
}: PatchDownloadButtonProps) => {
  const [showInstructions, setShowInstructions] = useState(false)
  const patchFileName = `${fromVersion}-to-${toVersion}.patch`

  const downloadPatch = () => {
    if (!rawDiff) return

    // Apply app name and package customization if provided
    const customizedDiff =
      appName || appPackage
        ? replaceAppDetails(rawDiff, appName || '', appPackage || '')
        : rawDiff

    // Create and trigger download
    const blob = new Blob([customizedDiff], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = patchFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Button.Group>
        <Button
          icon={<DownloadOutlined />}
          onClick={downloadPatch}
          disabled={disabled || !rawDiff}
          type="default"
        >
          Download Patch
        </Button>
        <Tooltip title="How to install this patch">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => setShowInstructions(true)}
            disabled={disabled || !rawDiff}
            type="default"
          />
        </Tooltip>
      </Button.Group>

      <PatchInstructionsModal
        visible={showInstructions}
        onClose={() => setShowInstructions(false)}
        patchFileName={patchFileName}
        hasBinaryFiles={hasBinaryFiles}
      />
    </>
  )
}

export default PatchDownloadButton
