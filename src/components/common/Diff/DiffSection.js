import React, { useState } from 'react'
import styled from 'styled-components'
import Diff from './Diff'

const Title = styled.h1`
  margin-top: 0.5em;
`

const DiffSection = ({
  diff,
  getDiffKey,
  title,
  completedDiffs,
  isDoneSection,
  fromVersion,
  toVersion,
  handleCompleteDiff,
  selectedChanges,
  onToggleChangeSelection
}) => {
  const [areAllCollapsed, setAllCollapsed] = useState(undefined)

  return (
    <div>
      {title && completedDiffs.length > 0 && <Title>{title}</Title>}

      {diff.map(diffFile => {
        const diffKey = getDiffKey(diffFile)
        const isDiffCompleted = completedDiffs.includes(diffKey)

        // If it's the "done" section, it shouldn't show if it's not completed
        if (isDoneSection !== isDiffCompleted) {
          return null
        }

        return (
          <Diff
            key={`${diffFile.oldRevision}${diffFile.newRevision}`}
            {...diffFile}
            // otakustay/react-diff-view#49
            type={diffFile.type === 'new' ? 'add' : diffFile.type}
            diffKey={diffKey}
            fromVersion={fromVersion}
            toVersion={toVersion}
            isDiffCompleted={completedDiffs.includes(diffKey)}
            onCompleteDiff={handleCompleteDiff}
            selectedChanges={selectedChanges}
            onToggleChangeSelection={onToggleChangeSelection}
            areAllCollapsed={areAllCollapsed}
            setAllCollapsed={setAllCollapsed}
          />
        )
      })}
    </div>
  )
}

export default DiffSection
