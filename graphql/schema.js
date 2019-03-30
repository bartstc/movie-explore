const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Movie {
    _id: ID
    title: String!
    director: String!
    year: Int!
    genres: String!
    shortDescription: String!
    description: String!
    date: String
    likes: Int
    username: String
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
    joinDate: String
    toWatch: [Movie!]
  }

  type Token {
    token: String!
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
    getUserMovies(username: String!): [Movie]

    getAllMovies: [Movie]
  }

  type Mutation {
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token

    addMovie(MovieData: MovieInput): Movie
  }
`;