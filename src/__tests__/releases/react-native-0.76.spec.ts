import release from '../../releases/react-native/0.76'
import type { ReleaseT } from '../../releases/types'

describe('React Native 0.76 release configuration', () => {
  it('should have the correct structure', () => {
    expect(release).toBeDefined()
    expect(typeof release).toBe('object')
  })

  it('should have usefulContent with description', () => {
    expect(release.usefulContent).toBeDefined()
    expect(release.usefulContent.description).toBeDefined()
  })

  it('should have useful links for 0.76 upgrade', () => {
    expect(release.usefulContent.links).toBeDefined()
    expect(Array.isArray(release.usefulContent.links)).toBe(true)
    expect(release.usefulContent.links).toHaveLength(2)

    const blogPostLink = release.usefulContent.links.find(
      (link) =>
        link.title ===
        'Official blog post about the major changes on React Native 0.76'
    )
    expect(blogPostLink).toBeDefined()
    expect(blogPostLink?.url).toBe(
      'https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture'
    )

    const newArchLink = release.usefulContent.links.find(
      (link) => link.title === 'New Architecture documentation'
    )
    expect(newArchLink).toBeDefined()
    expect(newArchLink?.url).toBe(
      'https://reactnative.dev/docs/the-new-architecture/landing-page'
    )
  })

  it('should conform to ReleaseT type', () => {
    const releaseAsType: ReleaseT = release
    expect(releaseAsType).toBeDefined()
  })
})
