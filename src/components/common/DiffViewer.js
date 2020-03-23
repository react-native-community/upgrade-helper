import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Alert } from 'antd'
import { parseDiff, withChangeSelect } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { getDiffPatchURL } from '../../utils'
import DiffSection from './Diff/DiffSection'
import DiffLoading from './Diff/DiffLoading'
import UsefulContentSection from './UsefulContentSection'
import ViewStyleOptions from './Diff/DiffViewStyleOptions'
import CompletedFilesCounter from './CompletedFilesCounter'
import { AppNameWarning } from './AppNameWarning'

const Container = styled.div`
  width: 90%;
`

const getDiffKey = ({ oldRevision, newRevision }) =>
  `${oldRevision}${newRevision}`

const scrollToRef = ref => ref.current.scrollIntoView({ behavior: 'smooth' })

const DiffViewer = ({
  showDiff,
  fromVersion,
  toVersion,
  selectedChanges,
  onToggleChangeSelection,
  appName
}) => {
  const [isLoading, setLoading] = useState(true)
  const [diff, setDiff] = useState(null)
  const [completedDiffs, setCompletedDiffs] = useState([])
  const [isGoToDoneClicked, setIsGoToDoneClicked] = useState(false)
  const donePopoverPossibleOpts = {
    done: {
      content: 'Scroll to Done section',
      cursorType: 's-resize'
    },
    top: {
      content: 'Scroll to Top',
      cursorType: 'n-resize'
    }
  }
  const [donePopoverOpts, setDonePopoverOpts] = useState(
    donePopoverPossibleOpts.done
  )
  const doneTitleRef = useRef(null)

  const scrollToDone = () => scrollToRef(doneTitleRef)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleCompletedFilesCounterClick = () => {
    setIsGoToDoneClicked(!isGoToDoneClicked)
    if (isGoToDoneClicked) {
      setDonePopoverOpts(donePopoverPossibleOpts.done)
      scrollToTop()
    } else {
      setDonePopoverOpts(donePopoverPossibleOpts.top)
      scrollToDone()
    }
  }

  const handleCompleteDiff = diffKey => {
    if (completedDiffs.includes(diffKey)) {
      return setCompletedDiffs(prevCompletedDiffs =>
        prevCompletedDiffs.filter(completedDiff => completedDiff !== diffKey)
      )
    }

    setCompletedDiffs(prevCompletedDiffs => [...prevCompletedDiffs, diffKey])
  }

  const renderUpgradeDoneMessage = ({ diff, completedDiffs }) =>
    diff.length === completedDiffs.length && (
      <Alert
        style={{ marginTop: 16 }}
        message="Your upgrade is done 🎉🎉"
        type="success"
        showIcon
        closable
      />
    )

  const resetCompletedDiff = () => setCompletedDiffs([])

  const [diffViewStyle, setViewStyle] = useState(
    localStorage.getItem('viewStyle') || 'split'
  )

  const handleViewStyleChange = newViewStyle => {
    setViewStyle(newViewStyle)
    localStorage.setItem('viewStyle', newViewStyle)
  }

  useEffect(() => {
    if (!showDiff) {
      return
    }

    const fetchDiff = async () => {
      setLoading(true)

      const response = await (
        await fetch(getDiffPatchURL({ fromVersion, toVersion }))
      ).text()

      setDiff(
        parseDiff(response).sort(({ newPath }) =>
          newPath.includes('package.json') ? -1 : 1
        )
      )

      resetCompletedDiff()

      setLoading(false)
    }

    const debounce = setTimeout(() => {
      fetchDiff()
    }, 750)
    return () => {
      clearTimeout(debounce)
    }
  }, [appName, fromVersion, showDiff, toVersion])

  if (!showDiff) {
    return null
  }

  if (isLoading) {
    return (
      <Container>
        <DiffLoading />
      </Container>
    )
  }

  const diffSectionProps = {
    diff: diff,
    getDiffKey: getDiffKey,
    completedDiffs: completedDiffs,
    fromVersion: fromVersion,
    toVersion: toVersion,
    handleCompleteDiff: handleCompleteDiff,
    selectedChanges: selectedChanges,
    onToggleChangeSelection: onToggleChangeSelection
  }

  return (
    <Container>
      <UsefulContentSection
        isLoading={isLoading}
        fromVersion={fromVersion}
        toVersion={toVersion}
      />

      <AppNameWarning />

      <ViewStyleOptions
        handleViewStyleChange={handleViewStyleChange}
        diffViewStyle={diffViewStyle}
      />

      <DiffSection
        {...diffSectionProps}
        isDoneSection={false}
        diffViewStyle={diffViewStyle}
        appName={appName}
      />

      {renderUpgradeDoneMessage({ diff, completedDiffs })}

      <DiffSection
        {...diffSectionProps}
        isDoneSection={true}
        title="Done"
        appName={appName}
        doneTitleRef={doneTitleRef}
      />

      <CompletedFilesCounter
        completed={completedDiffs.length}
        total={diff.length}
        onClick={handleCompletedFilesCounterClick}
        popoverContent={donePopoverOpts.content}
        popoverCursorType={donePopoverOpts.cursorType}
      />
    </Container>
  )
}

export default withChangeSelect({ multiple: true })(DiffViewer)
