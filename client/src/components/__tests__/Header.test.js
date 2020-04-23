import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Header from '../Header'

describe('When the "My favourites" button is pressed', () => {
  test('setShowFavourites is called with "true"', () => {
    const setShowFavourites = jest.fn()
    const { getByText } = render(<Header setShowFavourites={setShowFavourites} />)
    fireEvent.click(getByText('My Favourites'))
    expect(setShowFavourites).toHaveBeenCalledWith(true)
  })
})
