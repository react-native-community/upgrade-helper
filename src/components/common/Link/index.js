import React from 'react'
import { View } from 'react-native-web'
import ReactGA from 'react-ga'

import Text from '../Text'


const Link = (props) => {
  const { margins, ...rest } = props
  return (
    <View
      style={[
        margins && { marginVertical: '4px' },
      ]}
    >
    <ReactGA.OutboundLink
      style={{ textDecoration: 'none' }}
      {...props}
    >
        <Text link>{props.children}</Text>
      </ReactGA.OutboundLink>
    </View>
  )
}

export default Link
