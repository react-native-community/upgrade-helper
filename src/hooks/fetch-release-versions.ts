import { useEffect, useState } from 'react'
import { getReleasesFileURL } from '../utils'

export const useFetchReleaseVersions = ({ packageName }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const [releaseVersions, setReleaseVersions] = useState(undefined)

  useEffect(() => {
    const fetchReleaseVersions = async () => {
      setIsLoading(true)
      setIsDone(false)

      const response = await fetch(getReleasesFileURL({ packageName }))

      const releaseVersions = (await response.text())
        .split('\n')
        .filter(Boolean)

      setReleaseVersions(releaseVersions)

      setIsLoading(false)
      setIsDone(true)

      return
    }

    fetchReleaseVersions()
  }, [packageName])

  return {
    isLoading,
    isDone,
    releaseVersions,
  }
}
