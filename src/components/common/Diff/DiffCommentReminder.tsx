import React from 'react'
import styled from '@emotion/styled'
import { motion, HTMLMotionProps } from 'framer-motion'
import { InfoCircleOutlined } from '@ant-design/icons'
import { getTransitionDuration } from '../../../utils'
import type { Theme } from '../../../theme'
import type { ReleaseCommentT } from '../../../releases/types'

interface DiffCommentReminderProps extends HTMLMotionProps<'div'> {
  comments: ReleaseCommentT[]
  isDiffCollapsed: boolean
  uncollapseDiff: () => void
  theme?: Theme
}

const DiffCommentReminder = styled(
  ({
    comments,
    isDiffCollapsed,
    uncollapseDiff,
    ...props
  }: DiffCommentReminderProps) => {
    const numberOfComments = Object.keys(comments).length
    const isOpen = isDiffCollapsed && numberOfComments > 0

    return (
      <motion.div
        {...props}
        variants={{
          open: { opacity: 1, cursor: 'pointer' },
          closed: { opacity: 0, cursor: 'initial' },
        }}
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          duration: getTransitionDuration(0.5),
        }}
        onClick={uncollapseDiff}
      >
        <InfoCircleOutlined className="icon" />

        <span className="reminder">
          {numberOfComments} hidden comment{numberOfComments > 1 && 's'}
        </span>
      </motion.div>
    )
  }
)`
  display: inline;
  background-color: ${({ theme }) => theme.yellowBackground};
  padding: 5px;
  border-radius: 3px;
  margin-left: 10px;
  border: 1px solid ${({ theme }) => theme.yellowBorder};

  & > .icon {
    margin-right: 6px;
  }

  & > .reminder {
    word-spacing: -2px;
  }
`

export default DiffCommentReminder
