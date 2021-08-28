import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Alert } from 'antd'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { withChangeSelect } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import DiffSection from './Diff/DiffSection'
import DiffLoading from './Diff/DiffLoading'
import UsefulContentSection from './UsefulContentSection'
import BinaryDownload from './BinaryDownload'
import ViewStyleOptions from './Diff/DiffViewStyleOptions'
import CompletedFilesCounter from './CompletedFilesCounter'
import { useFetchDiff } from '../../hooks/fetch-diff'

const Container = styled.div`
  width: 90%;
`

const TopContainer = styled.div`
  display: flex;
  position: relative;
  border-width: 1px;
  margin-top: 16px;
  flex-direction: row;
  justify-content: flex-end;
`

const getDiffKey = ({ oldRevision, newRevision }) =>
  `${oldRevision}${newRevision}`

const scrollToRef = ref => ref.current.scrollIntoView({ behavior: 'smooth' })

const DiffViewer = ({
  packageName,
  fromVersion,
  toVersion,
  shouldShowDiff,
  selectedChanges,
  onToggleChangeSelection,
  appName
}) => {
  const { isLoading, isDone, diff } = useFetchDiff({
    shouldShowDiff,
    packageName,
    fromVersion,
    toVersion
  })
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

  const resetCompletedDiffs = () => setCompletedDiffs([])

  const [diffViewStyle, setViewStyle] = useState(
    localStorage.getItem('viewStyle') || 'split'
  )

  const handleViewStyleChange = newViewStyle => {
    setViewStyle(newViewStyle)
    localStorage.setItem('viewStyle', newViewStyle)
  }

  useEffect(() => {
    if (!isDone) {
      resetCompletedDiffs()
    }
  }, [isDone])

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
          transition={{ duration: 0.5 }}
        >
          <UsefulContentSection
            isLoading={isLoading}
            packageName={packageName}
            fromVersion={fromVersion}
            toVersion={toVersion}
          />

          <TopContainer>
            <BinaryDownload
              diff={diff}
              fromVersion={fromVersion}
              toVersion={toVersion}
              appName={appName}
            />

            <ViewStyleOptions
              handleViewStyleChange={handleViewStyleChange}
              diffViewStyle={diffViewStyle}
            />
          </TopContainer>

          <DiffSection
            {...diffSectionProps}
            packageName={packageName}
            isDoneSection={false}
            diffViewStyle={diffViewStyle}
            appName={appName}
          />

          {renderUpgradeDoneMessage({ diff, completedDiffs })}

          <DiffSection
            {...diffSectionProps}
            packageName={packageName}
            isDoneSection={true}
            title="Done"
            appName={appName}
            doneTitleRef={doneTitleRef}
          />
        </motion.div>
      </AnimateSharedLayout>

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
