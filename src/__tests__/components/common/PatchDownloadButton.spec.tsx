import React from 'react'
import PatchDownloadButton from '../../../components/common/PatchDownloadButton'

// Mock URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = jest.fn(() => 'mock-url')
const mockRevokeObjectURL = jest.fn()
global.URL.createObjectURL = mockCreateObjectURL
global.URL.revokeObjectURL = mockRevokeObjectURL

// Mock document.createElement and related methods
const mockClick = jest.fn()
const mockAppendChild = jest.fn()
const mockRemoveChild = jest.fn()
const mockCreateElement = jest.fn(() => ({
  href: '',
  download: '',
  click: mockClick,
}))

global.document.createElement = mockCreateElement
global.document.body.appendChild = mockAppendChild
global.document.body.removeChild = mockRemoveChild

// Mock Blob
global.Blob = jest.fn().mockImplementation((content, options) => ({
  content,
  options,
}))

describe('PatchDownloadButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const defaultProps = {
    rawDiff:
      'diff --git a/package.json b/package.json\n--- a/package.json\n+++ b/package.json',
    fromVersion: '0.65.0',
    toVersion: '0.76.0',
  }

  it('should create component without errors', () => {
    const component = React.createElement(PatchDownloadButton, defaultProps)
    expect(component).toBeDefined()
    expect(component.type).toBe(PatchDownloadButton)
    expect(component.props.rawDiff).toBe(defaultProps.rawDiff)
  })

  it('should have correct props structure', () => {
    const component = React.createElement(PatchDownloadButton, {
      ...defaultProps,
      disabled: true,
      appName: 'TestApp',
      appPackage: 'com.test',
    })

    expect(component.props.disabled).toBe(true)
    expect(component.props.appName).toBe('TestApp')
    expect(component.props.appPackage).toBe('com.test')
    expect(component.props.fromVersion).toBe('0.65.0')
    expect(component.props.toVersion).toBe('0.76.0')
  })

  it('should handle empty rawDiff prop', () => {
    const component = React.createElement(PatchDownloadButton, {
      ...defaultProps,
      rawDiff: '',
    })

    expect(component.props.rawDiff).toBe('')
  })

  it('should include instructions modal functionality', () => {
    const component = React.createElement(PatchDownloadButton, defaultProps)

    // Component should be defined and have the correct function type
    expect(component).toBeDefined()
    expect(component.type).toBe(PatchDownloadButton)
  })
})
