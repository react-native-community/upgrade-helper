import React, { useState, useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import {
  Diff as RDiff,
  Hunk,
  markEdits,
  tokenize,
  Decoration as DiffDecoration
} from 'react-diff-view'
import DiffHeader from './DiffHeader'
import { getComments } from './DiffComment'
import { replaceWithProvidedAppName } from '../../../utils'
import { useReleases } from '../../../ReleaseProvider'

const copyPathPopoverContentOpts = {
  default: 'Click to copy file path',
  copied: 'File path copied!'
}

const Container = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  margin-bottom: 16px;
  margin-top: 16px;
`

const More = styled.div`
  background-color: #f1f8ff;
  margin-left: 30px;
  padding-left: 4px;
  color: '#1b1f23b3';
`

const Decoration = styled(DiffDecoration)`
  background-color: #dbedff;
`

const DiffView = styled(RDiff)`
  .diff-gutter-col {
    width: 30px;
  }

  tr.diff-line {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
  }

  td.diff-gutter {
    color: rgba(27, 31, 35, 0.3);
    padding: 0;
    text-align: center;
    font-size: 12px;
    cursor: auto;
  }

  td.diff-gutter .diff-line-normal {
    background-color: #cdffd8;
    border-color: #bef5cb;
  }

  td.diff-gutter:hover {
    cursor: pointer;
    color: rgba(27, 31, 35, 0.6);
  }

  td.diff-code {
    font-size: 12px;
    color: #24292e;
  }

  td.diff-code-insert .diff-code-edit {
    background-color: #acf2bd;
  }

  td.diff-gutter-omit:before {
    width: 0;
    background-color: transparent;
  }

  td.diff-widget-content {
    padding: 0;
  }
`

// Diff will be collapsed by default if the file has been deleted or has more than 5 hunks
const isDiffCollapsedByDefault = ({ type, hunks }) =>
  type === 'delete' || hunks.length > 5 ? true : undefined

const Diff = ({
  packageName,
  oldPath,
  newPath,
  type,
  hunks,
  fromVersion,
  toVersion,
  diffKey,
  isDiffCompleted,
  onCompleteDiff,
  selectedChanges,
  onToggleChangeSelection,
  areAllCollapsed,
  setAllCollapsed,
  diffViewStyle,
  appName
}) => {
  const [isDiffCollapsed, setIsDiffCollapsed] = useState(
    isDiffCollapsedByDefault({ type, hunks })
  )

  const [copyPathPopoverContent, setCopyPathPopoverContent] = useState(
    copyPathPopoverContentOpts.default
  )

  const handleCopyPathToClipboard = () => {
    setCopyPathPopoverContent(copyPathPopoverContentOpts.copied)
  }

  const handleResetCopyPathPopoverContent = () => {
    if (copyPathPopoverContent === copyPathPopoverContentOpts.copied) {
      setCopyPathPopoverContent(copyPathPopoverContentOpts.default)
    }
  }

  const getHunksWithAppName = useCallback(
    originalHunks => {
      if (!appName) {
        return originalHunks
      }

      return originalHunks.map(hunk => ({
        ...hunk,
        changes: hunk.changes.map(change => ({
          ...change,
          content: replaceWithProvidedAppName(change.content, appName)
        }))
      }))
    },
    [appName]
  )

  useEffect(() => {
    if (areAllCollapsed !== undefined && areAllCollapsed !== isDiffCollapsed) {
      setIsDiffCollapsed(areAllCollapsed)
    } else if (isDiffCompleted && isDiffCollapsed === undefined) {
      setIsDiffCollapsed(true)
    }
  }, [areAllCollapsed, isDiffCollapsed, isDiffCompleted])

  const { releases } = useReleases()
  const diffComments = getComments({
    versions: releases,
    newPath,
    fromVersion,
    toVersion,
    appName
  })

  return (
    <Container>
      <DiffHeader
        oldPath={oldPath}
        newPath={newPath}
        toVersion={toVersion}
        type={type}
        diffKey={diffKey}
        hasDiff={hunks.length > 0}
        isDiffCollapsed={isDiffCollapsed}
        setIsDiffCollapsed={(collapse, altKey) => {
          if (altKey) {
            return setAllCollapsed(collapse)
          }

          setAllCollapsed(undefined)
          setIsDiffCollapsed(collapse)
        }}
        isDiffCompleted={isDiffCompleted}
        onCopyPathToClipboard={handleCopyPathToClipboard}
        copyPathPopoverContent={copyPathPopoverContent}
        resetCopyPathPopoverContent={handleResetCopyPathPopoverContent}
        onCompleteDiff={onCompleteDiff}
        appName={appName}
        diffComments={diffComments}
        packageName={packageName}
      />

      {!isDiffCollapsed && (
        <DiffView
          viewType={diffViewStyle}
          diffType={type}
          hunks={hunks}
          widgets={diffComments}
          optimizeSelection={true}
          selectedChanges={selectedChanges}
        >
          {originalHunks => {
            const updatedHunks = getHunksWithAppName(originalHunks)

            const options = {
              enhancers: [markEdits(updatedHunks)]
            }

            const tokens = tokenize(updatedHunks, options)

            return updatedHunks.map(hunk => [
              <Decoration key={'decoration-' + hunk.content}>
                <More>{hunk.content}</More>
              </Decoration>,
              <Hunk
                key={hunk.content}
                hunk={hunk}
                tokens={tokens}
                gutterEvents={{ onClick: onToggleChangeSelection }}
              />
            ])
          }}
        </DiffView>
      )}
    </Container>
  )
}

/*
  Return true if passing `nextProps` to render would return
  the same result as passing prevProps to render, otherwise return false
*/
const arePropsEqual = (prevProps, nextProps) =>
  prevProps.isDiffCompleted === nextProps.isDiffCompleted &&
  prevProps.areAllCollapsed === nextProps.areAllCollapsed &&
  prevProps.diffViewStyle === nextProps.diffViewStyle &&
  prevProps.appName === nextProps.appName

export default React.memo(Diff, arePropsEqual)
