import React from 'react'
import Diff from './Diff'

const DiffSection = ({
  diff,
  getDiffKey,
  completedDiffs,
  isDoneSection,
  fromVersion,
  toVersion,
  handleCompleteDiff,
  selectedChanges,
  onToggleChangeSelection
}) =>
  diff.map(diffFile => {
    const diffKey = getDiffKey(diffFile)
    const isDiffCompleted = completedDiffs.includes(diffKey)

    // If the specific diff is done and this is being rendered in the
    // done section then we don't render anything
    if (!isDoneSection && isDiffCompleted) {
      return
    }

    return (
      <Diff
        key={`${diffFile.oldRevision}${diffFile.newRevision}`}
        {...diff}
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
  })

export default DiffSection
