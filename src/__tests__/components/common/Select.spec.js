import React from 'react'
import { render } from '@testing-library/react'
import Select from '../../../components/common/Select'

const options = ['option1', 'option2']
it('renders without crashing', () => {
  const { container } = render(<Select title="MyTitle" options={options} />)

  expect(container).toMatchSnapshot()
})
