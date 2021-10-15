import React, { useContext } from 'react'
import { useFetchReleases } from './hooks/fetch-release-versions'

export const ReleasesContext = React.createContext({
  isDone: false,
  isLoading: false,
  releases: undefined
})

export const ReleasesProvider = React.memo(function({ children, packageName }) {
  const value = useFetchReleases({ packageName })
  return (
    <ReleasesContext.Provider value={value}>
      {children}
    </ReleasesContext.Provider>
  )
})

export const useReleases = () => useContext(ReleasesContext)
