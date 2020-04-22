import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FaHeartBroken} from 'react-icons/fa'

import GET_FAVOURITE_TRACKS from '../graphql/queries/FavouriteTrack.js'

import Track from './Track'

const TrackList = ({ searchedTracks, showFavourites }) => {
  const { data = { favouriteTracks: {} } } = useQuery(GET_FAVOURITE_TRACKS)
  const favouriteTracks = data.favouriteTracks || []

  let listTitle
  let tracksToDisplay = []
  if (showFavourites || !searchedTracks.length) {
    tracksToDisplay = favouriteTracks
    listTitle = 'My favourite tracks'
  } else {
    tracksToDisplay = searchedTracks
    listTitle = 'This is what we found...'
  }
  if (!tracksToDisplay.length) listTitle = <><FaHeartBroken className='inline-icon-left text-pink-600' /> No songs favourited yet. Make a search above to start finding songs you like.</>

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
