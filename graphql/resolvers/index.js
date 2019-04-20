const userQueries = require('./user.queries');
const movieQueries = require('./movie.queries');
const userMutations = require('./user.mutations');
const movieMutations = require('./movie.mutations');

exports.resolvers = {
  Query: {
    ...userQueries,
    ...movieQueries
  },

  Mutation: {
    ...userMutations,
    ...movieMutations
  }
};