import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FaCompactDisc, FaUser} from 'react-icons/fa'

import GET_FAVOURITE_TRACKS from '../graphql/queries/FavouriteTrack.js'
import FAVOURITE_TRACK from '../graphql/mutations/FavouriteTrack.js'
import UNFAVOURITE_TRACK from '../graphql/mutations/UnfavouriteTrack.js'

import Preview from './Preview'
import FavouriteButton from './FavouriteButton'

const Track = ({ track, favouriteTracks }) => {
  const [ favouriteTrack ] = useMutation(
    FAVOURITE_TRACK,
    { refetchQueries: () => [{ query: GET_FAVOURITE_TRACKS }] }
  )
  const [ unfavouriteTrack ] = useMutation(
    UNFAVOURITE_TRACK,
    { refetchQueries: () => [{ query: GET_FAVOURITE_TRACKS }] }
  )

  const favourite = () => {
    favouriteTrack({ variables: { id: track.id }})
  }
  const unfavourite = () => {
    unfavouriteTrack({ variables: { id: track.id } })
  }

  const { artists, album, name, previewUrl } = track

  const artistNames = artists.map((artist, index) => {
    const link = <a href={artist.uri}>{artist.name}</a>
    return artists.length - 1 !== index
      ? <>{link}, </>
      : link
  })

  const isFavourited = favouriteTracks.find((favouriteTrack) => favouriteTrack.id === track.id)
  
  return (
    <li className='flex my-6'>
      <div className='flex-shrink-0'>
        <div className='flex items-center'>
          <FavouriteButton isFavourited={isFavourited} name={name} favourite={favourite} unfavourite={unfavourite} />
          <img className='w-12 h-12 md:w-24 md:h-24 rounded ml-1 md:ml-4' src={album.images[1].url}></img>
        </div>
      </div>
      <div className='md:flex items-start justify-between w-full mx-1 md:m-4'>
        <div>
          <div className='font-bold text-lg'>{name}</div>
          <div className='mb-2'>
            <FaUser className='inline mr-1 text-sm'/>{artistNames} 
            <FaCompactDisc className='inline mr-1 ml-2 text-sm' /><a href={album.uri}>{album.name}</a>
          </div>
        </div>
        <Preview previewUrl={previewUrl}/>
      </div>
    </li>
  )
}

export default Track
