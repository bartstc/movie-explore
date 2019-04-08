const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Movie {
    _id: ID
    title: String!
    imageUrl: String!
    director: String!
    year: Int!
    genres: [String!]!
    description: String!
    date: String
    username: String
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

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    date: String
    liked: [Movie!]
    watched: [Movie!]
    toWatch: [Movie!]
    friends: [String!]
    invitations: [String!]
  }

  type Token {
    token: String!
  }

  type Feedback {
    feedback: String!
  }

  input MovieInput {
    title: String!
    imageUrl: String!
    director: String!
    year: Int!
    genres: [String!]
    description: String!
    username: String!
  }

  type Query {
    getCurrentUser: User
    getUser(username: String!): User
    searchFriends(keyword: String): [User]
    
    getLastAdded: [Movie]
    getMostPopular: [Movie]
    getTop10: [Movie]
    getMovie(_id: ID!): Movie
    searchMovies(keyword: String): [Movie]
    getMovies: [Movie]
  }

  type Mutation {
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
    deleteAccount(_id: ID!): User
    sendInvitation(senderUsername: String!, username: String!): Feedback
    acceptOrRejectInvitation(currentUsername: String!, friendUsername: String!, rejection: Boolean): Feedback
    removeFriend(currentUsername: String!, friendUsername: String!): Feedback

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
  }
`;