import { parseReleaseVersions } from '../hooks/fetch-release-versions'
import { getFetchErrorState } from '../hooks/fetch-utils'

describe('parseReleaseVersions', () => {
  it('keeps valid semver release entries and drops invalid upstream payload lines', () => {
    expect(
      parseReleaseVersions(
        ['0.85.0', '0.84.1', '404: Not Found', '', ' main'].join('\n')
      )
    ).toEqual(['0.85.0', '0.84.1'])
  })
})

describe('getFetchErrorState', () => {
  it('turns failed HTTP responses into a user-facing error state', () => {
    const response = new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
    })

    expect(
      getFetchErrorState({
        title: 'Could not load upstream content',
        error: response,
        url: 'https://example.com/RELEASES',
      })
    ).toEqual({
      title: 'Could not load upstream content',
      description: 'Request failed with 404 Not Found.',
      status: 404,
      url: 'https://example.com/RELEASES',
    })
  })

  it('keeps thrown error messages visible for invalid upstream payloads', () => {
    expect(
      getFetchErrorState({
        title: 'Could not parse upstream content',
        error: new Error(
          'The upstream release list did not contain any valid semver versions.'
        ),
        url: 'https://example.com/RELEASES',
      })
    ).toEqual({
      title: 'Could not parse upstream content',
      description:
        'The upstream release list did not contain any valid semver versions.',
      url: 'https://example.com/RELEASES',
    })
  })
})
