const COMPLETED_DIFFS_STORAGE_PREFIX = 'upgrade-helper:completed-diffs'

type CompletedDiffsStorageKeyParams = {
  packageName: string
  language: string
  fromVersion: string
  toVersion: string
}

export const getCompletedDiffsStorageKey = ({
  packageName,
  language,
  fromVersion,
  toVersion,
}: CompletedDiffsStorageKeyParams) =>
  [
    COMPLETED_DIFFS_STORAGE_PREFIX,
    packageName,
    language,
    `${fromVersion}->${toVersion}`,
  ].join(':')

export const pruneCompletedDiffs = (
  completedDiffs: string[],
  validDiffKeys: string[]
) => {
  const validDiffKeySet = new Set(validDiffKeys)
  return completedDiffs.filter((diffKey) => validDiffKeySet.has(diffKey))
}

export const readCompletedDiffs = (storageKey: string) => {
  try {
    const storedValue = localStorage.getItem(storageKey)

    if (!storedValue) {
      return []
    }

    const parsedValue = JSON.parse(storedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter(
      (completedDiff): completedDiff is string =>
        typeof completedDiff === 'string'
    )
  } catch {
    return []
  }
}

export const writeCompletedDiffs = (
  storageKey: string,
  completedDiffs: string[]
) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(completedDiffs))
  } catch {
    // Ignore unavailable storage so progress tracking never blocks the diff UI.
  }
}
