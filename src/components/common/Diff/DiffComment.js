import React, { useState } from 'react'
import styled from '@emotion/styled'
import AnimateHeight from 'react-animate-height'
import { removeAppPathPrefix, getVersionsInDiff } from '../../../utils'
import Markdown from '../Markdown'

const lineColors = {
  add: '#d6fedb',
  delete: '#fdeff0',
  neutral: '#ffffff'
}

const Container = styled(({ isCommentVisible, className, ...props }) => (
  <AnimateHeight
    duration={500}
    delay={100}
    height={isCommentVisible ? 'auto' : 10}
    contentClassName={className}
    {...props}
  />
))`
  display: flex;
  flex-direction: row;
  background-color: ${({ lineChangeType }) => lineColors[lineChangeType]};
  overflow: hidden;
  cursor: pointer;
`

const Content = styled.div`
  flex: 1;
  position: relative;
  padding: 16px;
  color: #000;
  background-color: #fffbe6;
  user-select: none;
`

const ShowButton = styled.div`
  background-color: #ffe58f;
  margin-left: 20px;
  width: 10px;
  cursor: pointer;
  ${({ isCommentVisible }) =>
    !isCommentVisible &&
    `
      transform: scaleX(10);
    `}
  transition: transform 0.25s ease-out;

  &:hover {
    transform: ${({ isCommentVisible }) => isCommentVisible && 'scaleX(2);'};
  }
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
            <DiffComment content={content} lineChangeType={lineChangeType} />
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

const DiffComment = ({ content, lineChangeType }) => {
  const [isCommentVisible, setIsCommentVisible] = useState(true)

  return (
    <Container
      isCommentVisible={isCommentVisible}
      lineChangeType={lineChangeType}
      onClick={() => setIsCommentVisible(!isCommentVisible)}
    >
      <ShowButton
        isCommentVisible={isCommentVisible}
        onClick={() => setIsCommentVisible(!isCommentVisible)}
      />

      <Content isCommentVisible={isCommentVisible}>
        <Markdown>{content.props.children}</Markdown>
      </Content>
    </Container>
  )
}

export { getComments }
export default DiffComment
