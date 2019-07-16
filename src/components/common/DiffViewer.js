import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'
import { parseDiff, withChangeSelect } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { getDiffPatchURL } from '../../utils'
import Diff from './Diff/Diff'
import DiffSection from './Diff/DiffSection'
import Loading from './Loading'
import UsefulContentSection from './UsefulContentSection'
import CompletedFilesCounter from './CompletedFilesCounter'

const Container = styled.div`
  width: 90%;
`
const Title = styled.h1`
  margin-top: 0.5em;
`

const getDiffKey = ({ oldRevision, newRevision }) =>
  `${oldRevision}${newRevision}`

const DiffViewer = ({
  showDiff,
  fromVersion,
  toVersion,
  selectedChanges,
  onToggleChangeSelection
}) => {
  const [isLoading, setLoading] = useState(true)
  const [diff, setDiff] = useState(null)
  const [completedDiffs, setCompletedDiffs] = useState([])

  const handleCompleteDiff = diffKey => {
    if (completedDiffs.includes(diffKey)) {
      return setCompletedDiffs(prevCompletedDiffs =>
        prevCompletedDiffs.filter(completedDiff => completedDiff !== diffKey)
      )
    }

    setCompletedDiffs(prevCompletedDiffs => [...prevCompletedDiffs, diffKey])
  }

  const resetCompletedDiff = () => setCompletedDiffs([])

  useEffect(() => {
    if (!showDiff) {
      return
    }

    const fetchDiff = async () => {
      setLoading(true)

      const response = await (await fetch(
        getDiffPatchURL({ fromVersion, toVersion })
      )).text()

      setDiff(
        parseDiff(response).sort(({ newPath }) =>
          newPath.includes('package.json') ? -1 : 1
        )
      )

      resetCompletedDiff()

      setLoading(false)
    }

    fetchDiff()
  }, [fromVersion, showDiff, toVersion])

  if (!showDiff) {
    return null
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <UsefulContentSection
        isLoading={isLoading}
        fromVersion={fromVersion}
        toVersion={toVersion}
      />
      <DiffSection
        isDoneSection={false}
        diff={diff}
        getDiffKey={getDiffKey}
        completedDiffs={completedDiffs}
        fromVersion={fromVersion}
        toVersion={toVersion}
        handleCompleteDiff={handleCompleteDiff}
        selectedChanges={selectedChanges}
        onToggleChangeSelection={onToggleChangeSelection}
      />
      {/* {diff.map(diff => {
        // Undone Section
        const diffKey = getDiffKey(diff)

        if (!completedDiffs.includes(diffKey)) {
          return (
            <Diff
              key={`${diff.oldRevision}${diff.newRevision}`}
              {...diff}
              // otakustay/react-diff-view#49
              type={diff.type === 'new' ? 'add' : diff.type}
              diffKey={diffKey}
              fromVersion={fromVersion}
              toVersion={toVersion}
              isDiffCompleted={completedDiffs.includes(diffKey)}
              onCompleteDiff={handleCompleteDiff}
              selectedChanges={selectedChanges}
              onToggleChangeSelection={onToggleChangeSelection}
            />
          )
        }
        return nullscD
      })} */}
      {completedDiffs.length > 0 ? <Title>Done</Title> : null}
      {diff.length === completedDiffs.length ? (
        <Alert
          message="Your upgrade is done 🎉🎉"
          type="success"
          showIcon
          closable
        />
      ) : null}
      {diff.map(diff => {
        // Done Section
        const diffKey = getDiffKey(diff)
        if (completedDiffs.includes(diffKey)) {
          return (
            <Diff
              key={`${diff.oldRevision}${diff.newRevision}`}
              {...diff}
              // otakustay/react-diff-view#49
              type={diff.type === 'new' ? 'add' : diff.type}
              diffKey={diffKey}
              fromVersion={fromVersion}
              toVersion={toVersion}
              isDiffCompleted={completedDiffs.includes(diffKey)}
              onCompleteDiff={handleCompleteDiff}
              selectedChanges={selectedChanges}
              onToggleChangeSelection={onToggleChangeSelection}
            />
          )
        }
        return null
      })}

      <CompletedFilesCounter
        completed={completedDiffs.length}
        total={diff.length}
      />
    </Container>
  )
}

export default withChangeSelect({ multiple: true })(DiffViewer)
