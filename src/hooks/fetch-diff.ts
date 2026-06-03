import { useEffect, useState } from 'react'
import { parseDiff } from 'react-diff-view'
import type { File } from 'gitdiff-parser'
import { getDiffURL } from '../utils'
import {
  fetchText,
  getFetchErrorState,
  type FetchErrorState,
} from './fetch-utils'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const movePackageJsonToTop = (parsedDiff: File[]) =>
  parsedDiff.sort(({ newPath }) => (newPath.includes('package.json') ? -1 : 1))

interface UseFetchDiffProps {
  shouldShowDiff: boolean
  packageName: string
  language: string
  fromVersion: string
  toVersion: string
}
export const useFetchDiff = ({
  shouldShowDiff,
  packageName,
  language,
  fromVersion,
  toVersion,
}: UseFetchDiffProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [diff, setDiff] = useState<File[]>([])
  const [error, setError] = useState<FetchErrorState | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  const retry = () =>
    setRetryCount((currentRetryCount) => currentRetryCount + 1)

  useEffect(() => {
    const fetchDiff = async () => {
      const diffURL = getDiffURL({
        packageName,
        language,
        fromVersion,
        toVersion,
      })

      setIsLoading(true)
      setIsDone(false)
      setError(null)

      try {
        const [diffText] = await Promise.all([fetchText(diffURL), delay(300)])
        const parsedDiff = parseDiff(diffText)

        if (parsedDiff.length === 0) {
          throw new Error(
            'The upstream diff file was empty or could not be parsed into file changes.'
          )
        }

        setDiff(movePackageJsonToTop(parsedDiff))
      } catch (error) {
        setDiff([])
        setError(
          getFetchErrorState({
            title: 'Could not load this upgrade diff',
            error,
            url: diffURL,
          })
        )
      } finally {
        setIsLoading(false)
        setIsDone(true)
      }
    }

    if (shouldShowDiff) {
      fetchDiff()
    }
  }, [
    shouldShowDiff,
    packageName,
    language,
    fromVersion,
    toVersion,
    retryCount,
  ])

  return {
    isLoading,
    isDone,
    diff,
    error,
    retry,
  }
}
