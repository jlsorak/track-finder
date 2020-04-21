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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-2" role="alert">
          <strong className="font-bold">Search failed! </strong>
          <span className="block sm:inline">We're unable to search that track right now.</span>
        </div>
      }
      <div className='flex'>
        <input
          aria-label='Song title'
          className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 w-full mr-2 md:py-4 md:px-8'
          onChange={e => setSearchTerm(e.target.value)}
          type='text'
          placeholder='e.g. Bohemian Rhapsody'
        />
        <button className='bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded-lg inline-flex items-center' disabled={searchTracksQueryInfo.loading}>
          Search
          <FaChevronRight />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
