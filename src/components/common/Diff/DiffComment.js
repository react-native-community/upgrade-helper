import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
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
  height: 16px;
  width: 16px;
  position: absolute;
  top: 1px;
  left: -10px;
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

const getComments = ({ newPath, fromVersion, toVersion }) => {
  const newPathSanitized = removeAppPathPrefix(newPath)

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
        icon={displayComment ? 'close' : 'message'}
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
