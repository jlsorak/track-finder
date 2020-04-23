import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Preview from '../Preview'

describe('When no preview url is passed', () => {
  test('A message is displayed explaining the preview is unavailable', () => {
    const { getByText } = render(<Preview />)
    expect(getByText('Preview unavailable')).toBeTruthy()
  })
})

describe('When a preview url is passed', () => {
  test('a button is displayed to preview the track', () => {
    const { getByRole } = render(<Preview previewUrl='https://example-url' />)
    expect(getByRole('button')).toBeTruthy()
  })

  describe('and the button to preview a track is pressed', () => {
    test('a video of the track should be displayed ', () => {
      const { getByTestId, getByText } = render(<Preview previewUrl='https://example-url' />)
      fireEvent.click(getByText('Preview track'))
      expect(getByTestId('video')).toBeTruthy()
    })
  })
})
