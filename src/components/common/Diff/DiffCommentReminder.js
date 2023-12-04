import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { InfoCircleOutlined } from '@ant-design/icons'
import { getTransitionDuration } from '../../../utils'

const DiffCommentReminder = styled(
  ({ comments, isDiffCollapsed, uncollapseDiff, ...props }) => {
    const numberOfComments = Object.keys(comments).length
    const isOpen = isDiffCollapsed && numberOfComments > 0

    return (
      <motion.div
        {...props}
        variants={{
          open: { opacity: 1, cursor: 'pointer' },
          closed: { opacity: 0, cursor: 'initial' },
        }}
        animate={isOpen > 0 ? 'open' : 'closed'}
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
