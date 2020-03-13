import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { Tag, Button, Popover } from 'antd'
import {
  CheckOutlined,
  DownloadOutlined,
  DownOutlined,
  RightOutlined
} from '@ant-design/icons'
import { removeAppPathPrefix, getBinaryFileURL } from '../../../utils'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const FileRenameArrow = styled(RightOutlined)({
  fontSize: '10px',
  margin: '0 5px',
  color: '#f78206'
})

const FileName = ({ oldPath, newPath, type, appName }) => {
  const oldPathSanitized = removeAppPathPrefix(oldPath, appName)
  const newPathSanitized = removeAppPathPrefix(newPath, appName)

  if (type === 'delete') {
    return <span>{oldPathSanitized}</span>
  }

  if (oldPathSanitized !== newPathSanitized && type !== 'add') {
    return (
      <span>
        {oldPathSanitized} <FileRenameArrow /> {newPathSanitized}
      </span>
    )
  }

  return <span>{newPathSanitized}</span>
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

const CompleteDiffButton = styled(({ visible, onClick, ...props }) =>
  visible ? (
    <Popover content="↩️">
      <Button
        {...props}
        type="ghost"
        shape="circle"
        icon={<CheckOutlined />}
        onClick={onClick}
      />
    </Popover>
  ) : (
    <Button
      {...props}
      type="ghost"
      shape="circle"
      icon={<CheckOutlined />}
      onClick={onClick}
    />
  )
)`
  font-size: 13px;
  line-height: 0;
  border-width: 0px;
  width: 20px;
  height: 20px;
  margin: 5px 8px 0;
  &,
  &:hover,
  &:focus {
    color: ${({ isDiffCompleted }) =>
      isDiffCompleted ? '#52c41a' : '#24292e'};
  }
`

const CollapseClickableArea = styled.div`
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

const DiffHeader = styled(
  ({
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
    appName,
    ...props
  }) => (
    <Wrapper {...props}>
      <CollapseClickableArea
        onClick={({ altKey }) => setIsDiffCollapsed(!isDiffCollapsed, altKey)}
      >
        <CollapseDiffButton
          visible={hasDiff}
          isDiffCollapsed={isDiffCollapsed}
        />
        <FileName
          oldPath={oldPath}
          newPath={newPath}
          type={type}
          appName={appName}
        />{' '}
        <FileStatus type={type} />
        <BinaryBadge visible={!hasDiff} />
      </CollapseClickableArea>
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
)`
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
`

export default DiffHeader
