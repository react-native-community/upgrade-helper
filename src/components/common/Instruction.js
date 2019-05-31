import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Checkbox, Button } from 'antd'
import Markdown from './Markdown'

const InstructionCheckbox = styled(props => (
  <Checkbox
    {...props}
    checked={props.isDone}
    onChange={e => props.setIsDone(e.target.checked)}
  >
    <Markdown>{props.title}</Markdown>

    {props.children}
  </Checkbox>
))`
  display: block;
  text-decoration: ${props => (props.isDone ? 'line-through' : 'none')};
`

const ToggleInstructionDescriptionButton = styled(Button)`
  &,
  &:hover,
  &:focus {
    font-size: 13px;
    color: rgba(27, 31, 35, 0.5);
    width: 23px;
    height: 23px;
    border-color: transparent;
    margin-left: 10px;
    transform: ${props => (props.isOpened ? 'rotate(180deg)' : 'initial')};
    transition: transform 0.4s ease-in-out;
  }
`

const Instruction = ({ title, description, canBeChecked }) => {
  const [isDone, setIsDone] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  if (!canBeChecked) {
    return <Markdown forceBlock>{title.props.children}</Markdown>
  }

  return (
    <Fragment>
      <InstructionCheckbox
        isDone={isDone}
        setIsDone={setIsDone}
        title={title.props.children}
      >
        <ToggleInstructionDescriptionButton
          type="dashed"
          shape="circle"
          icon="caret-down"
          isOpened={isOpened}
          onClick={() => setIsOpened(!isOpened)}
        />
      </InstructionCheckbox>

      {description && isOpened && (
        <Markdown options={{ forceBlock: true }}>
          {description.props.children}
        </Markdown>
      )}
    </Fragment>
  )
}

Instruction.defaultProps = {
  canBeChecked: true
}

export default Instruction
