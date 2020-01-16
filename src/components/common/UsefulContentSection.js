import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { getVersionsInDiff, getChangelogURL } from '../../utils'
import { Link } from './Markdown'

const Container = styled.div`
  position: relative;
  ${props => props.isVisible && 'margin-top: 16px;'}
  color: rgba(0, 0, 0, 0.65);
  ${props => (props.isVisible ? 'max-height: 800px;' : 'max-height: 0px;')}
  overflow: hidden;
  transition: max-height 0.4s ease-out, margin-top 0.4s ease-out 0.2s;
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

const CloseButton = styled(({ toggleVisibility, ...props }) => (
  <Button {...props} type="link" icon="close" onClick={toggleVisibility} />
))`
  float: right;
  position: absolute;
  top: 11px;
  right: 12px;
  font-size: 12px;
  border-width: 0px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.45);
  &:hover,
  &:focus {
    color: #24292e;
  }
`

const ReleaseSeparator = styled.hr`
  margin: 15px 0;
  background-color: #e1e4e8;
  height: 0.25em;
  border: 0;
`

const List = styled.ol`
  padding-inline-start: 18px;
  margin: 10px 0 0;
`

class UsefulContentSection extends Component {
  state = {
    isVisible: true
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render component if it has reloaded the diff on the parent
    const hasLoaded = this.props.isLoading && !nextProps.isLoading
    // or if it has been hidden
    const hasBeenHidden = this.state.isVisible && !nextState.isVisible

    return hasLoaded || hasBeenHidden
  }

  handleToggleVisibility = () =>
    this.setState(({ isVisible }) => ({ isVisible: !isVisible }))

  render() {
    const { fromVersion, toVersion } = this.props
    const { isVisible } = this.state

    const versions = getVersionsInDiff({ fromVersion, toVersion })
    const doesAnyVersionHaveUsefulContent = versions.some(
      ({ usefulContent }) => !!usefulContent
    )

    if (!doesAnyVersionHaveUsefulContent) {
      return null
    }

    const hasMoreThanOneRelease = versions.length > 1

    return (
      <Container isVisible={isVisible}>
        <InnerContainer>
          <h2>
            <Icon /> Useful content for upgrading
          </h2>

          <CloseButton toggleVisibility={this.handleToggleVisibility} />

          {versions.map(({ usefulContent, version }, key) => {
            const versionWithoutEndingZero = version.slice(0, 4)

            const links = [
              ...usefulContent.links,
              {
                title: `React Native ${versionWithoutEndingZero} changelog`,
                url: getChangelogURL({ version: versionWithoutEndingZero })
              }
            ]

            return (
              <Fragment key={key}>
                {key > 0 && <ReleaseSeparator />}

                {hasMoreThanOneRelease && (
                  <h3>Release {versionWithoutEndingZero}</h3>
                )}

                <span>{usefulContent.description}</span>

                <List>
                  {links.map(({ url, title }, key) => (
                    <li key={`${url}${key}`}>
                      <Link href={url}>{title}</Link>
                    </li>
                  ))}
                </List>
              </Fragment>
            )
          })}
        </InnerContainer>
      </Container>
    )
  }
}

export default UsefulContentSection
