import React from 'react'
import Markdown from 'markdown-to-jsx'
import styled from '@emotion/styled'

export const Link = styled((props) => (
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

export default ({ forceBlock = false, options = {}, ...props }) => (
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
