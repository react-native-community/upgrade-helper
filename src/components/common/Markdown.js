import React from 'react'
import Markdown from 'markdown-to-jsx'
import styled from 'styled-components'

const Link = styled.a`
  text-decoration: none;
  color: #045dc1;
`

const InlineCode = styled.em`
  font-style: normal;
  background-color: rgba(27, 31, 35, 0.07);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
`

export default ({ forceBlock, options = {}, ...props }) => (
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
        `
      }
    }}
  />
)
