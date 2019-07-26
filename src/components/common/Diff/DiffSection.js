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
  let diffRefMap = {}

  const toggleAll = collapse => {
    for (let diffKey in diffRefMap) {
      let diffRef = diffRefMap[diffKey] && diffRefMap[diffKey].current
      if (diffRef && diffRef.isDiffCollapsed !== collapse) {
        diffRef.setIsDiffCollapsed(collapse)
      }
    }
  }

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

        // If a ref already exist for the given diffKey, use it. Otherwise, create a new one.
        diffRefMap[diffKey] = diffRefMap[diffKey] || React.createRef()

        return (
          <Diff
            key={`${diffFile.oldRevision}${diffFile.newRevision}`}
            ref={diffRefMap[diffKey]}
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
            toggleAll={collapse => toggleAll(collapse)}
          />
        )
      })}
    </div>
  )
}

export default DiffSection
