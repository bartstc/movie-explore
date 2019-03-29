const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const Movie = require('./models/Movie');
const User = require('./models/User');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

// Initializes application
const app = express();

// Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ // { req: { currentUser } }
    currentUser,
    User,
    Movie
  }),
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  }
});

// Middleware: GraphQL
server.applyMiddleware({ app, path: '/graphql' });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));