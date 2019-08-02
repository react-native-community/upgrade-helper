import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import ContentLoader from 'react-content-loader'

const TitleLoader = () => (
  <ContentLoader
    height={40}
    speed={1}
    primaryColor={'#ffff'}
    secondaryColor={'#e8e8e8'}
  >
    <rect rx="3" ry="3" width="100" height="8" />{' '}
  </ContentLoader>
)
const DiffLoader = () => (
  <ContentLoader
    height={140}
    speed={1}
    primaryColor={'#ffff'}
    secondaryColor={'#9992'}
  >
    <rect x="0" y="7" rx="4" ry="4" width="90%" height="13" />{' '}
    <rect x="0" y="37" rx="4" ry="4" width="80%" height="13" />{' '}
    <rect x="0" y="60" rx="3" ry="3" width="70%" height="10" />
    <rect x="0" y="97" rx="4" ry="4" width="90%" height="13" />{' '}
    <rect x="0" y="124" rx="4" ry="4" width="80%" height="13" />{' '}
    <rect x="0" y="154" rx="3" ry="3" width="70%" height="10" />
  </ContentLoader>
)

const SkeletonContainer = styled.div`
  position: relative;
  margin-top: 16px;
  background-color: 'white';
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  max-height: '800px';
  overflow: hidden;
  transition: max-height 0.4s ease-out;
`

const Header = styled.div`
  color: #24292e;
  line-height: 32px;
  background-color: #fafbfc;
  border: 1px solid #e8e8e8;
  padding: 5px 10px;
  height: 40px;
`

const DiffDisplay = styled.div`
  color: #24292e;
  background-color: #;
  border-radius: 3px;
  padding: 5px 10px;
  height: 400px;
  column-count: 2;
  align-items: center;
`
export default class UsefulContentNoData extends Component<Props> {
  render() {
    return (
      <Fragment key={'noData'}>
        <SkeletonContainer>
          <Header>
            <TitleLoader />
          </Header>
          <DiffDisplay>
            <DiffLoader />
          </DiffDisplay>
        </SkeletonContainer>
      </Fragment>
    )
  }
}
