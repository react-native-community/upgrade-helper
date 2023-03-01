import React from 'react'
import { Button, Popover as AntdPopover, Tooltip } from 'antd'
import styled from '@emotion/styled'
import DownloadFileButton from './DownloadFileButton'
import { removeAppPathPrefix } from '../../utils'

const Container = styled.div`
  padding-right: 10px;
`

const BinaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ index }) => (index % 2 === 0 ? '#fafbfc' : '#ffffff')};
  color: #24292e;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: 12px;
  width: 500px;
  max-width: 500px;
  padding: 10px 15px;
  border-bottom: 1px solid #e1e4e8;
`

const Popover = styled(({ className, ...props }) => (
  <AntdPopover overlayClassName={className} {...props} />
))`
  .ant-popover-inner-content {
    padding: 0;
    background: red;
  }
`

const BinaryList = ({ binaryFiles, toVersion, appName, packageName }) =>
  binaryFiles.map(({ newPath }, index) => {
    return (
      <BinaryRow key={index} index={index}>
        {removeAppPathPrefix(newPath, appName)}

        <DownloadFileButton
          visible={true}
          version={toVersion}
          path={newPath}
          packageName={packageName}
        />
      </BinaryRow>
    )
  })

const BinaryDownload = ({
  diff,
  fromVersion,
  toVersion,
  appName,
  packageName,
}) => {
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
