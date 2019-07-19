import React from 'react'
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
  return (
    <div>
      {title && completedDiffs.length > 0 ? <Title>{title}</Title> : null}
      {diff.map(diffFile => {
        const diffKey = getDiffKey(diffFile)
        const isDiffCompleted = completedDiffs.includes(diffKey)

        // If the specific diff is done and this is being rendered in the
        // done section then we don't render anything

        if (!isDoneSection) {
          if (isDiffCompleted) {
            return
          }
        } else {
          if (!isDiffCompleted) {
            return
          }
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
          />
        )
      })}
    </div>
  )
}

export default DiffSection
