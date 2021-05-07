import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { Tag, Button, Popover } from 'antd'
import {
  CheckOutlined,
  DownloadOutlined,
  DownOutlined,
  RightOutlined,
  CopyOutlined,
  RollbackOutlined
} from '@ant-design/icons'
import {
  removeAppPathPrefix,
  getBinaryFileURL,
  replaceWithProvidedAppName
} from '../../../utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DiffCommentReminder from './DiffCommentReminder'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: 12px;
  color: #24292e;
  line-height: 32px;
  background-color: #fafbfc;
  border-bottom: 1px solid #e1e4e8;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  padding: 5px 10px;
  position: sticky;
  top: 0;
`

const FileRenameArrow = styled(RightOutlined)({
  fontSize: '10px',
  margin: '0 5px',
  color: '#f78206'
})

const getFilePathsToShow = ({ oldPath, newPath, appName }) => {
  const oldPathSanitized = replaceWithProvidedAppName(oldPath, appName)
  const newPathSanitized = replaceWithProvidedAppName(newPath, appName)

  return {
    oldPath: removeAppPathPrefix(oldPathSanitized, appName),
    newPath: removeAppPathPrefix(newPathSanitized, appName)
  }
}

const FileName = ({ oldPath, newPath, type }) => {
  if (type === 'delete') {
    return <span>{oldPath}</span>
  }

  if (oldPath !== newPath && type !== 'add') {
    return (
      <span>
        {oldPath} <FileRenameArrow /> {newPath}
      </span>
    )
  }

  return <span>{newPath}</span>
}

const FileStatus = ({ type, ...props }) => {
  const colors = {
    add: 'blue',
    modify: 'green',
    delete: 'red',
    rename: 'orange'
  }

  const labels = {
    add: 'ADDED',
    modify: 'MODIFIED',
    delete: 'DELETED',
    rename: 'RENAMED'
  }

  return (
    <Tag {...props} color={colors[type]}>
      {labels[type]}
    </Tag>
  )
}

const BinaryBadge = ({ visible, ...props }) =>
  visible ? (
    <Tag {...props} color="cyan">
      BINARY
    </Tag>
  ) : null

const DownloadFileButton = styled(({ visible, version, path, ...props }) =>
  visible ? (
    <Button
      {...props}
      type="ghost"
      shape="circle"
      icon={<DownloadOutlined />}
      target="_blank"
      href={getBinaryFileURL({ version, path })}
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

const ViewFileButton = styled(({ visible, version, path, ...props }) =>
  visible ? (
    <Button
      {...props}
      type="link"
      target="_blank"
      href={getBinaryFileURL({ version, path })}
    >
      View file
    </Button>
  ) : null
)`
  font-size: 12px;
  color: #24292e;
`

const defaultIconButtonStyle = `
  font-size: 13px;
  line-height: 0;
  border-width: 0px;
  width: 22px;
  height: 22px;
  margin: 5px 0;
  border-radius: 50%;
`

const CompleteDiffButton = styled(({ visible, onClick, ...props }) =>
  visible ? (
    <Button
      {...props}
      type="ghost"
      icon={<RollbackOutlined />}
      onClick={onClick}
    />
  ) : (
    <Button
      {...props}
      type="ghost"
      icon={<CheckOutlined />}
      onClick={onClick}
    />
  )
)`
  ${defaultIconButtonStyle}
  &,
  &:hover,
  &:focus {
    color: ${({ isDiffCompleted }) =>
      isDiffCompleted ? '#52c41a' : '#24292e'};
  }
`

const CopyPathToClipboardButton = styled(
  ({
    oldPath,
    newPath,
    type,
    onCopy,
    copyPathPopoverContent,
    resetCopyPathPopoverContent,
    ...props
  }) => (
    <CopyToClipboard text={type === 'add' ? newPath : oldPath} onCopy={onCopy}>
      <Popover
        content={copyPathPopoverContent}
        trigger="hover"
        overlayStyle={{
          width: '175px',
          textAlign: 'center'
        }}
      >
        <Button
          {...props}
          type="ghost"
          icon={<CopyOutlined />}
          onMouseOver={resetCopyPathPopoverContent}
        />
      </Popover>
    </CopyToClipboard>
  )
)`
  ${defaultIconButtonStyle}
`

const CollapseClickableArea = styled.div`
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
`

const CollapseDiffButton = styled(({ visible, isDiffCollapsed, ...props }) =>
  visible ? <Button {...props} type="link" icon={<DownOutlined />} /> : null
)`
  color: #24292e;
  margin-right: 2px;
  font-size: 10px;
  transform: ${({ isDiffCollapsed }) =>
    isDiffCollapsed ? 'rotate(-90deg)' : 'initial'};
  transition: transform 0.2s ease-in-out;
  transform-origin: center;
  line-height: 0;
  height: auto;
  &:hover,
  &:focus {
    color: #24292e;
  }
`

const DiffHeader = ({
  oldPath,
  newPath,
  toVersion,
  type,
  diffKey,
  hasDiff,
  isDiffCollapsed,
  setIsDiffCollapsed,
  isDiffCompleted,
  onCompleteDiff,
  onCopyPathToClipboard,
  copyPathPopoverContent,
  resetCopyPathPopoverContent,
  appName,
  diffComments,
  ...props
}) => {
  const sanitizedFilePaths = getFilePathsToShow({ oldPath, newPath, appName })

  return (
    <Wrapper {...props}>
      <div>
        <CollapseClickableArea
          onClick={({ altKey }) => setIsDiffCollapsed(!isDiffCollapsed, altKey)}
        >
          <CollapseDiffButton
            visible={hasDiff}
            isDiffCollapsed={isDiffCollapsed}
          />
          <FileName
            oldPath={sanitizedFilePaths.oldPath}
            newPath={sanitizedFilePaths.newPath}
            type={type}
            appName={appName}
          />{' '}
          <FileStatus type={type} />
          <BinaryBadge visible={!hasDiff} />
        </CollapseClickableArea>
        <CopyPathToClipboardButton
          oldPath={sanitizedFilePaths.oldPath}
          newPath={sanitizedFilePaths.newPath}
          type={type}
          onCopy={onCopyPathToClipboard}
          copyPathPopoverContent={copyPathPopoverContent}
          resetCopyPathPopoverContent={resetCopyPathPopoverContent}
        />

        <DiffCommentReminder
          comments={diffComments}
          isDiffCollapsed={isDiffCollapsed}
          uncollapseDiff={() => setIsDiffCollapsed(false)}
        />
      </div>
      <div>
        <Fragment>
          <ViewFileButton
            visible={hasDiff && type !== 'delete'}
            version={toVersion}
            path={newPath}
          />
          <DownloadFileButton
            visible={!hasDiff && type !== 'delete'}
            version={toVersion}
            path={newPath}
          />
          <CompleteDiffButton
            visible={isDiffCompleted}
            onClick={() => onCompleteDiff(diffKey)}
          />
        </Fragment>
      </div>
    </Wrapper>
  )
}

export default DiffHeader
