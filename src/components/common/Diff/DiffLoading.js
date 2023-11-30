import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import ContentLoader from 'react-content-loader'
import { getTransitionDuration } from '../../../utils'

const TitleLoader = () => (
  <ContentLoader
    speed={1}
    backgroundColor="#eee"
    foregroundColor="#e6e6e6"
    viewBox="0 0 400 100"
  >
    <rect width="250" height="6" rx="1.5" />
  </ContentLoader>
)

const DiffLoader = () => (
  <ContentLoader
    speed={1}
    backgroundColor="#eee"
    foregroundColor="#e6e6e6"
    viewBox="0 0 400 100"
  >
    <rect x="0" y="10" width="47%" height="6" rx="1.5" />
    <rect x="200" y="10" width="41%" height="6" rx="1.5" />
    <rect x="0" y="18" width="43%" height="6" rx="1.5" />
    <rect x="200" y="34" width="40%" height="6" rx="1.5" />
    <rect x="200" y="42" width="45%" height="6" rx="1.5" />
    <rect x="0" y="42" width="40%" height="6" rx="1.5" />
    <rect x="0" y="50" width="44%" height="6" rx="1.5" />
  </ContentLoader>
)

const Container = styled(motion.div)`
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 3px;
`

const Header = styled.div({
  color: '#24292e',
  backgroundColor: '#fafbfc',
  padding: '10px',
  height: '40px',
})

const DiffLoading = () => (
  <Container
    initial={{ opacity: 0, translateY: 100 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ duration: getTransitionDuration(0.5) }}
  >
    <Header>
      <TitleLoader />
    </Header>
    <div
      css={{
        padding: '5px 10px',
      }}
    >
      <DiffLoader />
    </div>
  </Container>
)

export default DiffLoading
