import React, { useState } from 'react'

import { FaChevronRight} from 'react-icons/fa'

const SearchForm = ({ searchTracks, searchTracksQueryInfo = {}, setShowFavourites }) => {
  const [ searchTerm, setSearchTerm ] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    !searchTracksQueryInfo.loading && searchTracks({ variables: { searchTerm }})
    setShowFavourites(false)
  }
  return (
    <form onSubmit={handleFormSubmit}>
      {searchTracksQueryInfo.error &&
        <div className='alert' role='alert'>
          <strong className='font-bold'>Search failed! </strong>
          <span className='block sm:inline'>We're unable to search that track right now.</span>
        </div>
      }
      <div className='flex'>
        <input
          aria-label='Song title'
          className='w-full mr-2 md:py-4 md:px-8'
          onChange={e => setSearchTerm(e.target.value)}
          type='text'
          placeholder='e.g. Bohemian Rhapsody'
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
