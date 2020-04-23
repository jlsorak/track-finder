import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import SearchForm from '../SearchForm'

describe('When a search loading', () => {
  test('the search button is disabled', () => {
    const { getByRole } = render(<SearchForm searchTracksQueryInfo={{ loading: true }} />)
    expect(getByRole('button')).toHaveAttribute('disabled')
  })
})

describe('When there is an error performing the search', () => {
  test('an alert is displayed informing the user', () => {
    const { getByRole } =  render(<SearchForm searchTracksQueryInfo={{ error: true }} />)
    expect(getByRole('alert')).toBeTruthy()
  })
})

describe('When the user submits the form without filling in the input', () => {
  test('a search should not be performed', () => {
    const searchTracks = jest.fn() 
    const { getByTestId } = render(<SearchForm searchTracks={searchTracks} setShowFavourites={jest.fn()} />)
    fireEvent.submit(getByTestId('form'))
    expect(searchTracks).not.toHaveBeenCalled()
  })
})

describe('When the user enters a search term', () => {
  test('a search should should be performed', () => {
    const searchTracks = jest.fn()
    const { getByLabelText, getByTestId } = render(
    <SearchForm searchTracks={searchTracks} setShowFavourites={jest.fn()} />
    )
    const input = getByLabelText('Song title')
    fireEvent.change(input, { target: { value: 'Example search term' } })
    fireEvent.submit(getByTestId('form'))
    expect(searchTracks).toHaveBeenCalled()
  })
})
