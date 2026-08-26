import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_NAMESPACE = 'upgrade-helper:completed-diffs:v1'

interface CompletedDiffsContext {
  packageName: string
  language?: string
  fromVersion: string
  toVersion: string
}

interface StorageLike {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

interface UseCompletedDiffsProps {
  context: CompletedDiffsContext
  isDone: boolean
  validDiffKeys: string[]
  storage?: StorageLike
}

export const getDiffIdentity = ({
  oldPath,
  newPath,
}: {
  oldPath: string
  newPath: string
}) => JSON.stringify([oldPath, newPath])

export const getCompletedDiffsStorageKey = ({
  packageName,
  language,
  fromVersion,
  toVersion,
}: CompletedDiffsContext) => {
  const context = new URLSearchParams({
    package: packageName,
    from: fromVersion,
    to: toVersion,
  })

  if (language) {
    context.set('language', language)
  }

  return `${STORAGE_NAMESPACE}:${context.toString()}`
}

const getBrowserStorage = (): StorageLike | undefined => {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

const loadCompletedDiffs = (
  storage: StorageLike | undefined,
  storageKey: string,
  validDiffKeys: string[]
): string[] | null => {
  const availableStorage = storage ?? getBrowserStorage()
  if (!availableStorage) {
    return null
  }

  let persistedValue: string | null
  try {
    persistedValue = availableStorage.getItem(storageKey)
  } catch {
    return null
  }

  if (!persistedValue) {
    return []
  }

  try {
    const parsedValue: unknown = JSON.parse(persistedValue)
    if (!Array.isArray(parsedValue)) {
      return []
    }

    const validDiffKeySet = new Set(validDiffKeys)
    const seenDiffKeys = new Set<string>()
    return parsedValue.filter((diffKey): diffKey is string => {
      if (
        typeof diffKey !== 'string' ||
        !validDiffKeySet.has(diffKey) ||
        seenDiffKeys.has(diffKey)
      ) {
        return false
      }

      seenDiffKeys.add(diffKey)
      return true
    })
  } catch {
    return []
  }
}

const saveCompletedDiffs = (
  storage: StorageLike | undefined,
  storageKey: string,
  completedDiffs: string[]
) => {
  try {
    const availableStorage = storage ?? getBrowserStorage()
    availableStorage?.setItem(storageKey, JSON.stringify(completedDiffs))
  } catch {
    // Storage can be unavailable in private browsing or when the quota is full.
  }
}

const areCompletedDiffsEqual = (left: string[], right: string[]) =>
  left.length === right.length &&
  left.every((diffKey, index) => diffKey === right[index])

export const useCompletedDiffs = ({
  context,
  isDone,
  validDiffKeys,
  storage,
}: UseCompletedDiffsProps) => {
  const [completedDiffs, setCompletedDiffs] = useState<string[]>([])
  const storageKey = useMemo(
    () => getCompletedDiffsStorageKey(context),
    [
      context.packageName,
      context.language,
      context.fromVersion,
      context.toVersion,
    ]
  )
  const previousStorageKey = useRef(storageKey)

  useEffect(() => {
    const didContextChange = previousStorageKey.current !== storageKey
    previousStorageKey.current = storageKey
    const persistedCompletedDiffs = isDone
      ? loadCompletedDiffs(storage, storageKey, validDiffKeys)
      : []

    if (persistedCompletedDiffs === null) {
      if (didContextChange) {
        setCompletedDiffs([])
      }
      return
    }

    setCompletedDiffs((currentCompletedDiffs) =>
      areCompletedDiffsEqual(currentCompletedDiffs, persistedCompletedDiffs)
        ? currentCompletedDiffs
        : persistedCompletedDiffs
    )
  }, [isDone, storage, storageKey, validDiffKeys])

  const handleCompleteDiff = useCallback(
    (diffKey: string) => {
      setCompletedDiffs((previousCompletedDiffs) => {
        const nextCompletedDiffs = previousCompletedDiffs.includes(diffKey)
          ? previousCompletedDiffs.filter(
              (completedDiff) => completedDiff !== diffKey
            )
          : [...previousCompletedDiffs, diffKey]

        saveCompletedDiffs(storage, storageKey, nextCompletedDiffs)
        return nextCompletedDiffs
      })
    },
    [storage, storageKey]
  )

  return { completedDiffs, handleCompleteDiff }
}
