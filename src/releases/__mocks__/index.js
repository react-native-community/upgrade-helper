const fixtureVersions = ['0.59', '0.58', '0.57', '0.56']

jest.setMock(
  '../index.js',
  fixtureVersions.map(version => ({
    version
  }))
)
