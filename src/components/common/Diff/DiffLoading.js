import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import ContentLoader from 'react-content-loader'

const TitleLoader = () => (
  <ContentLoader speed={1} primaryColor="#eee" secondaryColor="#e6e6e6">
    <rect rx="1" ry="1" width="100" height="3" />{' '}
  </ContentLoader>
)
const DiffLoader = () => (
  <ContentLoader speed={1} primaryColor="#eee" secondaryColor="#e6e6e6">
    <rect x="0" y="7" rx="4" ry="4" width="90%" height="13" />{' '}
    <rect x="0" y="30" rx="4" ry="4" width="80%" height="13" />{' '}
    <rect x="0" y="53" rx="3" ry="3" width="70%" height="10" />
    <rect x="0" y="90" rx="4" ry="4" width="90%" height="13" />{' '}
    <rect x="0" y="113" rx="4" ry="4" width="80%" height="13" />{' '}
    <rect x="0" y="143" rx="3" ry="3" width="70%" height="10" />
  </ContentLoader>
)

const SkeletonContainer = styled.div`
  margin-top: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
`

const Header = styled.div`
  color: #24292e;
  background-color: #fafbfc;
  padding: 14px 10px;
  height: 40px;
`

const DiffDisplay = styled.div`
  padding: 5px 10px;
  height: 400px;
  column-count: 2;
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
