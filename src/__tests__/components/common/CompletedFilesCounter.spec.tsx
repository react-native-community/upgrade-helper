import React from 'react'
import { render } from '@testing-library/react'
import CompletedFilesCounter from '../../../components/common/CompletedFilesCounter'
import { lightTheme } from '../../../theme'

it('renders without crashing', () => {
  const { container } = render(
    <CompletedFilesCounter
      completed={10}
      total={11}
      popoverContent=""
      popoverCursorType="pointer"
      theme={lightTheme}
    />
  )

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="css-cs3rl"
      >
        <span>
          <span
            class="completedAmount"
          >
            10
          </span>
           
          /
          11
        </span>
        <div
          style="position: relative;"
        />
      </div>
    </div>
  `)
})
