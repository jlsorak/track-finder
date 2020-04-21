import React from 'react'
import { FaHeart, FaMusic } from 'react-icons/fa'

import SearchForm from './SearchForm'
import Guitarist from '../assets/guitarist.png'


const Header = ({
  searchTracks,
  searchTracksQueryInfo,
  setShowFavourites
}) => {
  const favouritesButton = (
    <button className='bg-white hover:bg-gray-200 font-bold rounded-lg py-2 px-4 float-right inline-flex items-center' onClick={() => setShowFavourites(true)}>
      <FaHeart className='mr-1 text-pink-600' />
      My Favourites
    </button>
  )

  const imageCredit = (
    <span className='p-1 rounded text-white text-sm' style={{ backgroundColor: '#18191b' }}>
      Photo by <a href='https://unsplash.com/@franciscomoreno'>Francisco Moreno</a> on <a href='https://unsplash.com/'>Unsplash</a>
    </span>
  )

  return (
    <header style={{ height: '75vh' }}>
      <img
        alt='Woman standing watching a LED light display in the shape of various musical instruments.'
        className='absolute object-cover min-w-full'
        src={Guitarist}
        style={{ height: 'inherit', zIndex: -1 }}
      />
      <div className='flex flex-col h-full p-4'>
        <div>
          {favouritesButton}
        </div>
        <div className='flex self-center items-center h-full md:pl-32 w-full'>
          <div className='p-4 rounded-lg md:w-1/2' style={{ backgroundColor: '#18191b' }}>
            <h1 className='font-lg text-white text-2xl sm:text-4xl inline-flex items-center'>
              Track finder
              <FaMusic className='ml-1 text-3xl' />
            </h1>
            <div className='text-white mb-4'>Enter a song title below to search for songs.</div>
            <SearchForm searchTracks={searchTracks} searchTracksQueryInfo={searchTracksQueryInfo} setShowFavourites={setShowFavourites} />
          </div>
        </div>
        <div>{imageCredit}</div>
      </div>
    </header>
  )
}

export default Header
