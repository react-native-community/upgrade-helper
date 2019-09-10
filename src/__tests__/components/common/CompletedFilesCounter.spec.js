import React from 'react'
import { render } from '@testing-library/react'
import CompletedFilesCounter from '../../../components/common/CompletedFilesCounter'

it('renders without crashing', () => {
  const { container } = render(<CompletedFilesCounter />)

  expect(container).toMatchSnapshot()
})
