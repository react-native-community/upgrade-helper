import React from 'react'
import { Button, Popover as AntdPopover, Tooltip } from 'antd'
import type { PopoverProps as AntdPopoverProps } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import DownloadFileButton from './DownloadFileButton'
import { removeAppPathPrefix } from '../../utils'
import type { Theme } from '../../theme'
import type { File } from 'gitdiff-parser'

const Container = styled.div`
  padding-right: 10px;
`

interface BinaryRowProps {
  index: number
  theme?: Theme
}

const BinaryRow = styled.div<BinaryRowProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ index, theme }) =>
    index % 2 === 0 ? theme.rowEven : theme.rowOdd};
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: 12px;
  width: 500px;
  max-width: 500px;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`
interface PopoverProps extends Omit<AntdPopoverProps, 'overlayClassName'> {
  className?: string
}
const Popover = styled(({ className, ...props }: PopoverProps) => (
  <AntdPopover overlayClassName={className} {...props} />
))`
  .ant-popover-inner-content {
    padding: 0;
  }
`

interface BinaryListProps {
  binaryFiles: File[]
  toVersion: string
  appName: string
  packageName: string
}

const BinaryList: React.FC<BinaryListProps> = ({
  binaryFiles,
  toVersion,
  appName,
  packageName,
}) => {
  return (
    <>
      {binaryFiles.map(({ newPath }, index) => {
        return (
          <BinaryRow key={index} index={index}>
            {removeAppPathPrefix(newPath, appName)}

            <DownloadFileButton
              open={true}
              version={toVersion}
              path={newPath}
              packageName={packageName}
            />
          </BinaryRow>
        )
      })}
    </>
  )
}

interface BinaryDownloadProps {
  diff: File[]
  fromVersion: string
  toVersion: string
  appName: string
  packageName: string
}
const BinaryDownload = ({
  diff,
  fromVersion,
  toVersion,
  appName,
  packageName,
}: BinaryDownloadProps) => {
  const binaryFiles = diff.filter(
    ({ hunks, type }) => hunks.length === 0 && type !== 'delete'
  )

  if (binaryFiles.length === 0) {
    return null
  }

  return (
    <Container>
      <Button.Group>
        <Popover
          placement="bottomRight"
          content={
            <BinaryList
              binaryFiles={binaryFiles}
              toVersion={toVersion}
              appName={appName}
              packageName={packageName}
            />
          }
          trigger="click"
        >
          <Button>Binaries ({binaryFiles.length})</Button>
        </Popover>
        <Tooltip
          placement="top"
          title={
            <div style={{ maxWidth: 300 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                Binary Files (Images, Fonts, etc.)
              </div>
              <div>
                Binary files can't be included in patch files. Download these
                individually and place them manually in your project after
                applying the patch.
              </div>
            </div>
          }
        >
          <Button icon={<InfoCircleOutlined />} />
        </Tooltip>
      </Button.Group>
    </Container>
  )
}

export default BinaryDownload
