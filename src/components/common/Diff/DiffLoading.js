import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import ContentLoader from 'react-content-loader'

const TitleLoader = () => (
  <ContentLoader speed={1} primaryColor="#b3b3b3" secondaryColor="#e6e6e6">
    <rect rx="3" ry="3" width="100" height="7" />{' '}
  </ContentLoader>
)
const DiffLoader = () => (
  <ContentLoader speed={1} primaryColor="#b3b3b3" secondaryColor="#e6e6e6">
    <rect x="0" y="7" rx="4" ry="4" width="90%" height="13" />{' '}
    <rect x="0" y="30" rx="4" ry="4" width="80%" height="13" />{' '}
    <rect x="0" y="53" rx="3" ry="3" width="70%" height="10" />
    <rect x="0" y="90" rx="4" ry="4" width="90%" height="13" />{' '}
    <rect x="0" y="113" rx="4" ry="4" width="80%" height="13" />{' '}
    <rect x="0" y="143" rx="3" ry="3" width="70%" height="10" />
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
`

const Header = styled.div`
  color: #24292e;
  line-height: 32px;
  background-color: #fafbfc;
  border: 1px solid #e8e8e8;
  padding: 10px 5px;
  height: 40px;
`

const DiffDisplay = styled.div`
  border-radius: 3px;
  padding: 5px 10px;
  height: 400px;
  column-count: 2;
  align-items: center;
`
export default class UsefulContentNoData extends Component {
  render() {
    return (
      <Fragment key="noData">
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
