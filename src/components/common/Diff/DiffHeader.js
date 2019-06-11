import React from 'react'
import styled from 'styled-components'
import { Tag, Icon, Button } from 'antd'

const removeAppPathPrefix = path => path.replace(/RnDiffApp\//, '')

const FileRenameArrow = styled(props => <Icon {...props} type="right" />)`
  font-size: 10px;
  margin: 0 5px;
  color: #f78206;
`

const FileName = ({ oldPath, newPath, type }) => {
  const oldPathSanitized = removeAppPathPrefix(oldPath)
  const newPathSanitized = removeAppPathPrefix(newPath)

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
  visible && (
    <Tag {...props} color="cyan">
      BINARY
    </Tag>
  )

const HeaderButtonsContainer = styled(
  ({ hasDiff, ...props }) => hasDiff && <div {...props} />
)`
  float: right;
`

const CompleteDiffButton = styled(
  ({ diffKey, isDiffCompleted, onCompleteDiff, ...props }) => (
    <Button
      {...props}
      type="ghost"
      shape="circle"
      icon="check"
      onClick={() => onCompleteDiff(diffKey)}
    />
  )
)`
  font-size: 12px;
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

const CollapseDiffButton = styled(
  ({ isDiffCollapsed, isDiffCompleted, ...props }) => (
    <Button {...props} type="link" icon="down" />
  )
)`
  color: #24292e;
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
    type,
    diffKey,
    hasDiff,
    isDiffCollapsed,
    setIsDiffCollapsed,
    isDiffCompleted,
    onCompleteDiff,
    ...props
  }) => (
    <div {...props}>
      <CollapseDiffButton
        isDiffCompleted={isDiffCompleted}
        isDiffCollapsed={isDiffCollapsed}
        onClick={() => setIsDiffCollapsed(!isDiffCollapsed)}
      />
      <FileName oldPath={oldPath} newPath={newPath} type={type} />{' '}
      <FileStatus type={type} />
      <BinaryBadge visible={!hasDiff} />
      <HeaderButtonsContainer hasDiff={hasDiff}>
        <CompleteDiffButton
          diffKey={diffKey}
          isDiffCompleted={isDiffCompleted}
          onCompleteDiff={onCompleteDiff}
        />
      </HeaderButtonsContainer>
    </div>
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
