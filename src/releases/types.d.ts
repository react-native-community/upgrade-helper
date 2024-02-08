interface ReleaseLinkT {
  title: string
  url: string
}

interface ReleaseUsefulContentT {
  description: string
  links: ReleaseLinkT[]
}

type LineChangeT = 'add' | 'delete' | 'neutral'

export interface ReleaseCommentT {
  fileName: string
  lineNumber: number
  lineChangeType: LineChangeT
  content: React.ReactNode
}

export interface ReleaseT {
  usefulContent: ReleaseUsefulContentT
  comments?: ReleaseCommentT[]
}
