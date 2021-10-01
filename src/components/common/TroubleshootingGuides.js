import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Link } from './Markdown'
import { motion, useAnimation } from 'framer-motion'
import { css } from '@emotion/core'

const TROUBLESHOOTING_GUIDES = [
  {
    title: 'Xcode 12.5',
    href: 'https://github.com/facebook/react-native/issues/31480'
  },
  {
    title: 'Apple Silicon (M1)',
    href: 'https://github.com/facebook/react-native/issues/31941'
  }
]

const Container = styled(motion.div)`
  ${({ willHaveAnimation }) =>
    !willHaveAnimation &&
    css`
      width: 250px;
    `}
`

const Content = styled(motion.div)`
  ${({ willHaveAnimation }) =>
    willHaveAnimation &&
    css`
      display: none;
      opacity: 0;
      height: 0;
    `}

  h4 {
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 6px;
  }
`

const ListContainer = styled.ul`
  padding-left: 13px;
  margin-bottom: 0;
  list-style: disc;
`

const TroubleshootingGuides = ({ isTooltipVisible, hasSeenTooltip }) => {
  const hasAnimated = useRef(false)
  const willHaveAnimation = useRef(isTooltipVisible || hasAnimated.current)

  const containerAnimation = useAnimation()
  const tooltipAnimation = useAnimation()
  const contentAnimation = useAnimation()

  useEffect(() => {
    if (!isTooltipVisible && !hasAnimated.current) {
      startTroubleshootingAnimation()

      return
    }

    if (hasSeenTooltip) {
      hasAnimated.current = true
    }
  }, [isTooltipVisible])

  const startTroubleshootingAnimation = async () => {
    if (willHaveAnimation) {
      await Promise.all([
        contentAnimation.start({
          display: 'initial',
          transition: { duration: 0 }
        }),
        tooltipAnimation.start({ opacity: 0, transition: { duration: 0.2 } }),
        containerAnimation.start({
          width: 250,
          transition: { duration: 0.2, delay: 0.2 }
        }),
        tooltipAnimation.start({
          height: 0,
          transition: { duration: 0.2 }
        }),
        contentAnimation.start({
          height: 'auto',
          transition: { duration: 0.2 }
        }),
        contentAnimation.start({
          opacity: 1,
          transition: { duration: 0.5, delay: 0.3 }
        })
      ])
      await tooltipAnimation.start({ display: 'none' })
    }

    hasAnimated.current = true
  }

  return (
    <Container
      willHaveAnimation={willHaveAnimation.current}
      animate={containerAnimation}
    >
      <motion.div animate={tooltipAnimation}>
        <span>
          Check here the troubleshooting guides for issues with Xcode 12.5 or
          Apple Silicon (M1) machine.
        </span>
      </motion.div>

      <Content
        willHaveAnimation={willHaveAnimation.current}
        animate={contentAnimation}
      >
        <>
          <h4>Troubleshooting guides</h4>
          <ListContainer>
            {TROUBLESHOOTING_GUIDES.map(({ title, href }) => (
              <li key={href}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ListContainer>
        </>
      </Content>
    </Container>
  )
}

export { TroubleshootingGuides }
