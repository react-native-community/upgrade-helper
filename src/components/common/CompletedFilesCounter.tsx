import React from 'react'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import Confetti from 'react-dom-confetti'
import { Popover } from 'antd'
import type { Theme } from '../../theme'

const shake = keyframes`
  0% {
    transform: translate(0, 0);
  }

  10%, 90% {
    transform: translate(0, -2px);
  }

  20%, 80% {
    transform: translate(0, 3px);
  }

  30%, 50%, 70% {
    transform: translate(0, -5px);
  }

  40%, 60% {
    transform: translate(0, 5px);
  }
`

interface CompletedFilesCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  completed: number
  total: number
  popoverContent: string
  popoverCursorType: React.CSSProperties['cursor']
  theme?: Theme
}

const CompletedFilesCounter = styled(
  ({
    completed,
    total,
    popoverContent,
    popoverCursorType,
    ...props
  }: CompletedFilesCounterProps) => (
    <div {...props}>
      <Popover
        content={popoverContent}
        trigger="hover"
        placement="right"
        overlayStyle={{
          position: 'fixed',
        }}
      >
        <span className="completedAmount">
          {completed === 0 ? 1 : completed}
        </span>{' '}
        /{total}
      </Popover>
      <Confetti
        active={completed === total}
        config={{
          elementCount: 200,
          angle: 130,
          startVelocity: 30,
        }}
      />
    </div>
  )
)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({ theme }) => theme.popover.background};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.popover.border};
  border-radius: 20px;
  color: ${({ theme }) => theme.popover.text};
  transform: ${({ completed }) =>
    completed ? 'translateY(0px)' : 'translateY(70px)'};
  display: flex;
  align-self: flex-end;
  transition: transform 0.3s;
  cursor: ${({ popoverCursorType }) => popoverCursorType};
  ${({ completed, total }) =>
    completed === total &&
    css`
      transform: translateY(70px);
      animation: ${shake};
      animation-duration: 1.5s;
    `}

  .completedAmount {
    color: ${({ theme }) => theme.popover.border};
  }
`

export default CompletedFilesCounter
