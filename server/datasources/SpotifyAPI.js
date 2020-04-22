const { RESTDataSource } = require('apollo-datasource-rest')
const { ApolloError, AuthenticationError } = require('apollo-server-express')
const camelcaseKeys = require('camelcase-keys')

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super()
  }

  // Resolve the API URL dynamically
  // We use https://accounts.spotify.com/api/ to get an access token
  // Otherwise we use https://api.spotify.com/v1/
  async resolveURL(request) {
    if (request.path === 'token') {
      this.baseURL = 'https://accounts.spotify.com/api/'
    } else {
      this.baseURL = 'https://api.spotify.com/v1/'
    }
    return super.resolveURL(request)
  }

  // Intercepts the request so we can apply the neccessary auth headers
  async willSendRequest(request) {
    if (request.path !== 'token') {
      const accessToken = await this.getAccessToken()
      request.headers.set('Authorization', 'Bearer ' + accessToken)
    }
  }

  // Uses a search term to search spotify for tracks
  async searchTracks(searchTerm) {
    try {
      const data = await this.get(`search`, {
        q: searchTerm,
        type: 'track'
      })
      return camelcaseKeys(data.tracks.items, { deep: true }) // Transforms the snake_case object keys returned from Spotify into camelcase
    } catch (error) {
      if (error instanceof AuthenticationError) throw error
      throw new ApolloError('Failed to search track from Spotify')
    }
  }

  // Used to get the tracks that are favourited
  async getTracks(ids) {
    try {
      const data = await this.get(`tracks`, { ids })
      return camelcaseKeys(data.tracks, { deep: true }) // Transforms the snake_case object keys returned from Spotify into camelcase
    } catch (error) {
      if (error instanceof AuthenticationError) throw error
      throw new ApolloError('Failed to get tracks from Spotify')
    }
  }

  // Gets an access token which is required to make any other api requests
  async getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const base64ClientData = Buffer.from(clientId + ':' + clientSecret).toString('base64')
    try {
      const response = await this.post(
        'token', 
        'grant_type=client_credentials',
        { 
          headers: {
            'Authorization': 'Basic ' + base64ClientData,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      return response.access_token
    } catch (error) {
      throw new AuthenticationError('Cannot fetch access token from Spotify')
    }
  }
}

module.exports = SpotifyAPI
