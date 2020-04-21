const { RESTDataSource } = require('apollo-datasource-rest')

const axios = require('axios')

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.spotify.com/v1/'
  }

  willSendRequest(request) {
    request.headers.set('Authorization', 'Bearer ' + this.context.spotifyAccessToken)
  }

  async searchTracks(searchTerm) {
    try {
      const data = await this.get(`search`, {
        q: searchTerm,
        type: 'track'
      })
      return data.tracks.items
    } catch (error) {
      console.log(error, 'error')
      throw new Error('Unable to search tracks')
    }
  }

  async getTracks(ids) {
    try {
      const data = await this.get(`tracks`, { ids })
      return data.tracks
    } catch (error) {
      console.log(error, 'error')
      throw new Error('Unable to get tracks')
    }
  }

  // We can't use the request library from apollo-datasource-rest to get the access token
  // because we need to make the request before the Apollo Server has even been initialised.
  async getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const base64ClientData = Buffer.from(clientId + ':' + clientSecret).toString('base64')
    try {
      const response = await axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
          'Authorization': 'Basic ' + base64ClientData,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          grant_type: 'client_credentials'
        }
      })
      return response.data.access_token
    } catch (error) {
      console.log(error, 'error')
    }
  }
}

module.exports = SpotifyAPI
