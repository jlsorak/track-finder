const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost/track-finder', 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
  }
)
