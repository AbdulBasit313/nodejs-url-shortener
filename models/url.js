const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlSchema = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  urlCode: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url
