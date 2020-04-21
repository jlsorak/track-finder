import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Track from './Track'

const TrackList = ({ searchedTracks = [] }) => {
  console.log(searchedTracks, 'ssearched tracks?')
  return (
    <>
      <ul>
        {searchedTracks.map((track, index) => <Track track={track} index={index} /> )}
      </ul>
    </>
  )
}

export default TrackList
