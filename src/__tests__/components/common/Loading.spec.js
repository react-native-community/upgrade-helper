import React from 'react'
import { render } from '@testing-library/react'
import Loading from '../../../components/common/Loading'

it('renders without crashing', () => {
  const { container } = render(<Loading logo="test.png" />)

  expect(container).toMatchSnapshot()
})
