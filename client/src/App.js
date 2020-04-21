import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import SearchTracksQuery from './graphql/queries/SearchTracks.js'
import Header from './components/Header'
import TrackList from './components/TrackList'

const App = () => {
  const [searchTracks, { loading, error, data }] = useLazyQuery(SearchTracksQuery)
  const searchedTracks = data && data.searchTracks

  return (
    <div>
      <Header searchTracks={searchTracks} searchTracksQueryInfo={loading, error} />
      <main className='container mx-auto px-4'>
        <h1>browse</h1>
        <TrackList searchedTracks={searchedTracks} />
      </main>
    </div>
  )
}

export default App
