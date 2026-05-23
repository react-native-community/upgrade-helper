import {
  getCompletedDiffsStorageKey,
  pruneCompletedDiffs,
  readCompletedDiffs,
  writeCompletedDiffs,
} from '../utils/completed-diffs-storage'

beforeEach(() => {
  localStorage.clear()
})

it('builds a completed diffs storage key with package, language, and version range', () => {
  expect(
    getCompletedDiffsStorageKey({
      packageName: 'react-native',
      language: 'typescript',
      fromVersion: '0.82.0',
      toVersion: '0.83.0',
    })
  ).toBe(
    'upgrade-helper:completed-diffs:react-native:typescript:0.82.0->0.83.0'
  )
})

it('reads only string diff keys from storage', () => {
  localStorage.setItem('completed-diffs', JSON.stringify(['a', 1, 'b', null]))

  expect(readCompletedDiffs('completed-diffs')).toEqual(['a', 'b'])
})

it('falls back to an empty list when storage data is invalid', () => {
  localStorage.setItem('completed-diffs', '{')

  expect(readCompletedDiffs('completed-diffs')).toEqual([])
})

it('writes completed diff keys to storage', () => {
  writeCompletedDiffs('completed-diffs', ['a', 'b'])

  expect(localStorage.getItem('completed-diffs')).toBe('["a","b"]')
})

it('prunes completed diff keys that are no longer in the current diff', () => {
  expect(pruneCompletedDiffs(['a', 'stale', 'b'], ['a', 'b'])).toEqual([
    'a',
    'b',
  ])
})
