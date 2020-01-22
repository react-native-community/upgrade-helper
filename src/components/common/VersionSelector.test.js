import R from 'ramda'

import { filterReleases, isRC } from './VersionSelector'

describe('rc checker', () => {
  it('should detect rc releases correctly', () => {
    expect(isRC('0.62.0')).toBe(false)
    expect(isRC('0.62.0-rc.0')).toBe(true)
  })
})

const releases = [
  '0.63.2-rc.1',
  '0.63.2-rc.0',
  '0.63.1',
  '0.63.0',
  '0.62.4',
  '0.62.4-rc.1',
  '0.62.4-rc.0',
  '0.62.3',
  '0.62.1',
  '0.62.0',
  '0.62.0-rc.1',
  '0.61.3'
]
const releasesNoRCs = R.reject(isRC)(releases)
// console.log(releasesNoRCs)
const releasesNoRCsWithLatestReleaseRCs = [
  '0.63.2-rc.1',
  '0.63.2-rc.0',
  ...releasesNoRCs
]
const releasesBeforeMax = [
  '0.62.4',
  '0.62.4-rc.1',
  '0.62.4-rc.0',
  '0.62.3',
  '0.62.1',
  '0.62.0',
  '0.62.0-rc.1',
  '0.61.3'
]
const releasesAfterMin = [
  '0.63.2-rc.1',
  '0.63.2-rc.0',
  '0.63.1',
  '0.63.0',
  '0.62.4',
  '0.62.4-rc.1',
  '0.62.4-rc.0',
  '0.62.3',
  '0.62.1'
]
const releasesBetweenMinAndMax = [
  '0.62.4',
  '0.62.4-rc.1',
  '0.62.4-rc.0',
  '0.62.3',
  '0.62.1'
]

describe('release filtering', () => {
  it('should return the correct releases', () => {
    // expect(filterReleases(releasesWithRCs)).toBe(releasesWithRCs)
    expect(filterReleases(releases, {})).toEqual(releases)

    expect(filterReleases(releases, { showRCs: 'all' })).toEqual(releases)
    expect(filterReleases(releases, { showRCs: 'none' })).toEqual(releasesNoRCs)
    expect(filterReleases(releases, { showRCs: 'latest' })).toEqual(
      releasesNoRCsWithLatestReleaseRCs
    )

    expect(filterReleases(releases, { maxVersion: '0.62.4' })).toEqual(
      releasesBeforeMax
    )

    expect(filterReleases(releases, { minVersion: '0.62.1' })).toEqual(
      releasesAfterMin
    )

    expect(
      filterReleases(releases, { minVersion: '0.62.1', maxVersion: '0.62.4' })
    ).toEqual(releasesBetweenMinAndMax)
  })
})
