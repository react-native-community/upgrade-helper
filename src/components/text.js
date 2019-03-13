import React from 'react'
import { Text as RText } from 'react-native-web'


const Text = (props) => (
  <RText
  style={{
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  }}
    {...props}
  />
)

export default Text
