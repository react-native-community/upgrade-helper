import { PACKAGE_NAMES } from '../constants'
import '../releases/__mocks__/index'
import { getVersionsContentInDiff, getChangelogURL } from '../utils'

describe('getVersionsContentInDiff', () => {
  it('returns the versions in the provided range', () => {
    const versions = getVersionsContentInDiff({
      packageName: PACKAGE_NAMES.RN,
      fromVersion: '0.57.0',
      toVersion: '0.59.0',
    })

    expect(versions).toEqual([{ version: '0.59' }, { version: '0.58' }])
  })

  it('returns the versions in the provided range with release candidates', () => {
    const versions = getVersionsContentInDiff({
      packageName: PACKAGE_NAMES.RN,
      fromVersion: '0.56.0',
      toVersion: '0.59.0-rc.1',
    })

    expect(versions).toEqual([
      { version: '0.59' },
      { version: '0.58' },
      { version: '0.57' },
    ])
  })

  it('returns the versions in the provided range with patches specified', () => {
    const versions = getVersionsContentInDiff({
      packageName: PACKAGE_NAMES.RN,
      fromVersion: '0.57.2',
      toVersion: '0.59.9',
    })

    expect(versions).toEqual([{ version: '0.59' }, { version: '0.58' }])
  })
})

describe('getChangelogURL', () => {
  const { RN, RNM, RNW } = PACKAGE_NAMES
  test.each([
    [
      RN,
      '0.71.7',
      'https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0717',
    ],
    [
      RN,
      '0.71.6',
      'https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0716',
    ],
    [
      RNM,
      '0.71.5',
      'https://github.com/microsoft/react-native-macos/releases/tag/v0.71.5',
    ],
    [
      RNW,
      '0.71.4',
      'https://github.com/microsoft/react-native-windows/releases/tag/react-native-windows_v0.71.4',
    ],
  ])('getChangelogURL("%s", "%s") -> %s', (packageName, version, url) => {
    expect(getChangelogURL({ packageName, version })).toEqual(url)
  })
})
