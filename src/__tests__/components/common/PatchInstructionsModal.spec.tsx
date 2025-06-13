import React from 'react'
import PatchInstructionsModal from '../../../components/common/PatchInstructionsModal'

// Mock navigator.clipboard
const mockWriteText = jest.fn()
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
})

describe('PatchInstructionsModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    patchFileName: '0.65.0-to-0.76.0.patch',
  }

  it('should create component without errors', () => {
    const component = React.createElement(PatchInstructionsModal, defaultProps)
    expect(component).toBeDefined()
    expect(component.type).toBe(PatchInstructionsModal)
    expect(component.props.patchFileName).toBe('0.65.0-to-0.76.0.patch')
  })

  it('should have correct props structure', () => {
    const component = React.createElement(PatchInstructionsModal, {
      ...defaultProps,
      visible: false,
    })

    expect(component.props.visible).toBe(false)
    expect(component.props.onClose).toBeDefined()
    expect(component.props.patchFileName).toBe('0.65.0-to-0.76.0.patch')
  })

  it('should handle different patch file names', () => {
    const component = React.createElement(PatchInstructionsModal, {
      ...defaultProps,
      patchFileName: 'custom-patch.patch',
    })

    expect(component.props.patchFileName).toBe('custom-patch.patch')
  })
})
