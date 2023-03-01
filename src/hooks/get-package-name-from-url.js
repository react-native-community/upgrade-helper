import { PACKAGE_NAMES } from '../constants'

export const useGetPackageNameFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const packageNameFromURL = urlParams.get('package')
  const packageNames = Object.values(PACKAGE_NAMES)

  if (!packageNameFromURL || !packageNames.includes(packageNameFromURL)) {
    return {
      packageName: PACKAGE_NAMES.RN,
      isPackageNameDefinedInURL: false,
    }
  }

  return {
    packageName: packageNameFromURL,
    isPackageNameDefinedInURL: true,
  }
}
