import { LANGUAGE_NAMES } from '../constants'

export const useGetLanguageFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search)

  const languageFromURL = urlParams.get('language')
  const languageNames = Object.values(LANGUAGE_NAMES)

  if (!languageFromURL || !languageNames.includes(languageFromURL)) {
    return LANGUAGE_NAMES.CPP
  }

  return languageFromURL
}
