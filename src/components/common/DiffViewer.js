import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { parseDiff, withChangeSelect } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { getDiffPatchURL } from '../../utils'
import Diff from './Diff/Diff'
import Loading from './Loading'
import UsefulContentSection from './UsefulContentSection'

const Container = styled.div`
  width: 90%;
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
      <UsefulContentSection fromVersion={fromVersion} toVersion={toVersion} />

      {diff.map(diff => {
        const diffKey = getDiffKey(diff)

        return (
          <Diff
            key={`${diff.oldRevision}${diff.newRevision}`}
            {...diff}
            diffKey={diffKey}
            fromVersion={fromVersion}
            toVersion={toVersion}
            isDiffCompleted={completedDiffs.includes(diffKey)}
            onCompleteDiff={handleCompleteDiff}
            selectedChanges={selectedChanges}
            onToggleChangeSelection={onToggleChangeSelection}
          />
        )
      })}
    </Container>
  )
}

export default withChangeSelect({ multiple: true })(DiffViewer)
