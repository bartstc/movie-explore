const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genres: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: new Date
      }
    }
  ]
});

MovieSchema.index({
  // "$**": "text" // search for every field in recipe and set it to text
  name: 'text', genre: 'text'
});

module.exports = mongoose.model('Movie', MovieSchema);