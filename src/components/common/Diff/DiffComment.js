import React from 'react'
import styled from 'styled-components'
import semver from 'semver'
import { versions } from '../../../releases'
import { removeAppPathPrefix } from '../../../utils'
import Markdown from '../Markdown'

const Container = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 3px;
  color: #000;
`

const LINE_CHANGE_TYPES = {
  ADD: 'I',
  DELETE: 'D',
  NEUTRAL: 'N'
}

const releasedVersions = versions.map(version => ({
  ...require(`../../../releases/${version}`).default,
  version
}))

const getLineNumberWithType = ({ lineChangeType, lineNumber }) =>
  `${LINE_CHANGE_TYPES[lineChangeType.toUpperCase()]}${lineNumber}`

const getComments = ({ newPath, fromVersion, toVersion }) => {
  const newPathSanitized = removeAppPathPrefix(newPath)

  const versionsInDiff = releasedVersions.filter(
    ({ version, comments }) =>
      (semver.lt(version, toVersion) || semver.gt(version, fromVersion)) &&
      comments.some(({ fileName }) => fileName === newPathSanitized)
  )

  return versionsInDiff.reduce((allComments, version) => {
    const comments = version.comments.reduce(
      (versionComments, { lineChangeType, lineNumber, content }) => ({
        ...versionComments,
        [getLineNumberWithType({ lineChangeType, lineNumber })]: (
          <DiffComment content={content} />
        )
      }),
      {}
    )

    return {
      ...allComments,
      ...comments
    }
  }, {})
}

const DiffComment = ({ content }) => {
  return (
    <Container>
      <Markdown>{content.props.children}</Markdown>
    </Container>
  )
}

export { getComments }
export default DiffComment
