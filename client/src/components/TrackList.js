import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FaHeartBroken} from 'react-icons/fa'

import GET_FAVOURITE_TRACKS from '../graphql/queries/FavouriteTrack.js'

import Track from './Track'

const TrackList = ({ searchedTracks, showFavourites }) => {
  const { data = [] } = useQuery(GET_FAVOURITE_TRACKS)
  const favouriteTracks = data.favouriteTracks
  const tracksToDisplay = showFavourites ? favouriteTracks : searchedTracks

  let listTitle
  if (!tracksToDisplay.length) listTitle = <><FaHeartBroken className='inline text-pink-600 mr-1' /> No songs favourited yet. Make a search above to start finding songs you like.</>
  else if (showFavourites) listTitle = 'My favourite tracks'
  else listTitle = 'This is what we found...'

  return (
    <>
      <h2 className='text-2xl mt-16'>{listTitle}</h2>
      {tracksToDisplay.length > 0 && 
        <ul>
          {tracksToDisplay.map((track) => {
            return <Track track={track} favouriteTracks={favouriteTracks} key={track.id} />
          })}
        </ul>
      }
    </>
  )
}

export default TrackList
