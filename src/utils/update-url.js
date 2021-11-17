import { PACKAGE_NAMES } from '../constants'

export function updateURL({
  packageName,
  language,
  isPackageNameDefinedInURL,
  fromVersion,
  toVersion
}) {
  const pageURL = window.location.href.replace(window.location.search, '')

  const newURL =
    fromVersion !== '' || toVersion !== ''
      ? `?from=${fromVersion}&to=${toVersion}`
      : '?'
  const packageNameInURL = isPackageNameDefinedInURL
    ? `&package=${packageName}`
    : ''
  const languageInURL =
    packageName === PACKAGE_NAMES.RNW ? `&language=${language}` : ''

  window.history.replaceState(
    null,
    null,
    `${pageURL}${newURL}${packageNameInURL}${languageInURL}`
  )
}
