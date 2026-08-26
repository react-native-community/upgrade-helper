import { act, renderHook } from '@testing-library/react'
import {
  getCompletedDiffsStorageKey,
  getDiffIdentity,
  useCompletedDiffs,
} from '../../hooks/use-completed-diffs'

class MemoryStorage {
  private values = new Map<string, string>()

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

const reactNativeContext = {
  packageName: 'react-native',
  fromVersion: '0.76.0',
  toVersion: '0.77.0',
}

describe('useCompletedDiffs', () => {
  it('uses raw diff paths as the stable file identity', () => {
    expect(
      getDiffIdentity({
        oldPath: 'RnDiffApp/ios/RnDiffApp/AppDelegate.mm',
        newPath: 'MyApp/ios/MyApp/AppDelegate.mm',
      })
    ).toBe(
      '["RnDiffApp/ios/RnDiffApp/AppDelegate.mm","MyApp/ios/MyApp/AppDelegate.mm"]'
    )
  })

  it('creates a versioned key scoped to package, versions, and optional language', () => {
    expect(getCompletedDiffsStorageKey(reactNativeContext)).toBe(
      'upgrade-helper:completed-diffs:v1:package=react-native&from=0.76.0&to=0.77.0'
    )

    const cppKey = getCompletedDiffsStorageKey({
      packageName: 'react-native-windows',
      language: 'cpp',
      fromVersion: '0.76.0',
      toVersion: '0.77.0',
    })
    const csharpKey = getCompletedDiffsStorageKey({
      packageName: 'react-native-windows',
      language: 'cs',
      fromVersion: '0.76.0',
      toVersion: '0.77.0',
    })

    expect(cppKey).not.toBe(csharpKey)
  })

  it('hydrates only unique file identities that still exist in the diff', () => {
    const storage = new MemoryStorage()
    const storageKey = getCompletedDiffsStorageKey(reactNativeContext)
    storage.setItem(
      storageKey,
      JSON.stringify(['file-a', 'stale-file', 'file-a', 123, null])
    )

    const { result } = renderHook(() =>
      useCompletedDiffs({
        context: reactNativeContext,
        isDone: true,
        validDiffKeys: ['file-a', 'file-b'],
        storage,
      })
    )

    expect(result.current.completedDiffs).toEqual(['file-a'])
  })

  it('persists toggles and restores progress when the upgrade context changes', () => {
    const storage = new MemoryStorage()
    const secondContext = {
      ...reactNativeContext,
      toVersion: '0.78.0',
    }

    const { result, rerender } = renderHook(
      ({ context }) =>
        useCompletedDiffs({
          context,
          isDone: true,
          validDiffKeys: ['file-a', 'file-b'],
          storage,
        }),
      { initialProps: { context: reactNativeContext } }
    )

    act(() => result.current.handleCompleteDiff('file-a'))
    expect(result.current.completedDiffs).toEqual(['file-a'])

    rerender({ context: secondContext })
    expect(result.current.completedDiffs).toEqual([])

    act(() => result.current.handleCompleteDiff('file-b'))
    rerender({ context: reactNativeContext })
    expect(result.current.completedDiffs).toEqual(['file-a'])
  })

  it('keeps in-memory progress when browser storage is unavailable', () => {
    const storage = {
      getItem: () => {
        throw new Error('storage disabled')
      },
      setItem: () => {
        throw new Error('storage disabled')
      },
    }

    const { result, rerender } = renderHook(
      ({ context }) =>
        useCompletedDiffs({
          context,
          isDone: true,
          validDiffKeys: ['file-a'],
          storage,
        }),
      { initialProps: { context: reactNativeContext } }
    )

    act(() => result.current.handleCompleteDiff('file-a'))
    expect(result.current.completedDiffs).toEqual(['file-a'])

    rerender({
      context: {
        ...reactNativeContext,
        toVersion: '0.78.0',
      },
    })
    expect(result.current.completedDiffs).toEqual([])
  })
})
