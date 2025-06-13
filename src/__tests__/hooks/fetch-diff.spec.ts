import { renderHook, waitFor } from '@testing-library/react'
import { useFetchDiff } from '../../hooks/fetch-diff'

// Mock the getDiffURL function
jest.mock('../../utils', () => ({
  getDiffURL: jest.fn(() => 'mock-diff-url'),
}))

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('useFetchDiff', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const defaultProps = {
    shouldShowDiff: true,
    packageName: 'react-native',
    language: 'javascript',
    fromVersion: '0.65.0',
    toVersion: '0.76.0',
  }

  const mockDiffResponse = `diff --git a/package.json b/package.json
index 1234567..abcdefg 100644
--- a/package.json
+++ b/package.json
@@ -1,5 +1,5 @@
 {
   "name": "RnDiffApp",
-  "version": "0.65.0",
+  "version": "0.76.0",
   "scripts": {
     "start": "react-native start"`

  it('should return initial loading state', () => {
    mockFetch.mockResolvedValue({
      text: () => Promise.resolve(mockDiffResponse),
    })

    const { result } = renderHook(() => useFetchDiff(defaultProps))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isDone).toBe(false)
    expect(result.current.diff).toEqual([])
    expect(result.current.rawDiff).toBe('')
  })

  it('should fetch and parse diff data successfully', async () => {
    mockFetch.mockResolvedValue({
      text: () => Promise.resolve(mockDiffResponse),
    })

    const { result } = renderHook(() => useFetchDiff(defaultProps))

    await waitFor(() => {
      expect(result.current.isDone).toBe(true)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isDone).toBe(true)
    expect(result.current.diff).toHaveLength(1)
    expect(result.current.rawDiff).toBe(mockDiffResponse)
  })

  it('should expose raw diff data', async () => {
    mockFetch.mockResolvedValue({
      text: () => Promise.resolve(mockDiffResponse),
    })

    const { result } = renderHook(() => useFetchDiff(defaultProps))

    await waitFor(() => {
      expect(result.current.rawDiff).toBe(mockDiffResponse)
    })

    expect(result.current.rawDiff).toContain('diff --git a/package.json')
    expect(result.current.rawDiff).toContain('0.65.0')
    expect(result.current.rawDiff).toContain('0.76.0')
  })

  it('should not fetch when shouldShowDiff is false', () => {
    const { result } = renderHook(() =>
      useFetchDiff({ ...defaultProps, shouldShowDiff: false })
    )

    expect(mockFetch).not.toHaveBeenCalled()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isDone).toBe(false)
    expect(result.current.rawDiff).toBe('')
  })

  it('should move package.json to top of diff list', async () => {
    const multiFileDiff = `diff --git a/android/build.gradle b/android/build.gradle
index 1234567..abcdefg 100644
--- a/android/build.gradle
+++ b/android/build.gradle
@@ -1,3 +1,3 @@
-buildscript {
+buildScript {
 }

diff --git a/package.json b/package.json
index 1234567..abcdefg 100644
--- a/package.json
+++ b/package.json
@@ -1,5 +1,5 @@
 {
   "name": "RnDiffApp",
-  "version": "0.65.0",
+  "version": "0.76.0"`

    mockFetch.mockResolvedValue({
      text: () => Promise.resolve(multiFileDiff),
    })

    const { result } = renderHook(() => useFetchDiff(defaultProps))

    await waitFor(() => {
      expect(result.current.isDone).toBe(true)
    })

    expect(result.current.diff).toHaveLength(2)
    expect(result.current.diff[0].newPath).toContain('package.json')
  })
})
