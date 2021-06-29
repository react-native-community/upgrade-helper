import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from '@emotion/styled'
import { Alert } from 'antd'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { parseDiff, withChangeSelect } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { getDiffPatchURL, getTransitionDuration } from '../../utils'
import DiffSection from './Diff/DiffSection'
import DiffLoading from './Diff/DiffLoading'
import UsefulContentSection from './UsefulContentSection'
import ViewStyleOptions from './Diff/DiffViewStyleOptions'
import CompletedFilesCounter from './CompletedFilesCounter'

const delay = ms => new Promise(res => setTimeout(res, ms))

const Container = styled.div`
  width: 90%;
`

const getDiffKey = ({ oldRevision, newRevision }) =>
  `${oldRevision}${newRevision}`

const scrollToRef = ref => ref.current.scrollIntoView({ behavior: 'smooth' })

const DiffViewer = ({
  shouldShowDiff,
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

  const handleFetchDiff = useCallback(async () => {
    setLoading(true)
    resetCompletedDiff()

    const [response] = await Promise.all([
      fetch(getDiffPatchURL({ fromVersion, toVersion })),
      delay(getTransitionDuration(300))
    ])

    const diff = await response.text()

    setDiff(
      parseDiff(diff).sort(({ newPath }) =>
        newPath.includes('package.json') ? -1 : 1
      )
    )

    setLoading(false)
  }, [fromVersion, toVersion])

  useEffect(() => {
    if (!shouldShowDiff) {
      return
    }

    handleFetchDiff()
  }, [handleFetchDiff, shouldShowDiff])

  if (!shouldShowDiff) {
    return null
  }

  if (isLoading) {
    return (
      <Container>
        <AnimatePresence>
          <DiffLoading />
        </AnimatePresence>
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
      <AnimateSharedLayout>
        <motion.div
          initial={{ opacity: 0, translateY: 75 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: getTransitionDuration(0.5) }}
        >
          <UsefulContentSection
            isLoading={isLoading}
            fromVersion={fromVersion}
            toVersion={toVersion}
          />

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
        </motion.div>
      </AnimateSharedLayout>
    </Container>
  )
}

export default withChangeSelect({ multiple: true })(DiffViewer)
