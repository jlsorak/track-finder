const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const SpotifyAPI = require('./datasources/SpotifyAPI')

// Schema using GraphQL schema language 
const typeDefs = gql`
  type Query {
    searchTracks(searchTerm: String!): [Track]
  }

  type Album {
    name: String
    uri: String
  }

  type Artist {
    name: String
    uri: String
  }

  type Track {
    album: Album
    artists: [Artist]
    name: String
    previewUrl: String,
    durationMs: Int
    uri: String
  }
`;

// Resolver functions for our schema fields
const resolvers = {
  Query: {
    searchTracks: async (parent, { searchTerm }, { dataSources }) => {
      const tracks = await dataSources.SpotifyAPI.getTracks(searchTerm)
      return tracks.map((track) => {
        const {
          album,
          artists,
          duration_ms: durationMs,
          name,
          preview_url: previewUrl,
          uri 
        } = track

        return { 
          album,
          artists,
          durationMs,
          name,
          previewUrl,
          uri
        }
      })
    }
  },
};

// We need to get a token from https://accounts.spotify.com/api/ before we 
// can start sending requests to the main https://api.spotify.com/v1/ api
(async () => {
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


