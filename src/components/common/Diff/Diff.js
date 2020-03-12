import React, { useEffect, useState } from 'react'
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

const Container = styled.div`
  border: 1px solid #ddd;
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
`

// Diff will be collapsed by default if the file has been deleted or has more than 5 hunks
const isDiffCollapsedByDefault = ({ type, hunks }) =>
  type === 'delete' || hunks.length > 5 ? true : undefined

const Diff = ({
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
  const [isPathCopiedToClipboard, setIsPathCopiedToClipboard] = useState(false)

  const handleCopyPathToClipboard = () => {
    setIsPathCopiedToClipboard(true)
  }

  useEffect(() => {
    if (isPathCopiedToClipboard === true) {
      setTimeout(() => {
        setIsPathCopiedToClipboard(false)
      }, 5000)
    }
  }, [isPathCopiedToClipboard])

  if (areAllCollapsed !== undefined && areAllCollapsed !== isDiffCollapsed) {
    setIsDiffCollapsed(areAllCollapsed)
  } else if (isDiffCompleted && isDiffCollapsed === undefined) {
    setIsDiffCollapsed(true)
  }

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
        isPathCopiedToClipboard={isPathCopiedToClipboard}
        onCompleteDiff={onCompleteDiff}
        appName={appName}
      />

      {!isDiffCollapsed && (
        <DiffView
          viewType={diffViewStyle}
          diffType={type}
          hunks={hunks}
          widgets={getComments({ newPath, fromVersion, toVersion, appName })}
          optimizeSelection={true}
          selectedChanges={selectedChanges}
        >
          {hunks => {
            const options = {
              enhancers: [markEdits(hunks)]
            }

            const tokens = tokenize(hunks, options)

            return hunks.map(hunk => [
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
  prevProps.diffViewStyle === nextProps.diffViewStyle

export default React.memo(Diff, arePropsEqual)
