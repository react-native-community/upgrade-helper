import React, { Component } from 'react'
import styled from '@emotion/styled'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { motion } from 'framer-motion'

import {
  getVersionsContentInDiff,
  getChangelogURL,
  getTransitionDuration
} from '../../utils'
import UpgradeSupportAlert from './UpgradeSupportAlert'
import AppNameWarning from './AppNameWarning'
import UsefulLinks from './UsefulLinks'
import DepCheckAlert from './DepCheckAlert'

import { PACKAGE_NAMES } from '../../constants'

const Container = styled.div`
  position: relative;
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.65);
  overflow: hidden;
`

const InnerContainer = styled.div`
  color: rgba(0, 0, 0, 0.65);
  background-color: #fffbe6;
  border-width: 1px;
  border-left-width: 7px;
  border-color: #ffe58f;
  border-style: solid;
  border-radius: 3px;
  transition: padding 0.25s ease-out;
`

const Title = styled(({ isContentVisible, ...props }) => (
  <motion.h2
    {...props}
    variants={{
      visibleContent: {
        translateX: 0,
        translateY: 0
      },
      hiddenContent: {
        translateX: -5,
        translateY: -10
      }
    }}
    initial={isContentVisible ? 'visibleContent' : 'hiddenContent'}
    animate={isContentVisible ? 'visibleContent' : 'hiddenContent'}
    transition={{
      duration: getTransitionDuration(0.25)
    }}
    inherit={false}
  />
))`
  font-size: 17px;
  cursor: pointer;
  margin: 0px;
  padding: 18px 0px 0px 14px;
`

const ContentContainer = styled(({ isContentVisible, children, ...props }) => (
  <motion.div
    {...props}
    variants={{
      visible: {
        opacity: 1,
        height: 'auto',
        translateY: 0
      },
      hidden: { opacity: 0, height: 0, translateY: -20 }
    }}
    initial={isContentVisible ? 'visible' : 'hidden'}
    animate={isContentVisible ? 'visible' : 'hidden'}
    transition={{
      duration: getTransitionDuration(0.25)
    }}
    inherit={false}
  >
    <div children={children} />
  </motion.div>
))`
  & > div {
    padding: 15px 24px 19px;
  }
`

const Icon = styled(props => (
  <span {...props} role="img" aria-label="Megaphone emoji">
    📣
  </span>
))`
  margin: 0px 10px;
`

const HideContentButton = styled(
  ({ toggleContentVisibility, isContentVisible, ...props }) => (
    <Button
      {...props}
      type="link"
      icon={isContentVisible ? <UpOutlined /> : <DownOutlined />}
      onClick={toggleContentVisibility}
    />
  )
)`
  float: right;
  position: absolute;
  top: 11px;
  right: 12px;
  font-size: 12px;
  border-width: 0px;
  width: 20px;
  height: 20px;
  color: rgba(0, 0, 0, 0.45);
  &:hover,
  &:focus {
    color: #24292e;
  }
`

const Separator = styled.hr`
  margin: 15px 0;
  background-color: #e1e4e8;
  height: 0.25em;
  border: 0;
`

class UsefulContentSection extends Component {
  state = {
    isContentVisible: true
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render component if it has reloaded the diff on the parent
    const hasLoaded = this.props.isLoading && !nextProps.isLoading
    // or if the content has been hidden
    const hasContentBeenHidden =
      this.state.isContentVisible !== nextState.isContentVisible

    return hasLoaded || hasContentBeenHidden
  }

  handleToggleContentVisibility = () =>
    this.setState(({ isContentVisible }) => ({
      isContentVisible: !isContentVisible
    }))

  getChangelog = ({ version }) => {
    const { packageName, toVersion } = this.props

    if (
      packageName === PACKAGE_NAMES.RNW ||
      packageName === PACKAGE_NAMES.RNM
    ) {
      return {
        title: `React Native ${
          packageName === PACKAGE_NAMES.RNW ? 'Windows' : 'macOS'
        } ${toVersion} changelog`,
        url: getChangelogURL({
          packageName,
          version: toVersion
        }),
        version: toVersion
      }
    }

    const versionWithoutEndingZero = version.slice(0, 4)

    return {
      title: `React Native ${versionWithoutEndingZero} changelog`,
      url: getChangelogURL({
        packageName,
        version: versionWithoutEndingZero
      }),
      version: versionWithoutEndingZero
    }
  }

  render() {
    const { packageName, fromVersion, toVersion } = this.props
    const { isContentVisible } = this.state

    const versions = getVersionsContentInDiff({
      packageName,
      fromVersion,
      toVersion
    })

    const doesAnyVersionHaveUsefulLinks = versions.some(
      ({ usefulContent }) => !!usefulContent
    )

    return (
      <Container isContentVisible={isContentVisible}>
        <InnerContainer isContentVisible={isContentVisible}>
          <Title
            isContentVisible={isContentVisible}
            onClick={this.handleToggleContentVisibility}
          >
            <Icon /> Useful content for upgrading
          </Title>

          <HideContentButton
            isContentVisible={isContentVisible}
            toggleContentVisibility={this.handleToggleContentVisibility}
          />

          <ContentContainer isContentVisible={isContentVisible}>
            {doesAnyVersionHaveUsefulLinks ? (
              <UsefulLinks versions={versions} />
            ) : null}

            <DepCheckAlert />

            <Separator />

            <UpgradeSupportAlert />

            <Separator />

            <AppNameWarning />
          </ContentContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default UsefulContentSection
