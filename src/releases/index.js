const versions = ['0.59', '0.58', '0.57']

export default versions.map(version => ({
  ...require(`./${version}`).default,
  version
}))
