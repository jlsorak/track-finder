import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import PropTypes from 'prop-types'

const FavouriteButton = ({ isFavourited, favourite, unfavourite, name }) => {
  if (isFavourited) return (
    <button onClick={unfavourite} data-testid='favourited'>
      <FaHeart className='text-pink-600 hover:text-pink-600 m-2' />
      <span className='sr-only'>Unfavourite {name}</span>
    </button>
  )

  return (
    <button onClick={favourite} data-testid='not-favourited'>
      <FaRegHeart className='text-gray-600 hover:text-pink-600 m-2' />
      <span className='sr-only'>Favourite {name}</span>
    </button>
  )
}

FavouriteButton.propTypes = {
  favourite: PropTypes.func.isRequired,
  isFavourited: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  unfavourite: PropTypes.func.isRequired
}

export default FavouriteButton
