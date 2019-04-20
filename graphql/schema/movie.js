exports.types = `
  type Movie {
    _id: ID
    title: String!
    imageUrl: String!
    director: String!
    year: Int!
    genres: [String!]!
    description: String!
    date: String
    likes: Int
    watched: Int
    toWatch: Int
    rating: Float
    numberOfRatings: [ID!]
    comments: [Comment!]
  }

  type Comment {
    _id: ID!
    username: String!
    text: String!
    date: String!
  }

  type Feedback {
    feedback: String!
  }
`;

exports.inputs = `
  input MovieInput {
    title: String!
    imageUrl: String!
    director: String!
    year: Int!
    genres: [String!]
    description: String!
  }
`;

exports.queries = `
  getLastAdded: [Movie]
  getMostPopular: [Movie]
  getTop10: [Movie]
  getMovie(_id: ID!): Movie
  searchMovies(keyword: String): [Movie]
  getMovies: [Movie]
`;

exports.mutations = `
  addMovie(MovieData: MovieInput): Movie
  deleteMovie(_id: ID!): Movie
  likeMovie(_id: ID!, username: String!): Movie
  unlikeMovie(_id: ID!, username: String!): Movie
  addWatched(_id: ID!, username: String!): Movie
  removeWatched(_id: ID!, username: String!): Movie
  addToWatch(_id: ID!, username: String!): Movie
  removeToWatch(_id: ID!, username: String!): Movie
  rateMovie(movieId: ID!, userId: ID!, rating: Int!): Movie
  addComment(text: String!, movieId: ID!, username: String!): Comment
  removeComment(commentId: ID!, movieId: ID!): Feedback
`;