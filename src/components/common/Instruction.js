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
  margin-left: 0px;
`

const ToggleInstructionDescriptionButton = styled(Button)`
  &,
  &:hover,
  &:focus {
    font-size: 9px;
    color: rgba(27, 31, 35, 0.7);
    width: 23px;
    height: 23px;
    border-color: transparent;
    margin-left: 5px;
    transform: ${props => (props.isOpened ? 'rotate(180deg)' : 'initial')};
    transition: transform 0.4s ease-in-out;
  }
`

const Instruction = ({ title, description, canBeChecked = true }) => {
  const [isDone, setIsDone] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const titleContent = Array.isArray(title.props.children)
    ? title.props.children.join('')
    : title.props.children

  if (!canBeChecked) {
    return <Markdown forceBlock>{titleContent}</Markdown>
  }

  return (
    <Fragment>
      <InstructionCheckbox
        isDone={isDone}
        setIsDone={setIsDone}
        title={titleContent}
      >
        {description && (
          <ToggleInstructionDescriptionButton
            type="dashed"
            shape="circle"
            icon="down"
            isOpened={isOpened}
            onClick={() => setIsOpened(!isOpened)}
          />
        )}
      </InstructionCheckbox>

      {description && isOpened && (
        <Markdown options={{ forceBlock: true }}>
          {Array.isArray(description.props.children)
            ? description.props.children.join('')
            : description.props.children}
        </Markdown>
      )}
    </Fragment>
  )
}

export default Instruction
