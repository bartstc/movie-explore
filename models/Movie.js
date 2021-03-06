const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
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
    type: [String],
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
  watched: {
    type: Number,
    default: 0
  },
  toWatch: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  numberOfRatings: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  comments: [
    {
      username: {
        type: String,
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
  title: 'text', genres: 'text', director: 'text'
  // "$**": "text" // search for every field in recipe and set it to text
});

module.exports = mongoose.model('Movie', MovieSchema, 'Movie');