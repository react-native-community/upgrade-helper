import '@emotion/react'

import { Theme as EmotionTheme } from '../src/theme'

export {}

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {}
}
