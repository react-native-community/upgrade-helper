import { PACKAGE_NAMES } from '../constants'

export function updateURL({
  packageName,
  language,
  isPackageNameDefinedInURL,
  fromVersion,
  toVersion,
  appPackage,
  appName,
}: {
  packageName: string
  language: string
  isPackageNameDefinedInURL: boolean
  fromVersion: string
  toVersion: string
  appPackage: string
  appName: string
}) {
  const url = new URL(window.location.origin)
  url.pathname = window.location.pathname
  url.hash = window.location.hash

  if (fromVersion) {
    url.searchParams.set('from', fromVersion)
  }
  if (toVersion) {
    url.searchParams.set('to', toVersion)
  }
  if (isPackageNameDefinedInURL) {
    url.searchParams.set('package', packageName)
  }
  if (packageName === PACKAGE_NAMES.RNW) {
    url.searchParams.set('language', language)
  }
  if (appPackage) {
    url.searchParams.set('package', appPackage)
  }
  if (appName) {
    url.searchParams.set('name', appName)
  }

  window.history.replaceState(null, '', url.toString())
}
