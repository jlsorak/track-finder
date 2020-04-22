const express = require('express')
const { ApolloServer, ApolloError, gql } = require('apollo-server-express')

require('./db/connection')
const FavouriteTracks = require('./db/models/FavouriteTracks')
const SpotifyAPI = require('./datasources/SpotifyAPI');

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
    favouriteTracks: async (_, {}, { dataSources }) => {
      let favourites
      try {
        favourites = await FavouriteTracks.find({})
      } catch (error) {
        throw new ApolloError('Database find operation failed', null, error)
      }
      if (favourites.length) {
        const trackIds = favourites.map((favourite) => favourite.trackId)
        const tracks = dataSources.SpotifyAPI.getTracks(trackIds)
        return tracks
      } 
      return []
    },
    searchTracks: async (_, { searchTerm }, { dataSources }) => {
      const tracks = dataSources.SpotifyAPI.searchTracks(searchTerm)
      return tracks
    }
  },
  Mutation: {
    favouriteTrack: async (_, { id }) => {
      try {
        await FavouriteTracks.create({ trackId: id })
      } catch (error) {
        throw new ApolloError('Database create operation failed', null, error)
      }
      return { id }    
    },
    unfavouriteTrack: async (_, { id }) => {
      try {
        await FavouriteTracks.deleteOne({ trackId: id })
      } catch (error) {
        throw new ApolloError('Database delete operation failed', null, error)
      }
      return { id }
    }
  }
}

const dataSources = () => {
  return {
    SpotifyAPI: new SpotifyAPI()
  }
}

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

