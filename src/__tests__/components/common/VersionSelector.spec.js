import React from 'react'
import { render } from '@testing-library/react'
import VersionSelector from '../../../components/common/VersionSelector'

it('renders without crashing', () => {
  const { container } = render(<VersionSelector />)

  expect(container).toMatchSnapshot()
})

it.skip('triggers the action on button press', () => {
  // TODO / pseudocode:
  // mock the fetch call for the versions
  // render(<VersionSelector />)
  // fire an event on FromVersionSelector and ToVersionSelector to choose versions
  // fire an event to click on the `upgradeButtonEl` button
  // expect that `onShowDiff` method has been called
})
