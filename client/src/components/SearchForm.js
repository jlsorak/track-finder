import React, { useState } from 'react'
import { FaChevronRight} from 'react-icons/fa'

import Alert from './Alert'

const SearchForm = ({ searchTracks, searchTracksQueryInfo = {}, setShowFavourites }) => {
  const [ searchTerm, setSearchTerm ] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    !searchTracksQueryInfo.loading && searchTracks({ variables: { searchTerm }})
    setShowFavourites(false)
  }
  return (
    <form onSubmit={handleFormSubmit}>
      {searchTracksQueryInfo.error && (
        <Alert
          title='Search failed!'
          description={'We\'re unable to search that track right now.'}
        />
      )}
      <div className='flex'>
        <input
          aria-label='Song title'
          aria-required
          className='w-full mr-2 md:py-4 md:px-8'
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='e.g. Bohemian Rhapsody'
          required
          type='text'
        />
        <button className='btn-white' disabled={searchTracksQueryInfo.loading}>
          <span>Search</span>
          <FaChevronRight className='inline-icon-right' />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
