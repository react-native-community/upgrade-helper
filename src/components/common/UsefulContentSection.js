import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { getVersionsInDiff } from '../../utils'
import { Link } from './Markdown'

const Container = styled.div`
  position: relative;
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.65);
  max-height: ${({ isVisible }) => (isVisible ? '500px' : 0)}
  overflow: hidden;
  transition: max-height 0.4s ease-out;
`

const InnerContainer = styled.div`
  padding: 24px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #e8e8e8;
  border-radius: 3px;
`

const Icon = styled(props => (
  <span {...props} role="img" aria-label="Close useful content section">
    📣
  </span>
))`
  margin: 0px 10px;
`

const CloseButton = styled(({ isVisible, setVisibility, ...props }) => (
  <Button
    {...props}
    type="ghost"
    shape="circle"
    icon="close"
    onClick={() => setVisibility(!isVisible)}
  />
))`
  float: right;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  border-width: 0px;
  width: 20px;
  height: 20px;
  padding-right: 8px;
  &,
  &:hover,
  &:focus {
    color: #24292e;
  }
`

const List = styled.ol`
  padding-inline-start: 18px;
  margin: 10px 0 0;
`

const UsefulContentSection = ({ fromVersion, toVersion }) => {
  const [isVisible, setVisibility] = useState(true)

  const versions = getVersionsInDiff({ fromVersion, toVersion })
  const doesAnyVersionHaveUsefulContent = versions.some(
    ({ usefulContent }) => !!usefulContent
  )

  if (!doesAnyVersionHaveUsefulContent) {
    return null
  }

  return (
    <Container isVisible={isVisible}>
      <InnerContainer>
        <h2>
          <Icon /> Useful content for upgrading
        </h2>

        <CloseButton isVisible={isVisible} setVisibility={setVisibility} />

        {versions.map(({ usefulContent }, key) => (
          <Fragment key={key}>
            <span>{usefulContent.description}</span>

            <List>
              {usefulContent.links.map(({ url, title }, key) => (
                <li key={`${url}${key}`}>
                  <Link href={url}>{title}</Link>
                </li>
              ))}
            </List>
          </Fragment>
        ))}
      </InnerContainer>
    </Container>
  )
}

export default UsefulContentSection
