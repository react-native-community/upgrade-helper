import React, { useState, useEffect, useRef, useReducer } from 'react'
import styled from '@emotion/styled'
import { Alert } from 'antd'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  type ViewType,
  withChangeSelect,
  ChangeEventArgs,
} from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { getTransitionDuration, getChangelogURL } from '../../utils'
import DiffSection from './Diff/DiffSection'
import DiffLoading from './Diff/DiffLoading'
import UsefulContentSection from './UsefulContentSection'
import BinaryDownload from './BinaryDownload'
import ViewStyleOptions from './Diff/DiffViewStyleOptions'
import CompletedFilesCounter from './CompletedFilesCounter'
import { useFetchDiff } from '../../hooks/fetch-diff'
import type { Theme } from '../../theme'
import type { File } from 'gitdiff-parser'

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

const Link = styled.a<{ theme?: Theme }>`
  padding: 4px 15px;
  color: ${({ theme }) => theme.link};
`

const getDiffKey = ({
  oldRevision,
  newRevision,
}: {
  oldRevision: string
  newRevision: string
}) => `${oldRevision}${newRevision}`

const scrollToRef = (ref?: React.RefObject<HTMLElement>) =>
  ref?.current?.scrollIntoView({ behavior: 'smooth' })

// Lazy loaded content won't respect anchor links in the URL, so we have to help
// the viewport once we know our diff has loaded.
const jumpToAnchor = (stopScrolling: boolean) => {
  if (!window.location.hash || stopScrolling) {
    return true
  }
  const ref = document.getElementById(window.location.hash.slice(1))
  if (!ref) {
    return true
  }
  ref.scrollIntoView()
  return true
}

interface DiffViewerProps {
  packageName: string
  language: string
  fromVersion: string
  toVersion: string
  shouldShowDiff: boolean
  selectedChanges: string[]
  onToggleChangeSelection: (args: ChangeEventArgs) => void
  appName: string
  appPackage: string
}
const DiffViewer = ({
  packageName,
  language,
  fromVersion,
  toVersion,
  shouldShowDiff,
  selectedChanges,
  onToggleChangeSelection,
  appName,
  appPackage,
}: DiffViewerProps) => {
  const { isLoading, isDone, diff } = useFetchDiff({
    shouldShowDiff,
    packageName,
    language,
    fromVersion,
    toVersion,
  })
  const [completedDiffs, setCompletedDiffs] = useState<string[]>([])
  const [isGoToDoneClicked, setIsGoToDoneClicked] = useState<boolean>(false)
  const donePopoverPossibleOpts = {
    done: {
      content: 'Scroll to Done section',
      cursorType: 's-resize',
    },
    top: {
      content: 'Scroll to Top',
      cursorType: 'n-resize',
    },
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

  const handleCompleteDiff = (diffKey: string) => {
    if (completedDiffs.includes(diffKey)) {
      return setCompletedDiffs((prevCompletedDiffs) =>
        prevCompletedDiffs.filter((completedDiff) => completedDiff !== diffKey)
      )
    }

    setCompletedDiffs((prevCompletedDiffs) => [...prevCompletedDiffs, diffKey])
  }

  const renderUpgradeDoneMessage = ({
    diff,
    completedDiffs,
  }: {
    diff: File[]
    completedDiffs: string[]
  }) =>
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

  const [diffViewStyle, setViewStyle] = useState<ViewType>(
    (localStorage.getItem('viewStyle') || 'split') as ViewType
  )

  const handleViewStyleChange = (newViewStyle: ViewType) => {
    setViewStyle(newViewStyle)
    localStorage.setItem('viewStyle', newViewStyle)
  }

  const [, jumpToAnchorOnce] = useReducer(jumpToAnchor, false)

  let changelog
  if (!toVersion.includes('-rc')) {
    const href = getChangelogURL({ packageName, version: toVersion })
    changelog = (
      <Link href={href} target="_blank" rel="noreferrer">
        changelog
      </Link>
    )
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
    onToggleChangeSelection: onToggleChangeSelection,
  }

  return (
    <Container>
      <LayoutGroup>
        <motion.div
          initial={{ opacity: 0, translateY: 75 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: getTransitionDuration(0.5) }}
          onAnimationComplete={jumpToAnchorOnce}
        >
          <UsefulContentSection
            isLoading={isLoading}
            packageName={packageName}
            fromVersion={fromVersion}
            toVersion={toVersion}
          />

          <TopContainer>
            {changelog}

            <BinaryDownload
              diff={diff}
              fromVersion={fromVersion}
              toVersion={toVersion}
              appName={appName}
              packageName={packageName}
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
            appPackage={appPackage}
          />

          {renderUpgradeDoneMessage({ diff, completedDiffs })}

          <DiffSection
            {...diffSectionProps}
            packageName={packageName}
            isDoneSection={true}
            title="Done"
            diffViewStyle={diffViewStyle}
            appName={appName}
            appPackage={appPackage}
            doneTitleRef={doneTitleRef}
          />
        </motion.div>
      </LayoutGroup>

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

// @ts-ignore-next-line
export default withChangeSelect({ multiple: true })(DiffViewer)
