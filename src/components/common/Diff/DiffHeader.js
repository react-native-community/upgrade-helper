import React from 'react'
import styled from 'styled-components'
import { Tag, Icon, Button } from 'antd'
import { removeAppPathPrefix } from '../../../utils'

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

const CollapseDiffButton = styled(({ isDiffCollapsed, ...props }) => (
  <Button {...props} type="link" icon="up" />
))`
  color: #24292e;
  font-size: 10px;
  transform: ${({ isDiffCollapsed }) =>
    isDiffCollapsed ? 'rotate(-180deg)' : 'initial'};
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
    hasDiff,
    isDiffCollapsed,
    setIsDiffCollapsed,
    ...props
  }) => (
    <div {...props}>
      <FileName oldPath={oldPath} newPath={newPath} type={type} />{' '}
      <FileStatus type={type} />
      <BinaryBadge visible={!hasDiff} />
      <HeaderButtonsContainer hasDiff={hasDiff}>
        <CollapseDiffButton
          isDiffCollapsed={isDiffCollapsed}
          onClick={() => setIsDiffCollapsed(!isDiffCollapsed)}
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
