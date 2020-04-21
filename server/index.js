const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

require('./db/connection')
const FavouriteTracks = require('./db/models/FavouriteTracks')
const SpotifyAPI = require('./datasources/SpotifyAPI');

(async () => {
  // Schema using GraphQL schema language 
  const typeDefs = gql`
    type Query {
      favouriteTracks: [Track]
      searchTracks(searchTerm: String!): [Track]
    }

    type Mutation {
      favouriteTrack(id: String!): Track
      unfavouriteTrack(id: String!): Track
    }

    type Album {
      name: String
      images: [Image]
      uri: String
    }

    type Artist {
      name: String
      uri: String
    }

    type Track {
      album: Album
      artists: [Artist]
      durationMs: Int
      id: String
      name: String
      previewUrl: String,
      uri: String
    }

    type Image { 
      height: Int
      width: Int
      url: String
    }
  `;

  // Resolver functions for our schema fields
  const resolvers = {
    Query: {
      favouriteTracks: async (parent, {}, { dataSources }) => {
        try {
          const favourites = await FavouriteTracks.find({})
          const trackIds = favourites.map((favourite) => favourite.trackId)
          const tracks = await dataSources.SpotifyAPI.getTracks(trackIds)

          return tracks.map((track) => {
            const {
              album,
              artists,
              duration_ms: durationMs,
              id,
              name,
              preview_url: previewUrl,
              uri
            } = track

            return {
              album,
              artists,
              durationMs,
              id,
              name,
              previewUrl,
              uri
            }
          })
        } catch (error) {
          console.log(error)
        }
      },
      searchTracks: async (parent, { searchTerm }, { dataSources }) => {
        const tracks = await dataSources.SpotifyAPI.searchTracks(searchTerm)
        return tracks.map((track) => {
          const {
            album,
            artists,
            duration_ms: durationMs,
            id,
            name,
            preview_url: previewUrl,
            uri 
          } = track

          return { 
            album,
            artists,
            durationMs,
            id,
            name,
            previewUrl,
            uri
          }
        })
      }
    },
    Mutation: {
      favouriteTrack: async (parent, { id }) => {
        try {
          await FavouriteTracks.create({ trackId: id })
          return { id }
        } catch (error) {
          console.log(error)
        }
      },
      unfavouriteTrack: async (parent, { id }) => {
        try {
          await FavouriteTracks.deleteOne({ trackId: id })
          return { id }
        } catch (error) {
          console.log(error)
        }
      }
    }
  };

  // We need to get a token from https://accounts.spotify.com/api/ before we 
  // can start sending requests to the main https://api.spotify.com/v1/ api
  const SpotifyAPIInstance = new SpotifyAPI()
  const spotifyAccessToken = await SpotifyAPIInstance.getAccessToken()

  const dataSources = () => {
    return {
      SpotifyAPI: SpotifyAPIInstance
    }
  }

  const context = {
    spotifyAccessToken: spotifyAccessToken // Used for all subsequent SpotifyAPI requests
  }

  const server = new ApolloServer({ typeDefs, resolvers, dataSources, context })

  const app = express()
  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})()


