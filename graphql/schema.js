const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Movie {
    _id: ID
    title: String!
    director: String!
    year: Int!
    genres: [String!]!
    shortDescription: String!
    description: String!
    date: String
    username: String
    likes: Int
    watched: Int
    toWatch: Int
    rating: Int
    numberOfRatings: Int
    comments: [Comment!]
  }

  type Comment {
    user: User!
    text: String!
    date: String!
  }

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    date: String
    recommendations: [Movie!]
    liked: [Movie!]
    watched: [Movie!]
    toWatch: [Movie!]
    friends: [User!]
    invitations: [User!]
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
    genres: String!
    shortDescription: String!
    description: String!
    username: String!
  }

  type Query {
    getCurrentUser: User
    getUser(username: String!): User
    searchFriends(keyword: String): [User]
    getUserMovies(username: String!): [Movie]

    getAllMovies: [Movie]
    getLastAdded: [Movie]
  }

  type Mutation {
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
    sendInvitation(senderId: ID!, receiverId: ID!): Feedback
    acceptOrRejectInvitation(receiverId: ID!, senderId: ID!, rejection: Boolean): Feedback
    removeFriend(currentUserId: ID!, friendId: ID!): Feedback

    addMovie(MovieData: MovieInput): Movie
    deleteUserMovie(_id: ID!): Movie
    likeMovie(_id: ID!, username: String!): Movie
    unlikeMovie(_id: ID!, username: String!): Movie
    addWatched(_id: ID!, username: String!): Movie
    removeWatched(_id: ID!, username: String!): Movie
    addToWatch(_id: ID!, username: String!): Movie
    removeToWatch(_id: ID!, username: String!): Movie
  }
`;