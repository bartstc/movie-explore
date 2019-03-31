const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
};

exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      };

      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'toWatch',
          model: 'Movie'
        })

      return {
        ...user._doc,
        date: user.date.toISOString()
      };
    },

    getUserMovies: async (root, { username }, { Movie }) => {
      const userMovies = await Movie.find({ username })
        .sort({ date: 'desc' });

      return userMovies;
    },

    getAllMovies: async (root, args, { Movie }) => {
      const allMovies = await Movie.find().sort({ date: 'desc' });

      return allMovies;
    }
  },

  Mutation: {
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      };

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      };

      return { token: createToken(user, keys.secret, '1hr') };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      };

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, keys.secret, '1hr') };
    },

    addMovie: async (root, { MovieData: { title, imageUrl, director, year, genres, shortDescription, description, username } }, { Movie }) => {
      const newMovie = await new Movie({ title, imageUrl, director, year, genres, shortDescription, description, username }).save();

      return newMovie;
    }
  }
};