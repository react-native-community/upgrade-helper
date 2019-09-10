import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import VersionSelector from '../../../components/common/VersionSelector'

it('renders without crashing', () => {
  const { container } = render(<VersionSelector />)

  expect(container).toMatchSnapshot()
})

// it('renders without crashing2', () => {
//   const { debug, getByText } = render(<VersionSelector />)
//   debug()
//   fireEvent.change(getByText("What's your current React Native version?"), {
//     target: { value: 'a' }
//   })
// })
