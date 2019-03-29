const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favourites: [Recipe!]
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