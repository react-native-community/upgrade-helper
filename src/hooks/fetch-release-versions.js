import { useEffect, useState } from 'react'
import { getReleasesFileURL } from '../utils'
import compare from 'semver/functions/rcompare'

export const useFetchReleases = ({ packageName }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const [releases, setReleases] = useState(undefined)

  useEffect(() => {
    const fetchReleaseVersions = async () => {
      setIsLoading(true)
      setIsDone(false)
      const response = await (
        await fetch(getReleasesFileURL({ packageName }))
      ).json()

      const _releases = Object.entries(response)
        .map(([version, value]) => ({ version, ...value }))
        .sort((a, b) => compare(a.version, b.version))
      setReleases(_releases)

      setIsLoading(false)
      setIsDone(true)

      return
    }

    fetchReleaseVersions()
  }, [packageName])

  return {
    isLoading,
    isDone,
    releases
  }
}
