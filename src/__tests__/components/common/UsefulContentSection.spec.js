import React from 'react'
import { render } from '@testing-library/react'
import UsefulContentSection from '../../../components/common/UsefulContentSection'

it('renders without crashing', () => {
  const { container } = render(
    <UsefulContentSection
      isLoading={false}
      fromVersion="0.60.0"
      toVersion="0.61.0"
    />
  )

  expect(container).toMatchSnapshot()
})
