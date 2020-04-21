import React, { useState } from 'react'

import { FaChevronRight} from 'react-icons/fa'

const SearchForm = ({ searchTracks, searchTracksQueryInfo = {} }) => {
  const [ searchTerm, setSearchTerm ] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    !searchTracksQueryInfo.loading && searchTracks({ variables: { searchTerm }})
  }
  
  return (
    <form onSubmit={handleFormSubmit}>
      {searchTracksQueryInfo.error &&
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-2" role="alert">
          <strong className="font-bold">Search failed! </strong>
          <span className="block sm:inline">We're unable to search that track right now.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
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
