import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const FavouriteButton = ({ isFavourited, favourite, unfavourite, name }) => {
  if (isFavourited) return (
    <button onClick={unfavourite}>
      <FaHeart className='text-pink-600 hover:text-pink-600 m-2' />
      <span className='sr-only'>Unfavourite {name}</span>
    </button>
  )

  return (
    <button onClick={favourite}>
      <FaRegHeart className='text-gray-600 hover:text-pink-600 m-2' />
      <span className='sr-only'>Favourite {name}</span>
    </button>
  )
}

export default FavouriteButton
