interface ReleaseLinkT {
  title: string
  url: string
}

interface ReleaseUsefulContentT {
  description: string | React.ReactNode
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
