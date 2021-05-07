import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

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
      duration: 0.25
    }}
    inherit={false}
  />
))`
  font-size: 17px;
  cursor: pointer;
  margin: 0px;
  padding: 18px 0px 0px 14px;
`

export default Title
