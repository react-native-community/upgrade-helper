import { PACKAGE_NAMES } from '../../constants'

const fixtureVersions = ['0.59', '0.58', '0.57', '0.56']

jest.setMock('../index.js', {
  [PACKAGE_NAMES.RN]: fixtureVersions.map((version) => ({
    version,
  })),
})
