const mongoose = require('mongoose')

const FavouriteTracksSchema = new mongoose.Schema({
  trackId: String
})

mongoose.model('FavouriteTracks', FavouriteTracksSchema)

module.exports = mongoose.model('FavouriteTracks')