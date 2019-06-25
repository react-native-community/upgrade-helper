import '../releases/__mocks__/index'
import { getVersionsInDiff } from '../utils'

describe('getVersionsInDiff', () => {
  it('returns the versions in the provided range', () => {
    const versions = getVersionsInDiff({
      fromVersion: '0.57.0',
      toVersion: '0.59.0'
    })

    expect(versions).toEqual([{ version: '0.59' }, { version: '0.58' }])
  })

  it('returns the versions in the provided range with release candidates', () => {
    const versions = getVersionsInDiff({
      fromVersion: '0.56.0',
      toVersion: '0.59.0-rc.1'
    })

    expect(versions).toEqual([
      { version: '0.59' },
      { version: '0.58' },
      { version: '0.57' }
    ])
  })

  it('returns the versions in the provided range with patches specified', () => {
    const versions = getVersionsInDiff({
      fromVersion: '0.57.2',
      toVersion: '0.59.9'
    })

    expect(versions).toEqual([{ version: '0.59' }, { version: '0.58' }])
  })
})
