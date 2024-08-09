import React, { Component } from 'react'
import styled from '@emotion/styled'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { ButtonProps } from 'antd'
import { HTMLMotionProps, motion } from 'framer-motion'

import {
  getVersionsContentInDiff,
  getChangelogURL,
  getTransitionDuration,
} from '../../utils'
import UpgradeSupportAlert from './UpgradeSupportAlert'
import UsefulLinks from './UsefulLinks'
import AlignDepsAlert from './AlignDepsAlert'

import { PACKAGE_NAMES } from '../../constants'
import type { Theme } from '../../theme'

const Container = styled.div<{ isContentOpen: boolean }>`
  position: relative;
  margin-top: 16px;
  overflow: hidden;
`

const InnerContainer = styled.div<{ theme?: Theme; isContentOpen: boolean }>`
  color: ${({ theme }) =>
    theme.text + 'D9'}; // the D9 adds some transparency to the text color
  background-color: ${({ theme }) => theme.yellowBackground};
  border-width: 1px;
  border-left-width: 7px;
  border-color: ${({ theme }) => theme.yellowBorder};
  border-style: solid;
  border-radius: 3px;
  transition: padding 0.25s ease-out;
`

interface TitleProps extends HTMLMotionProps<'h2'> {
  isContentOpen: boolean
}

const Title = styled(({ isContentOpen, ...props }: TitleProps) => (
  <motion.h2
    {...props}
    variants={{
      openContent: {
        translateX: 0,
        translateY: 0,
      },
      hiddenContent: {
        translateX: -5,
        translateY: -10,
      },
    }}
    initial={isContentOpen ? 'openContent' : 'hiddenContent'}
    animate={isContentOpen ? 'openContent' : 'hiddenContent'}
    transition={{
      duration: getTransitionDuration(0.25),
    }}
    inherit={false}
  />
))`
  font-size: 17px;
  cursor: pointer;
  margin: 0px;
  padding: 18px 0px 0px 14px;
`

interface ContentContainerProps
  extends React.PropsWithChildren<HTMLMotionProps<'div'>> {
  isContentOpen: boolean
}

const ContentContainer = styled(
  ({ isContentOpen, children, ...props }: ContentContainerProps) => (
    <motion.div
      {...props}
      variants={{
        open: {
          opacity: 1,
          height: 'auto',
          translateY: 0,
        },
        hidden: { opacity: 0, height: 0, translateY: -20 },
      }}
      initial={isContentOpen ? 'open' : 'hidden'}
      animate={isContentOpen ? 'open' : 'hidden'}
      transition={{
        duration: getTransitionDuration(0.25),
      }}
      inherit={false}
    >
      <div>{children}</div>
    </motion.div>
  )
)`
  & > div {
    padding: 15px 24px 19px;
  }
`

const Icon = styled((props: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props} role="img" aria-label="Megaphone emoji">
    📣
  </span>
))`
  margin: 0px 10px;
`

interface HideContentButtonProps extends ButtonProps {
  isContentOpen: boolean
  toggleContentVisibility: () => void
  theme?: Theme
}

const HideContentButton = styled(
  ({
    toggleContentVisibility,
    isContentOpen,
    ...props
  }: HideContentButtonProps) => (
    <Button
      {...props}
      type="link"
      icon={
        isContentOpen ? (
          <UpOutlined style={{ height: 14, width: 14 }} />
        ) : (
          <DownOutlined style={{ height: 14, width: 14 }} />
        )
      }
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
  color: ${({ theme }) => theme.text + '73'}; // 45% opacity
`

const Separator = styled.hr<{ theme?: Theme }>`
  margin: 15px 0;
  background-color: ${({ theme }) => theme.border};
  height: 0.25em;
  border: 0;
`

interface UsefulContentSectionProps {
  packageName: string
  fromVersion: string
  toVersion: string
  isLoading: boolean
}

interface UsefulContentSectionState {
  isContentOpen: boolean
}

class UsefulContentSection extends Component<
  UsefulContentSectionProps,
  UsefulContentSectionState
> {
  state = {
    isContentOpen: true,
  }

  shouldComponentUpdate(
    nextProps: Partial<UsefulContentSectionProps>,
    nextState: Partial<UsefulContentSectionState>
  ) {
    // Only re-render component if it has reloaded the diff on the parent
    const hasLoaded = this.props.isLoading && !nextProps.isLoading
    // or if the content has been hidden
    const hasContentBeenHidden =
      this.state.isContentOpen !== nextState.isContentOpen

    return hasLoaded || hasContentBeenHidden
  }

  handleToggleContentVisibility = () =>
    this.setState(({ isContentOpen }) => ({
      isContentOpen: !isContentOpen,
    }))

  getChangelog = ({ version }: { version: string }) => {
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
          version: toVersion,
        }),
        version: toVersion,
      }
    }

    const versionWithoutEndingZero = version.slice(0, 4)

    return {
      title: `React Native ${versionWithoutEndingZero} changelog`,
      url: getChangelogURL({
        packageName,
        version: versionWithoutEndingZero,
      }),
      version: versionWithoutEndingZero,
    }
  }

  render() {
    const { packageName, fromVersion, toVersion } = this.props
    const { isContentOpen } = this.state

    const versions = getVersionsContentInDiff({
      packageName,
      fromVersion,
      toVersion,
    })

    const doesAnyVersionHaveUsefulLinks = versions.some(
      ({ usefulContent }) => !!usefulContent
    )

    return (
      <Container isContentOpen={isContentOpen}>
        <InnerContainer isContentOpen={isContentOpen}>
          <Title
            isContentOpen={isContentOpen}
            onClick={this.handleToggleContentVisibility}
          >
            <Icon /> Useful content for upgrading
          </Title>

          <HideContentButton
            isContentOpen={isContentOpen}
            toggleContentVisibility={this.handleToggleContentVisibility}
          />

          <ContentContainer isContentOpen={isContentOpen}>
            {doesAnyVersionHaveUsefulLinks ? (
              <UsefulLinks
                packageName={packageName}
                versions={versions}
                toVersion={toVersion}
              />
            ) : null}

            <AlignDepsAlert />

            <Separator />

            <UpgradeSupportAlert />
          </ContentContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default UsefulContentSection
