import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import GET_FAVOURITE_TRACKS from '../../graphql/queries/FavouriteTrack.js'

import TrackList from '../TrackList'

describe('When the user has some favourite tracks returned from the server', () => {
  const mockedFavouriteTracksData = {
    favouriteTracks: [{
      id: 'fave1',
      name: 'Favourite track 1',
      album: {
        name: 'album name',
        images: [
          {
            height: 25,
            width: 25,
            url: 'image url'
          },
          {
            height: 300,
            width: 300,
            url: 'image url'
          }
        ],
        uri: 'album uri'
      },
      artists: [
        {
          name: 'artist name',
          uri: 'artist uri'
        }
      ],
      previewUrl: 'http://preview',
      uri: 'track uri'
    }]
  }

  const favouriteTracksQueryMock = {
    request: {
      query: GET_FAVOURITE_TRACKS
    },
    result: {
      data: mockedFavouriteTracksData
    }
  }
 
  describe('and showFavourites is true', () => {
    beforeEach(() => {
      render(
        <MockedProvider mocks={[favouriteTracksQueryMock]} addTypename={false}>
          <TrackList showFavourites={true} searchedTracks={[]} />
        </MockedProvider >,
      )
    })

    test('the user\'s favourite tracks are displayed', async () => {
      const favouritedTrack = await screen.findByText('Favourite track 1')
      expect(favouritedTrack).toBeTruthy()
    })

    test('and a title explaining this is displayed', async () => {
      const listTitle = await screen.findByText('My favourite tracks')
      expect(listTitle).toBeTruthy()
    })
  })

  describe('if showFavourites is false but there are no searched tracks', () => {
    beforeEach(() => {
      render(
        <MockedProvider mocks={[favouriteTracksQueryMock]} addTypename={false}>
          <TrackList showFavourites={false} searchedTracks={[]} />
        </MockedProvider >,
      )
    })

    test('still show the user\'s favourite tracks', async () => {
      const favouritedTrack = await screen.findByText('Favourite track 1')
      expect(favouritedTrack).toBeTruthy()
    })

    test('and appropriate title is displayed', async () => {
      const listTitle = await screen.findByText('My favourite tracks')
      expect(listTitle).toBeTruthy()
    })
  })

  describe('when tracks favouriteTracks are loading', () => {
    test('display loading text', async () => {
      const { findByText } = render(
        <MockedProvider mocks={[favouriteTracksQueryMock]} addTypename={false}>
          <TrackList showFavourites={false} searchedTracks={[]} />
        </MockedProvider >,
      )
      const loadingText = await findByText('Loading...')
      expect(loadingText).toBeTruthy()
    })
  })
})

describe('When the user has no favourite tracks but has performed a search for tracks', () => {
  const mockedSearchedTracksData = [{
      id: 'fave1',
      name: 'Searched track 1',
      album: {
        name: 'album name',
        images: [
          {
            height: 25,
            width: 25,
            url: 'image url'
          },
          {
            height: 300,
            width: 300,
            url: 'image url'
          }
        ],
        uri: 'album uri'
      },
      artists: [
        {
          name: 'artist name',
          uri: 'artist uri'
        }
      ],
      previewUrl: 'http://preview',
      uri: 'track uri'
    }]
  
  const mockedFavouriteTracksData = {
    favouriteTracks: []
  }

  const favouriteTracksQueryMock = {
    request: {
      query: GET_FAVOURITE_TRACKS
    },
    result: {
      data: mockedFavouriteTracksData
    }
  }

  describe('and showFavourites is false', () => {
    beforeEach(() => {
      render(
        <MockedProvider mocks={[favouriteTracksQueryMock]} addTypename={false}>
          <TrackList 
            showFavourites={false} 
            searchedTracks={mockedSearchedTracksData} 
          />
        </MockedProvider >
      )
    })

    test('the user\'s searched tracks are displayed', async () => {
      const searchedTrack = await screen.findByText('Searched track 1')
      expect(searchedTrack).toBeTruthy()
    })

    test('and a title explaining this is displayed', async () => {
      const listTitle = await screen.findByText('This is what we found...')
      expect(listTitle).toBeTruthy()
    })
  })

  describe('when the searched tracks are loading', () => {
    test('display loading text', async () => {
      const { findByText } = render(
        <MockedProvider mocks={[favouriteTracksQueryMock]} addTypename={false}>
          <TrackList
            showFavourites={false}
            searchedTracks={[]}
            searchedTracksLoading={true}
          />
        </MockedProvider >
      )
      const loadingText = await findByText('Loading...')
      expect(loadingText).toBeTruthy()
    })
  })
})
