import React, { useState, useCallback } from 'react'
import { Typography } from 'antd'
import styled from '@emotion/styled'
import semver from 'semver'
import Diff from './Diff'
import type { File } from 'gitdiff-parser'
import type { ViewType } from 'react-diff-view'

export const testIDs = {
  diffSection: 'diffSection',
}

const Title = styled(Typography.Title)`
  margin-top: 0.5em;
`

interface DiffSectionProps {
  packageName: string
  diff: any
  getDiffKey: (file: File) => string
  title?: string
  completedDiffs: string[]
  isDoneSection: boolean
  fromVersion: string
  toVersion: string
  handleCompleteDiff: (diffKey: string) => void
  selectedChanges: string[]
  onToggleChangeSelection: (diffKey: string) => void
  diffViewStyle: ViewType
  appName: string
  appPackage: string
  doneTitleRef?: React.RefObject<HTMLHeadingElement>
}

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
}: DiffSectionProps) => {
  const [areAllCollapsed, setAllCollapsed] = useState<boolean | undefined>(
    undefined
  )

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
        <Title ref={doneTitleRef} level={2}>
          {title}
        </Title>
      )}

      {diff.map((diffFile: File) => {
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
            key={diffKey}
            {...diffFile}
            packageName={packageName}
            // otakustay/react-diff-view#49
            // @ts-ignore-next-line
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
