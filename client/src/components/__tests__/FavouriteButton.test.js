import React from 'react'
import { screen, render } from '@testing-library/react'
import FavouriteButton from '../FavouriteButton'

describe('When isFavourited is true', () => {
  beforeEach(() => {
    render(
      <FavouriteButton 
        isFavourited={true}
        favourite={jest.fn()}
        unfavourite={jest.fn()}
        name='item'
      />
    )
  })
  const { getByTestId, getByText } = screen

  test('it displays the favourited button', () => {
    expect(getByTestId(/favourited/i)).toBeTruthy()
  })

  test('it displays a text alternative for screenreader users', () => {
    expect(getByText(/Unfavourite item/i)).toBeTruthy()
  })
})

describe('When isFavourited is false', () => {
  beforeEach(() => {
    render(
      <FavouriteButton
        isFavourited={false}
        favourite={jest.fn()}
        unfavourite={jest.fn()}
        name='item'
      />
    )
  })
  const { getByTestId, getByText } = screen

  test('it displays the not favourited button', () => {
    expect(getByTestId(/not-favourited/i)).toBeTruthy()
  })

  test('it displays a text alternative for screenreader users', () => {
    expect(getByText(/Favourite item/i)).toBeTruthy()
  })
})
  
