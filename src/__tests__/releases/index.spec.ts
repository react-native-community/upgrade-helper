import releases from '../../releases/index'
import { PACKAGE_NAMES } from '../../constants'

describe('Releases index', () => {
  it('should include React Native 0.76 in the versions list', () => {
    const rnReleases = releases[PACKAGE_NAMES.RN]
    expect(rnReleases).toBeDefined()
    expect(Array.isArray(rnReleases)).toBe(true)

    const version076 = rnReleases.find((release) => release.version === '0.76')
    expect(version076).toBeDefined()
    expect(version076?.usefulContent).toBeDefined()
    expect(version076?.usefulContent.description).toBeDefined()
    expect(version076?.usefulContent.links).toBeDefined()
    expect(Array.isArray(version076?.usefulContent.links)).toBe(true)
  })

  it('should load React Native 0.76 release content correctly', () => {
    const rnReleases = releases[PACKAGE_NAMES.RN]
    const version076 = rnReleases.find((release) => release.version === '0.76')

    expect(version076).toBeDefined()
    expect(version076?.usefulContent.links).toHaveLength(2)

    const blogPostLink = version076?.usefulContent.links.find(
      (link) =>
        link.title ===
        'Official blog post about the major changes on React Native 0.76'
    )
    expect(blogPostLink?.url).toBe(
      'https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture'
    )

    const newArchLink = version076?.usefulContent.links.find(
      (link) => link.title === 'New Architecture documentation'
    )
    expect(newArchLink?.url).toBe(
      'https://reactnative.dev/docs/the-new-architecture/landing-page'
    )
  })

  it('should include React Native 0.65 in the versions list', () => {
    const rnReleases = releases[PACKAGE_NAMES.RN]
    const version065 = rnReleases.find((release) => release.version === '0.65')
    expect(version065).toBeDefined()
    expect(version065?.usefulContent).toBeDefined()
    expect(version065?.usefulContent.description).toBeDefined()
    expect(version065?.usefulContent.links).toBeDefined()
    expect(Array.isArray(version065?.usefulContent.links)).toBe(true)
  })

  it('should maintain proper version ordering with 0.76 and 0.65 included', () => {
    const rnReleases = releases[PACKAGE_NAMES.RN]
    const versions = rnReleases.map((release) => release.version)

    expect(versions).toContain('0.65')
    expect(versions).toContain('0.76')
    expect(versions).toContain('0.77')
    expect(versions).toContain('0.74')

    // All versions should be present
    const index065 = versions.indexOf('0.65')
    const index076 = versions.indexOf('0.76')
    const index077 = versions.indexOf('0.77')
    expect(index065).toBeGreaterThan(-1)
    expect(index076).toBeGreaterThan(-1)
    expect(index077).toBeGreaterThan(-1)
  })
})
