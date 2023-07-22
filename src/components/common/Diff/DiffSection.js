import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import semver from 'semver'
import Diff from './Diff'

export const testIDs = {
  diffSection: 'diffSection',
}

const Title = styled.h1`
  margin-top: 0.5em;
`

const DiffSection = ({
  packageName,
  diff,
  getDiffKey,
  title,
  completedDiffs,
  isDoneSection,
  fromVersion,
  toVersion,
  handleCompleteDiff,
  selectedChanges,
  onToggleChangeSelection,
  diffViewStyle,
  appName,
  appPackage,
  doneTitleRef,
}) => {
  const [areAllCollapsed, setAllCollapsed] = useState(undefined)

  const getIsUpgradingFrom61To62 = useCallback(() => {
    const isUpgradingFrom61 = semver.satisfies(
      fromVersion,
      '>= 0.61.0 <= 0.62.0'
    )

    const isUpgradingTo62 = semver.satisfies(toVersion, '>= 0.62.0 <= 0.63.0')

    return isUpgradingFrom61 && isUpgradingTo62
  }, [fromVersion, toVersion])

  const isUpgradingFrom61To62 = getIsUpgradingFrom61To62()

  return (
    <div data-testid={testIDs.diffSection}>
      {title && completedDiffs.length > 0 && (
        <Title ref={doneTitleRef}>{title}</Title>
      )}

      {diff.map((diffFile) => {
        const diffKey = getDiffKey(diffFile)
        const isDiffCompleted = completedDiffs.includes(diffKey)

        // If it's the "done" section, it shouldn't show if it's not completed
        if (isDoneSection !== isDiffCompleted) {
          return null
        }

        // This is here because there was a change in the line-endings of the
        // `gradlew.bat` from version 0.61 to 0.62 which showed the entire file
        // as a big change
        if (
          isUpgradingFrom61To62 &&
          diffFile.oldPath.match(/gradlew.bat/) &&
          diffFile.newPath.match(/gradlew.bat/)
        ) {
          return null
        }

        return (
          <Diff
            key={`${diffFile.oldRevision}${diffFile.newRevision}`}
            {...diffFile}
            packageName={packageName}
            // otakustay/react-diff-view#49
            type={diffFile.type === 'new' ? 'add' : diffFile.type}
            diffKey={diffKey}
            diffViewStyle={diffViewStyle}
            fromVersion={fromVersion}
            toVersion={toVersion}
            isDiffCompleted={completedDiffs.includes(diffKey)}
            onCompleteDiff={handleCompleteDiff}
            selectedChanges={selectedChanges}
            onToggleChangeSelection={onToggleChangeSelection}
            areAllCollapsed={areAllCollapsed}
            setAllCollapsed={setAllCollapsed}
            appName={appName}
            appPackage={appPackage}
          />
        )
      })}
    </div>
  )
}

export default DiffSection
