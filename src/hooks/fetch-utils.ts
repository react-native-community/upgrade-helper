export interface FetchErrorState {
  title: string
  description: string
  status?: number
  url?: string
}

export const getFetchErrorState = ({
  title,
  error,
  url,
}: {
  title: string
  error: unknown
  url: string
}): FetchErrorState => {
  if (error instanceof Response) {
    return {
      title,
      description: `Request failed with ${error.status} ${error.statusText}.`,
      status: error.status,
      url,
    }
  }

  if (error instanceof Error) {
    return {
      title,
      description: error.message,
      url,
    }
  }

  return {
    title,
    description: 'An unexpected error occurred while loading upstream data.',
    url,
  }
}

export const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw response
  }

  return response.text()
}
