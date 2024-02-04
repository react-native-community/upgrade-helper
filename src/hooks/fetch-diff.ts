import { useEffect, useState } from 'react'
import { parseDiff } from 'react-diff-view'
import type { File } from 'gitdiff-parser'
import { getDiffURL } from '../utils'

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
  const [isLoading, setIsLoading] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const [diff, setDiff] = useState<File[] | undefined>(undefined)

  useEffect(() => {
    const fetchDiff = async () => {
      setIsLoading(true)
      setIsDone(false)

      const [response] = await Promise.all([
        fetch(getDiffURL({ packageName, language, fromVersion, toVersion })),
        delay(300),
      ])

      const diff = await response.text()

      setDiff(movePackageJsonToTop(parseDiff(diff)))

      setIsLoading(false)
      setIsDone(true)

      return
    }

    if (shouldShowDiff) {
      fetchDiff()
    }
  }, [shouldShowDiff, packageName, language, fromVersion, toVersion])

  return {
    isLoading,
    isDone,
    diff,
  }
}
