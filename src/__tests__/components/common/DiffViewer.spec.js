import React from 'react'
import { render } from '@testing-library/react'
import DiffViewer from '../../../components/common/DiffViewer'

it('renders without crashing', () => {
  const { container } = render(<DiffViewer />)

  expect(container).toMatchSnapshot()
})
