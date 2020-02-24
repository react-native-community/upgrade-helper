import React, { Component } from 'react'
import styled from '@emotion/styled'
import ContentLoader from 'react-content-loader'

const TitleLoader = () => (
  <ContentLoader
    speed={1}
    backgroundColor="#eee"
    foregroundColor="#e6e6e6"
    viewBox="0 0 400 100"
  >
    <rect width="250" height="10" rx="3" />
  </ContentLoader>
)

const DiffLoader = () => (
  <ContentLoader
    speed={1}
    backgroundColor="#eee"
    foregroundColor="#e6e6e6"
    viewBox="0 0 400 100"
  >
    <rect x="0" y="10" width="47%" height="10" rx="3" />
    <rect x="200" y="10" width="41%" height="10" rx="3" />
    <rect x="0" y="26" width="43%" height="10" rx="3" />
    <rect x="200" y="58" width="40%" height="10" rx="3" />
    <rect x="200" y="74" width="45%" height="10" rx="3" />
    <rect x="0" y="74" width="40%" height="10" rx="3" />
    <rect x="0" y="90" width="44%" height="10" rx="3" />
  </ContentLoader>
)

const SkeletonContainer = styled.div`
  margin-top: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
`

const Header = styled.div({
  color: '#24292e',
  backgroundColor: '#fafbfc',
  padding: '10px',
  height: '40px'
})

export default class UsefulContentNoData extends Component {
  render() {
    return (
      <SkeletonContainer>
        <Header>
          <TitleLoader />
        </Header>
        <div
          css={{
            padding: '5px 10px'
          }}
        >
          <DiffLoader />
        </div>
      </SkeletonContainer>
    )
  }
}
