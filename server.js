const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const Movie = require('./models/Movie');
const User = require('./models/User');
const keys = require('./config/keys');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

// Initializes application
const app = express();

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  if (token && token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

// Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req: { currentUser } }) => ({
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

mongoose.connect(keys.mongoURL, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));