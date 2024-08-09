import React, { useState, useCallback, Fragment } from 'react'
import styled from '@emotion/styled'
import {
  Diff as RDiff,
  DiffProps as RDiffProps,
  Hunk,
  markEdits,
  tokenize,
  Decoration as DiffDecoration,
  HunkData,
  ViewType,
  DiffType,
  HunkTokens,
  TokenNode,
} from 'react-diff-view'
import DiffHeader from './DiffHeader'
import { getComments } from './DiffComment'
import { replaceAppDetails } from '../../../utils'
import type { Theme } from '../../../theme'
import type { ChangeEventArgs } from 'react-diff-view'
import type { DefaultRenderToken } from 'react-diff-view/types/context'

const copyPathPopoverContentOpts = {
  default: 'Copy file path',
  copied: 'File path copied!',
}

const Container = styled.div<{ theme?: Theme }>`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 3px;
  margin-bottom: 16px;
  margin-top: 16px;
  color: ${({ theme }) => theme.text};
`

const More = styled.div`
  margin-left: 30px;
  padding-left: 4px;
`

const Decoration = styled(DiffDecoration)<{ theme?: Theme }>`
  background-color: ${({ theme }) => theme.diff.decorationContentBackground};
  color: ${({ theme }) => theme.diff.decorationContent};
`

interface DiffViewProps extends RDiffProps {
  theme?: Theme
}
const DiffView = styled(RDiff)<DiffViewProps>`
  .diff-gutter-col {
    width: 30px;
  }

  tr.diff-line {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
  }

  td.diff-gutter .diff-line-normal {
    background-color: ${({ theme }) => theme.diff.gutterInsertBackground};
    border-color: ${({ theme }) => theme.greenBorder};
  }

  td.diff-gutter:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.textHover};
  }

  td.diff-code {
    font-size: 12px;
    color: ${({ theme }) => theme.text};
  }

  td.diff-gutter-omit:before {
    width: 0;
    background-color: transparent;
  }

  td.diff-widget-content {
    padding: 0;
  }

  // From diff global
  .diff {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    tab-size: 4;
    hyphens: none;
  }

  .diff::selection {
    background-color: ${({ theme }) => theme.diff.selectionBackground};
  }

  .diff-decoration {
    line-height: 2;
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier,
      monospace;
  }

  .diff-decoration-content {
    padding-left: 0.5em;
    background-color: ${({ theme }) => theme.diff.decorationContentBackground};
    color: ${({ theme }) => theme.diff.decorationContent};
  }

  .diff-gutter {
    padding: 0;
    text-align: center;
    font-size: 12px;
    cursor: auto;
  }

  .diff-gutter-insert {
    background-color: ${({ theme }) => theme.diff.gutterInsertBackground};
  }

  .diff-gutter-delete {
    background-color: ${({ theme }) => theme.diff.gutterDeleteBackground};
  }

  .diff-gutter-selected {
    background-color: ${({ theme }) => theme.diff.gutterSelectedBackground};
  }

  .diff-code-insert {
    background-color: ${({ theme }) => theme.diff.codeInsertBackground};
  }

  .diff-code-edit {
    color: inherit;
  }

  .diff-code-insert .diff-code-edit {
    background-color: ${({ theme }) => theme.diff.codeInsertEditBackground};
  }

  .diff-code-delete {
    background-color: ${({ theme }) => theme.diff.codeDeleteBackground};
  }

  .diff-code-delete .diff-code-edit {
    background-color: ${({ theme }) => theme.diff.codeDeleteEditBackground};
  }

  .diff-code-selected {
    background-color: ${({ theme }) => theme.diff.codeSelectedBackground};
  }

  .diff-decoration-gutter {
    background-color: ${({ theme }) => theme.diff.decorationGutterBackground};
    color: ${({ theme }) => theme.diff.decorationGutter};
  }
`

// Diff will be collapsed by default if the file has been deleted or has more than 5 hunks
const isDiffCollapsedByDefault = ({
  type,
  hunks,
}: {
  type: DiffType
  hunks: HunkData[]
}) => (type === 'delete' || hunks.length > 5 ? true : undefined)

const renderToken = (
  token: TokenNode,
  renderDefault: DefaultRenderToken,
  index: number
) => {
  switch (token.type) {
    case 'space':
      console.log(token)
      return (
        <span key={index} className="space">
          {token.children &&
            token.children.map((token, index) =>
              renderToken(token, renderDefault, index)
            )}
        </span>
      )
    default:
      return renderDefault(token, index)
  }
}

