// this line HAAAAAAAAS to go
const versions = ['0.64', '0.62', '0.61', '0.60', '0.59', '0.58', '0.57']

export default versions.map(version => ({
  ...require(`./${version}`).default,
  version
}))
