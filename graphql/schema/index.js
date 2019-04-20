const { gql } = require('apollo-server-express');
const { types: userTypes, queries: userQueries, mutations: userMutations } = require('./user');
const { types: movieTypes, inputs: movieInputs, queries: movieQueries, mutations: movieMutations } = require('./movie');

exports.typeDefs = gql`
  ${userTypes}
  ${movieTypes}
  ${movieInputs}

  type Query {
    ${userQueries}
    ${movieQueries}
  }

  type Mutation {
    ${userMutations}
    ${movieMutations}
  }
`;