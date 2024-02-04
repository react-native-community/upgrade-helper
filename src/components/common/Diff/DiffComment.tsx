import React, { useState } from 'react'
import styled from '@emotion/styled'
import { HTMLMotionProps, motion } from 'framer-motion'
import { removeAppPathPrefix, getVersionsContentInDiff } from '../../../utils'
import Markdown from '../Markdown'
import type { Theme } from '../../../theme'
interface ContainerProps extends HTMLMotionProps<'div'> {
  isCommentOpen: boolean
  lineChangeType: 'add' | 'delete'
  theme?: Theme
}

const Container = styled(
  ({ isCommentOpen, children, ...props }: ContainerProps) => {
    return (
      <motion.div
        {...props}
        variants={{
          open: {
            height: 'auto',
          },
          hidden: { height: 10 },
        }}
        initial={isCommentOpen ? 'open' : 'hidden'}
        animate={isCommentOpen ? 'open' : 'hidden'}
        transition={{
          duration: 0.5,
        }}
        inherit={false}
      >
        <div children={children} />
      </motion.div>
    )
  }
)`
  overflow: hidden;

  & > div {
    display: flex;
    flex-direction: row;
    background-color: ${({ lineChangeType, theme }) => {
      const colorMap = {
        add: theme.diff.codeInsertBackground,
        delete: theme.diff.codeDeleteBackground,
      }

      return colorMap[lineChangeType] || theme.background
    }};
    cursor: pointer;
  }
`

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme
}
const ContentContainer = styled.div<ContentContainerProps>`
  flex: 1;
  position: relative;
  padding: 16px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.yellowBackground};}
  user-select: none;
`

interface ShowButtonProps extends DivProps {
  isCommentOpen: boolean
  theme?: Theme
}

const ShowButton = styled(({ isCommentOpen, ...props }: ShowButtonProps) => (
  <motion.div
    {...props}
    variants={{
      open: {
        scaleX: 1,
      },
      hidden: { scaleX: 10 },
    }}
    whileHover={{
      scale: 2,
    }}
    initial={isCommentOpen ? 'open' : 'hidden'}
    animate={isCommentOpen ? 'open' : 'hidden'}
    transition={{
      duration: 0.25,
    }}
  />
))`
  background-color: ${({ theme }) => theme.yellowBorder};
  margin-left: 20px;
  width: 10px;
  cursor: pointer;
`

const Content = styled(Markdown)`
  opacity: 1;
  ${({ isCommentOpen }) =>
    !isCommentOpen &&
    `
      opacity: 0;
    `}
  transition: opacity 0.25s ease-out;
`

const LINE_CHANGE_TYPES = {
  ADD: 'I',
  DELETE: 'D',
  NEUTRAL: 'N',
}

const getLineNumberWithType = ({
  lineChangeType,
  lineNumber,
}: {
  lineChangeType: 'add' | 'delete' | 'neutral'
  lineNumber: number
}) => `${LINE_CHANGE_TYPES[lineChangeType.toUpperCase()]}${lineNumber}`

const getComments = ({
  packageName,
  newPath,
  fromVersion,
  toVersion,
}: {
  packageName: string
  newPath: string
  fromVersion: string
  toVersion: string
}) => {
  const newPathSanitized = removeAppPathPrefix(newPath)

  const versionsInDiff = getVersionsContentInDiff({
    packageName,
    fromVersion,
    toVersion,
  }).filter(
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
          ),
        }
      },
      {}
    )

    return {
      ...allComments,
      ...comments,
    }
  }, {})
}

const DiffComment = ({ content, lineChangeType }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(true)

  return (
    <Container
      isCommentOpen={isCommentOpen}
      lineChangeType={lineChangeType}
      onClick={() => setIsCommentOpen(!isCommentOpen)}
    >
      <ShowButton
        isCommentOpen={isCommentOpen}
        onClick={() => setIsCommentOpen(!isCommentOpen)}
      />

      <ContentContainer>
        <Content isCommentOpen={isCommentOpen}>
          {content.props.children}
        </Content>
      </ContentContainer>
    </Container>
  )
}

export { getComments }
export default DiffComment
