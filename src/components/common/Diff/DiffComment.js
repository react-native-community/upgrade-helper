import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { CloseOutlined, MessageOutlined } from '@ant-design/icons'
import { removeAppPathPrefix, getVersionsInDiff } from '../../../utils'
import Markdown from '../Markdown'

const CommentContainer = styled.div`
  position: relative;
`

const CommentContent = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 3px;
  color: #000;
`

const CommentButton = styled(Button)`
  min-width: initial;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -1px;
  left: 5px;
  font-size: 8px;
  cursor: 'pointer';
`

const LINE_CHANGE_TYPES = {
  ADD: 'I',
  DELETE: 'D',
  NEUTRAL: 'N'
}

const getLineNumberWithType = ({ lineChangeType, lineNumber }) =>
  `${LINE_CHANGE_TYPES[lineChangeType.toUpperCase()]}${lineNumber}`

const getComments = ({ newPath, fromVersion, toVersion, appName }) => {
  const newPathSanitized = removeAppPathPrefix(newPath, appName)

  const versionsInDiff = getVersionsInDiff({ fromVersion, toVersion }).filter(
    ({ comments }) =>
      comments &&
      comments.length > 0 &&
      comments.some(({ fileName }) => fileName === newPathSanitized)
  )

  return versionsInDiff.reduce((allComments, version) => {
    const comments = version.comments.reduce(
      (versionComments, { fileName, lineChangeType, lineNumber, content }) => {
        if (fileName !== newPathSanitized) {
          return versionComments
        }

        return {
          ...versionComments,
          [getLineNumberWithType({ lineChangeType, lineNumber })]: (
            <DiffComment content={content} />
          )
        }
      },
      {}
    )

    return {
      ...allComments,
      ...comments
    }
  }, {})
}

const DiffComment = ({ content }) => {
  const [displayComment, toggleComment] = useState(true)

  return (
    <CommentContainer>
      <CommentButton
        shape="circle"
        type="primary"
        onClick={() => toggleComment(!displayComment)}
        icon={displayComment ? <CloseOutlined /> : <MessageOutlined />}
      />
      {displayComment && (
        <CommentContent>
          <Markdown>{content.props.children}</Markdown>
        </CommentContent>
      )}
    </CommentContainer>
  )
}

export { getComments }
export default DiffComment
