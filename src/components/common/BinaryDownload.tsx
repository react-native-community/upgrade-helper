import React from 'react'
import { Button, Popover as AntdPopover, Tooltip } from 'antd'
import type { PopoverProps as AntdPopoverProps } from 'antd'
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
        <Tooltip
          placement="top"
          title="Binaries updated within the version range"
        >
          <Button>Binaries</Button>
        </Tooltip>
      </Popover>
    </Container>
  )
}

export default BinaryDownload
