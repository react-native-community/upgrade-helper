/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

const SkeletonContainer = styled.div`
  borderBottomWidth: 1,
  borderColor: '$offWhiteColor';
  flexDirection: 'row';
  paddingHorizontal: 16;
  paddingVertical: 16;
  backgroundColor: 'white';
  height: 80;
  width: '100%';
  `

const InnerContainer = styled.div`
  padding: 24px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #e3ed;
  border-radius: 3px;
`
export default class UsefulContentNoData extends Component<Props> {
  render() {
    return (
      <SkeletonContainer>
        {/* <Div style={styles.square} />
        <Div style={[styles.headline]}>
          <Text style={[styles.lineOne]} />
          <Text style={styles.lineTwo} />
          <Text style={styles.duration} />
        </Div> */}
        <InnerContainer />
      </SkeletonContainer>
    )
  }
}

//   headline: {
//     paddingHorizontal: 16,
//     width: '100%'
//   },
//   lineOne: {
//     alignItems: 'center',
//     backgroundColor: '$offWhiteColor',
//     height: 14,
//     width: '90%'
//   },
//   lineTwo: {
//     backgroundColor: '$offWhiteColor',
//     height: 14,
//     marginTop: 8,
//     width: '60%'
//   },
//   duration: {
//     backgroundColor: '$offWhiteColor',
//     height: 8,
//     marginTop: 8,
//     width: '12%'
//   },
//   square: {
//     backgroundColor: '$offWhiteColor',
//     height: 16,
//     maxWidth: 16,
//     position: 'relative',
//     width: '10%'
//   }
// })
