import React from 'react'
import styled from '@emotion/styled'
import { Tag, Button, Popover } from 'antd'
import {
  CheckOutlined,
  DownOutlined,
  RightOutlined,
  CopyOutlined,
  RollbackOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { getFilePathsToShow } from '../../../utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DiffCommentReminder from './DiffCommentReminder'
import DownloadFileButton from '../DownloadFileButton'
import ViewFileButton from '../ViewFileButton'
import CopyFileButton from '../CopyFileButton'

export const testIDs = {
  collapseClickableArea: 'collapseClickableArea',
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  line-height: 32px;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  padding: 5px 10px;
  position: sticky;
  top: 0;
`

const FileRenameArrow = styled(RightOutlined)({
  fontSize: '10px',
  margin: '0 5px',
  color: '#f78206',
})

const FileName = ({ oldPath, newPath, type, appName }) => {
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

function generatePathId(oldPath, newPath) {
  const isMoved = oldPath !== newPath
  if (newPath === '/dev/null') {
    newPath = 'deleted'
  }
  const path = isMoved ? oldPath + '-' + newPath : oldPath
  return encodeURIComponent(path.replace(/[/\\]/g, '-'))
}

const FileStatus = ({ type, ...props }) => {
  const colors = {
    add: 'blue',
    modify: 'green',
    delete: 'red',
    rename: 'orange',
  }

  const labels = {
    add: 'ADDED',
    modify: 'MODIFIED',
    delete: 'DELETED',
    rename: 'RENAMED',
  }

  return (
    <Tag {...props} color={colors[type]}>
      {labels[type]}
    </Tag>
  )
}

const BinaryBadge = ({ open, ...props }) =>
  open ? (
    <Tag {...props} color="cyan">
      BINARY
    </Tag>
  ) : null

const defaultIconButtonStyle = `
  font-size: 13px;
`

const CompleteDiffButton = styled(({ open, onClick, ...props }) =>
  open ? (
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
    color: ${({ isDiffCompleted, theme }) =>
      isDiffCompleted ? '#52c41a' : theme.text};
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
          textAlign: 'center',
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

const copyAnchorLinks = {
  default: 'Click to copy anchor link',
  copied: 'Anchor link copied!',
}

const CopyAnchorLinksToClipboardButton = styled(
  ({ id, type, onCopy, fromVersion, toVersion, ...props }) => {
    const [content, setContent] = React.useState(copyAnchorLinks.default)
    const resetContent = () => setContent(copyAnchorLinks.default)
    const onCopyContent = () => setContent(copyAnchorLinks.copied)

    const url = React.useMemo(() => {
      const url = new URL(window.location)
      url.hash = id
      url.searchParams.set('from', fromVersion)
      url.searchParams.set('to', toVersion)
      return url.toString()
    }, [id])

    return (
      <CopyToClipboard text={url} onCopy={onCopyContent}>
        <Popover
          content={content}
          trigger="hover"
          overlayStyle={{
            width: '175px',
            textAlign: 'center',
          }}
        >
          <Button
            {...props}
            type="ghost"
            icon={<LinkOutlined />}
            onMouseOver={resetContent}
          />
        </Popover>
      </CopyToClipboard>
    )
  }
)`
  ${defaultIconButtonStyle}
`

const CollapseClickableArea = styled.div`
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
`

const CollapseDiffButton = styled(({ open, isDiffCollapsed, ...props }) =>
  open ? <Button {...props} type="link" icon={<DownOutlined />} /> : null
)`
  color: ${({ theme }) => theme.text};
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
    color: ${({ theme }) => theme.text};
  }
`

const DiffHeader = ({
  oldPath,
  newPath,
  fromVersion,
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
  appPackage,
  diffComments,
  packageName,
  ...props
}) => {
  const sanitizedFilePaths = getFilePathsToShow({
    oldPath,
    newPath,
    appName,
    appPackage,
  })

  const id = React.useMemo(
    () => generatePathId(oldPath, newPath),
    [oldPath, newPath]
  )

  return (
    <Wrapper id={id} {...props}>
      <div>
        <CollapseClickableArea
          data-testid={testIDs.collapseClickableArea}
          onClick={({ altKey }) => setIsDiffCollapsed(!isDiffCollapsed, altKey)}
        >
          <CollapseDiffButton
            open={hasDiff}
            isDiffCollapsed={isDiffCollapsed}
          />
          <FileName
            oldPath={sanitizedFilePaths.oldPath}
            newPath={sanitizedFilePaths.newPath}
            type={type}
            appName={appName}
          />{' '}
          <FileStatus type={type} />
          <BinaryBadge open={!hasDiff} />
        </CollapseClickableArea>
        <CopyPathToClipboardButton
          oldPath={sanitizedFilePaths.oldPath}
          newPath={sanitizedFilePaths.newPath}
          type={type}
          onCopy={onCopyPathToClipboard}
          copyPathPopoverContent={copyPathPopoverContent}
          resetCopyPathPopoverContent={resetCopyPathPopoverContent}
        />
        <CopyAnchorLinksToClipboardButton
          id={id}
          type={type}
          fromVersion={fromVersion}
          toVersion={toVersion}
        />

        <DiffCommentReminder
          comments={diffComments}
          isDiffCollapsed={isDiffCollapsed}
          uncollapseDiff={() => setIsDiffCollapsed(false)}
        />
      </div>
      <div>
        <ViewFileButton
          open={hasDiff && type !== 'delete'}
          version={toVersion}
          path={newPath}
          packageName={packageName}
        />
        <CopyFileButton
          open={hasDiff && type !== 'delete'}
          version={toVersion}
          path={newPath}
          packageName={packageName}
          appName={appName}
          appPackage={appPackage}
        />
        <DownloadFileButton
          open={!hasDiff && type !== 'delete'}
          version={toVersion}
          path={newPath}
          packageName={packageName}
        />
        <CompleteDiffButton
          open={isDiffCompleted}
          onClick={() => onCompleteDiff(diffKey)}
        />
      </div>
    </Wrapper>
  )
}

export default DiffHeader
