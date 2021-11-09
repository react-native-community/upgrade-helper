export function updateURL({
  packageName,
  language,
  isPackageNameDefinedInURL,
  isLanguageDefinedInURL,
  fromVersion,
  toVersion
}) {
  const pageURL = window.location.href.replace(window.location.search, '')
  const newURL = `?from=${fromVersion}&to=${toVersion}`
  const packageNameInURL = isPackageNameDefinedInURL
    ? `&package=${packageName}`
    : ''
  const languageInURL =
    isLanguageDefinedInURL && language !== undefined
      ? `&language=${language}`
      : ''

  window.history.replaceState(
    null,
    null,
    `${pageURL}${newURL}${packageNameInURL}${languageInURL}`
  )
}
