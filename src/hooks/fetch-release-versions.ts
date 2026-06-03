import { useEffect, useState } from 'react'
import semver from 'semver/preload'
import { getReleasesFileURL } from '../utils'
import {
  fetchText,
  getFetchErrorState,
  type FetchErrorState,
} from './fetch-utils'

export const parseReleaseVersions = (releaseVersionsText: string): string[] =>
  releaseVersionsText
    .split('\n')
    .map((releaseVersion) => releaseVersion.trim())
    .filter((releaseVersion) => semver.valid(releaseVersion))

export const useFetchReleaseVersions = ({
  packageName,
}: {
  packageName: string
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [releaseVersions, setReleaseVersions] = useState<string[]>([])
  const [error, setError] = useState<FetchErrorState | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  const retry = () =>
    setRetryCount((currentRetryCount) => currentRetryCount + 1)

  useEffect(() => {
    const fetchReleaseVersions = async () => {
      const releasesFileURL = getReleasesFileURL({ packageName })

      setIsLoading(true)
      setIsDone(false)
      setError(null)

      try {
        const releaseVersionsText = await fetchText(releasesFileURL)
        const releaseVersions = parseReleaseVersions(releaseVersionsText)

        if (releaseVersions.length === 0) {
          throw new Error(
            'The upstream release list did not contain any valid semver versions.'
          )
        }

        setReleaseVersions(releaseVersions)
      } catch (error) {
        setReleaseVersions([])
        setError(
          getFetchErrorState({
            title: 'Could not load React Native versions',
            error,
            url: releasesFileURL,
          })
        )
      } finally {
        setIsLoading(false)
        setIsDone(true)
      }
    }

    fetchReleaseVersions()
  }, [packageName, retryCount])

  return {
    isLoading,
    isDone,
    releaseVersions,
    error,
    retry,
  }
}