interface DiffProps {
  packageName: string
  oldPath: string
  newPath: string
  type: DiffType
  hunks: HunkData[]
  fromVersion: string
  toVersion: string
  diffKey: string
  isDiffCompleted: boolean
  onCompleteDiff: (diffKey: string) => void
  selectedChanges: string[]
  onToggleChangeSelection: (args: ChangeEventArgs) => void
  areAllCollapsed?: boolean
  setAllCollapsed: (collapse: boolean | undefined) => void
  diffViewStyle: ViewType
  appName: string
  appPackage: string
}

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
  appName,
  appPackage,
}: DiffProps) => {
  const [isDiffCollapsed, setIsDiffCollapsed] = useState<boolean>(
    isDiffCollapsedByDefault({ type, hunks }) || false
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
    (originalHunks: HunkData[]) => {
      if (!appName && !appPackage) {
        // No patching of rn-diff-purge output required.
        return originalHunks
      }

      return originalHunks.map((hunk) => ({
        ...hunk,
        changes: hunk.changes.map((change) => ({
          ...change,
          content: replaceAppDetails(change.content, appName, appPackage),
        })),
        content: replaceAppDetails(hunk.content, appName, appPackage),
      }))
    },
    [appName, appPackage]
  )

  if (areAllCollapsed !== undefined && areAllCollapsed !== isDiffCollapsed) {
    setIsDiffCollapsed(areAllCollapsed)
  } else if (isDiffCompleted && isDiffCollapsed === undefined) {
    setIsDiffCollapsed(true)
  }

  const diffComments = getComments({
    packageName,
    newPath,
    fromVersion,
    toVersion,
  })

  const updatedHunks: HunkData[] = React.useMemo(
    () => getHunksWithAppName(hunks),
    [hunks]
  )
  const tokens: HunkTokens = React.useMemo(
    () =>
      tokenize(hunks, {
        enhancers: [markEdits(updatedHunks)],
      }),
    [hunks, updatedHunks]
  )

  return (
    <Container>
      <DiffHeader
        oldPath={oldPath}
        newPath={newPath}
        fromVersion={fromVersion}
        toVersion={toVersion}
        type={type}
        diffKey={diffKey}
        hasDiff={hunks.length > 0}
        isDiffCollapsed={isDiffCollapsed}
        setIsDiffCollapsed={(collapsed: boolean, altKey?: boolean) => {
          if (altKey) {
            return setAllCollapsed(collapsed)
          }

          setAllCollapsed(undefined)
          setIsDiffCollapsed(collapsed)
        }}
        isDiffCompleted={isDiffCompleted}
        onCopyPathToClipboard={handleCopyPathToClipboard}
        copyPathPopoverContent={copyPathPopoverContent}
        resetCopyPathPopoverContent={handleResetCopyPathPopoverContent}
        onCompleteDiff={onCompleteDiff}
        appName={appName}
        appPackage={appPackage}
        diffComments={diffComments}
        packageName={packageName}
      />

      {!isDiffCollapsed && (
        <DiffView
          viewType={diffViewStyle}
          diffType={type}
          hunks={hunks}
          renderToken={renderToken}
          tokens={tokens}
          widgets={diffComments}
          optimizeSelection={true}
          selectedChanges={selectedChanges}
        >
          {(hunks: HunkData[]) =>
            hunks
              .map((_, i) => updatedHunks[i])
              .map((hunk) => (
                <Fragment key={hunk.content}>
                  <Decoration key={'decoration-' + hunk.content}>
                    <More>{hunk.content}</More>
                  </Decoration>
                  <Hunk
                    key={hunk.content}
                    hunk={hunk}
                    // @ts-ignore-next-line
                    gutterEvents={{ onClick: onToggleChangeSelection }}
                  />
                </Fragment>
              ))
          }
        </DiffView>
      )}
    </Container>
  )
}

/*
  Return true if passing `nextProps` to render would return
  the same result as passing prevProps to render, otherwise return false
*/
const arePropsEqual = (prevProps: DiffProps, nextProps: DiffProps) =>
  prevProps.isDiffCompleted === nextProps.isDiffCompleted &&
  prevProps.areAllCollapsed === nextProps.areAllCollapsed &&
  prevProps.diffViewStyle === nextProps.diffViewStyle &&
  prevProps.appName === nextProps.appName &&
  prevProps.appPackage === nextProps.appPackage

export default React.memo(Diff, arePropsEqual)
