import React from 'react'
import { render } from '@testing-library/react'
import Home from '../../components/pages/Home'

it('renders without crashing', () => {
  const { container } = render(<Home />)

  expect(container).toMatchSnapshot()
})
