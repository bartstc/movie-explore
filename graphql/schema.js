const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Movie {
    _id: ID
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
    favourites: [Movie!]
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
  }

  type Mutation {
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;