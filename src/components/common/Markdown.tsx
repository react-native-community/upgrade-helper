import React from 'react'
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx'
import styled from '@emotion/styled'
import type { Theme } from '../../theme'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?: Theme
}

export const Link = styled((props: LinkProps) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    target="_blank"
    {...props}
    rel="noopener"
    onClick={(e) => e.stopPropagation()}
  />
))`
  text-decoration: none;
  color: ${({ theme }) => theme.link};
`

const InlineCode = styled.em`
  font-style: normal;
  background-color: rgba(27, 31, 35, 0.07);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
`
interface MarkdownComponentProps {
  [key: string]: any
  children: string
  options?: MarkdownToJSX.Options
}

const MarkdownComponent = ({
  forceBlock = false,
  options = {},
  ...props
}: MarkdownComponentProps) => (
  <Markdown
    {...props}
    options={{
      ...options,
      forceBlock,
      overrides: {
        ...options.overrides,
        a: Link,
        em: InlineCode,
        code: InlineCode,
        p: styled.p`
          margin-bottom: 0;
        `,
      },
    }}
  />
)

export default MarkdownComponent
