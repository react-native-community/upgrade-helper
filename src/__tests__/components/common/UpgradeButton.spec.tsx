import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import UpgradeButton, {
  testIDs,
} from '../../../components/common/UpgradeButton'

const mockCopyToClipboard = jest.fn()

jest.mock('react-copy-to-clipboard', () => {
  const React = require('react') as typeof import('react')

  return {
    CopyToClipboard: ({
      children,
      text,
    }: {
      children: React.ReactElement
      text: string
    }) =>
      React.cloneElement(children, {
        onClick: () => mockCopyToClipboard(text),
      }),
  }
})

describe('UpgradeButton', () => {
  beforeEach(() => {
    mockCopyToClipboard.mockClear()
  })

  it('does not render the AI prompt button until the prompt is ready', () => {
    const { queryByTestId } = render(<UpgradeButton onShowDiff={jest.fn()} />)

    expect(queryByTestId(testIDs.aiPromptButton)).toBeNull()
  })

  it('shows the AI prompt button and copies the prompt when clicked', () => {
    const { getByTestId } = render(
      <UpgradeButton
        onShowDiff={jest.fn()}
        showAiPromptButton={true}
        aiPrompt="Upgrade prompt"
      />
    )

    fireEvent.click(getByTestId(testIDs.aiPromptButton))

    expect(mockCopyToClipboard).toHaveBeenCalledWith('Upgrade prompt')
  })
})
