import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import SearchTracksQuery from './graphql/queries/SearchTracks.js'
import Header from './components/Header'
import TrackList from './components/TrackList'

const App = () => {
  const [showFavourites, setShowFavourites] = useState(false)
  const [searchTracks, { loading, error, data = {} }] = useLazyQuery(SearchTracksQuery)
  const searchedTracks = data.searchTracks || []

  return (
    <div>
      <Header searchTracks={searchTracks} searchTracksQueryInfo={{ loading, error }} setShowFavourites={setShowFavourites} />
      <main className='container mx-auto px-4'>
        <TrackList searchedTracks={searchedTracks} showFavourites={showFavourites} />
      </main>
    </div>
  )
}

export default App
