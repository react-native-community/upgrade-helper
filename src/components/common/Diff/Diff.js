import React, { useState } from 'react'
import styled from 'styled-components'
import { Diff as RDiff, Hunk, markEdits, tokenize } from 'react-diff-view'
import DiffHeader from './DiffHeader'
import { getComments } from './DiffComment'

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 16px;
  margin-top: 16px;
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
  type === 'delete' || hunks.length > 5

const Diff = ({
  oldPath,
  newPath,
  type,
  hunks,
  fromVersion,
  toVersion,
  selectedChanges,
  onToggleChangeSelection
}) => {
  const [isDiffCollapsed, setIsDiffCollapsed] = useState(
    isDiffCollapsedByDefault({ type, hunks })
  )

  return (
    <Container>
      <DiffHeader
        oldPath={oldPath}
        newPath={newPath}
        type={type}
        hasDiff={hunks.length > 0}
        isDiffCollapsed={isDiffCollapsed}
        setIsDiffCollapsed={setIsDiffCollapsed}
      />

      {!isDiffCollapsed && (
        <DiffView
          viewType="split"
          diffType={type}
          hunks={hunks}
          widgets={getComments({ newPath, fromVersion, toVersion })}
          selectedChanges={selectedChanges}
        >
          {hunks => {
            const options = {
              enhancers: [markEdits(hunks)]
            }

            const tokens = tokenize(hunks, options)

            return hunks.map(hunk => (
              <Hunk
                key={hunk.content}
                hunk={hunk}
                tokens={tokens}
                gutterEvents={{ onClick: onToggleChangeSelection }}
              />
            ))
          }}
        </DiffView>
      )}
    </Container>
  )
}

export default Diff
