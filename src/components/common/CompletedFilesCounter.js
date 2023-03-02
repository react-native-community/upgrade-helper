import React from 'react'
import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import Confetti from 'react-dom-confetti'
import { Popover } from 'antd'

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

const CompletedFilesCounter = styled(
  ({ completed, total, popoverContent, popoverCursorType, ...props }) => (
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
  background: #d5eafd;
  padding: 10px;
  border: 1px solid #1890ff;
  border-radius: 20px;
  color: #7dadda;
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
    color: #1890ff;
  }
`

export default CompletedFilesCounter
