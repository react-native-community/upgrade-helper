import React from 'react'
import { Text as RText } from 'react-native-web'


const Text = (props) => {
  const { h1, h2, bold, link, style, ...rest } = props

  return (
    <RText
    style={[
      {
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
      },
      bold && { fontWeight: 'bold' },
      h1 && { fontSize: 'calc(30px + 2vmin)', fontWeight: 'bold' },
      h2 && { fontSize: 'calc(20px + 2vmin)', fontWeight: 'bold', marginTop: '20px' },
      link && {
        borderBottomColor: 'white',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
      },
      style,
    ]}
    {...rest}
    />
  )
}

export default Text
