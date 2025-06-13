import release from '../../releases/react-native/0.65'
import type { ReleaseT } from '../../releases/types'

describe('React Native 0.65 release configuration', () => {
  it('should have the correct structure', () => {
    expect(release).toBeDefined()
    expect(typeof release).toBe('object')
  })

  it('should have usefulContent with description', () => {
    expect(release.usefulContent).toBeDefined()
    expect(release.usefulContent.description).toBeDefined()
  })

  it('should have useful links for 0.65 upgrade', () => {
    expect(release.usefulContent.links).toBeDefined()
    expect(Array.isArray(release.usefulContent.links)).toBe(true)
    expect(release.usefulContent.links).toHaveLength(3)

    const blogPostLink = release.usefulContent.links.find(
      (link) =>
        link.title ===
        'Official blog post about the major changes on React Native 0.65'
    )
    expect(blogPostLink).toBeDefined()
    expect(blogPostLink?.url).toBe(
      'https://reactnative.dev/blog/2021/08/17/version-065'
    )

    const hermesLink = release.usefulContent.links.find(
      (link) => link.title === 'Hermes 0.8.1 release notes'
    )
    expect(hermesLink).toBeDefined()
    expect(hermesLink?.url).toBe(
      'https://github.com/facebook/hermes/releases/tag/v0.8.1'
    )

    const okHttpLink = release.usefulContent.links.find(
      (link) => link.title === 'OkHttp v4 migration guide'
    )
    expect(okHttpLink).toBeDefined()
    expect(okHttpLink?.url).toBe(
      'https://square.github.io/okhttp/upgrading_to_okhttp_4/'
    )
  })

  it('should conform to ReleaseT type', () => {
    const releaseAsType: ReleaseT = release
    expect(releaseAsType).toBeDefined()
  })
})
