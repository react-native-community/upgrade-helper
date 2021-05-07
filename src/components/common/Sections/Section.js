import React, { Component } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import Title from './Title'
import HideContentButton from './HideContentButton'

const Container = styled.div`
  position: relative;
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.65);
  overflow: hidden;
`

const InnerContainer = styled.div`
  color: rgba(0, 0, 0, 0.65);
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-width: 1px;
  border-left-width: 7px;
  border-color: ${({ accentColor }) => accentColor};
  border-style: solid;
  border-radius: 3px;
  transition: padding 0.25s ease-out;
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
      duration: 0.25
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

class Section extends Component {
  state = {
    isContentVisible:
      this.props.initialContentVisible !== undefined
        ? this.props.initialContentVisible
        : true
  }

  // TODO: re-enable this
  // shouldComponentUpdate(nextProps, nextState) {
  //   // Only re-render component if it has reloaded the diff on the parent
  //   const hasLoaded = this.props.isLoading && !nextProps.isLoading
  //   // or if the content has been hidden
  //   const hasContentBeenHidden =
  //     this.state.isContentVisible !== nextState.isContentVisible

  //   return hasLoaded || hasContentBeenHidden
  // }

  handleToggleContentVisibility = () =>
    this.setState(({ isContentVisible }) => ({
      isContentVisible: !isContentVisible
    }))

  render() {
    const { isContentVisible } = this.state
    const { backgroundColor, accentColor, renderTitle, children } = this.props

    return (
      <Container isContentVisible={isContentVisible}>
        <InnerContainer
          isContentVisible={isContentVisible}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
        >
          <Title
            isContentVisible={isContentVisible}
            onClick={this.handleToggleContentVisibility}
          >
            {renderTitle()}
          </Title>

          <HideContentButton
            isContentVisible={isContentVisible}
            toggleContentVisibility={this.handleToggleContentVisibility}
          />

          <ContentContainer isContentVisible={isContentVisible}>
            {children}
          </ContentContainer>
        </InnerContainer>
      </Container>
    )
  }
}

export default Section
