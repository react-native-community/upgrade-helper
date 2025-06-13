import React from 'react'
import { Modal, Typography, Space, Button, Alert } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

interface PatchInstructionsModalProps {
  visible: boolean
  onClose: () => void
  patchFileName: string
  hasBinaryFiles?: boolean
}

const PatchInstructionsModal = ({
  visible,
  onClose,
  patchFileName,
  hasBinaryFiles = false,
}: PatchInstructionsModalProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const commands = [
    {
      step: 1,
      description: 'Navigate to your React Native project directory',
      command: 'cd /path/to/your/react-native-project',
    },
    {
      step: 2,
      description: 'Ensure your working directory is clean',
      command: 'git status',
    },
    {
      step: 3,
      description: 'Apply the patch file',
      command: `git apply ${patchFileName}`,
    },
    {
      step: 4,
      description: 'Install any new dependencies',
      command: 'yarn install',
    },
  ]

  return (
    <Modal
      title="How to Install the Patch"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Got it!
        </Button>,
      ]}
      width={600}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="Quick Start"
          description="Follow these simple steps to apply your downloaded patch file to your React Native project."
          type="info"
          showIcon
        />

        <div>
          {commands.map(({ step, description, command }) => (
            <div key={step} style={{ marginBottom: 16 }}>
              <Title level={5} style={{ marginBottom: 4 }}>
                {step}. {description}
              </Title>
              <div
                style={{
                  backgroundColor: '#f6f8fa',
                  border: '1px solid #d0d7de',
                  borderRadius: 4,
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  code
                  style={{ margin: 0, backgroundColor: 'transparent' }}
                >
                  {command}
                </Text>
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(command)}
                  title="Copy command"
                />
              </div>
            </div>
          ))}
        </div>

        <Alert
          message="Important Notes"
          description={
            <div>
              <Paragraph style={{ marginBottom: 8 }}>
                • <strong>Backup first:</strong> Make sure your project is
                committed to git before applying the patch
              </Paragraph>
              <Paragraph style={{ marginBottom: 8 }}>
                • <strong>Resolve conflicts:</strong> If the patch doesn't apply
                cleanly, you may need to resolve conflicts manually
              </Paragraph>
              {hasBinaryFiles && (
                <Paragraph style={{ marginBottom: 8 }}>
                  • <strong>Binary files:</strong> Use the "Binaries" button to
                  download images, fonts, and other binary files separately
                </Paragraph>
              )}
              <Paragraph style={{ marginBottom: 0 }}>
                • <strong>Test thoroughly:</strong> Run your app and tests after
                applying the patch
              </Paragraph>
            </div>
          }
          type="warning"
          showIcon
        />
      </Space>
    </Modal>
  )
}

export default PatchInstructionsModal
