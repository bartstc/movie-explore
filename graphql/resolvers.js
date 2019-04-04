const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');
const alreadyExists = require('../utils/alreadyExists');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
};

exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({ username: currentUser.username })
        .populate({ path: 'recommendations', model: 'Movie' })
        .populate({ path: 'liked', model: 'Movie' })
        .populate({ path: 'watched', model: 'Movie' })
        .populate({ path: 'toWatch', model: 'Movie' })
        .populate({ path: 'friends', model: 'User' })
        .populate({ path: 'invitations', model: 'User' })

      return {
        ...user._doc,
        date: user.date.toISOString()
      };
    },

    getUser: async (root, { username }, { User }) => {
      const user = await User.findOne({ username })
        .populate({ path: 'watched', model: 'Movie' })
        .populate({ path: 'toWatch', model: 'Movie' })
      return user;
    },

    searchFriends: async (root, { keyword }, { User }) => {
      if (keyword) {
        const searchResults = await User.find(
          {
            $text: { $search: keyword }
          }, {
            score: { $meta: 'textScore' }
          }).sort({
            score: { $meta: 'textScore' }
          });

        return searchResults;
      } else {
        return null;
      };
    },

    getUserMovies: async (root, { username }, { Movie }) => {
      const userMovies = await Movie.find({ username }).sort({ date: 'desc' });
      return userMovies;
    },

    // getAllMovies: async (root, args, { Movie }) => {
    //   const allMovies = await Movie.find().sort({ date: 'desc' });
    //   return allMovies;
    // }

    getLastAdded: async (root, args, { Movie }) => {
      const movies = await Movie.find()
        .sort({ date: 'desc' })
        .limit(6)

      return movies;
    },
  },

  Mutation: {
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error('Invalid password');

      return { token: createToken(user, keys.secret, '1hr') };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const userByUsername = await User.findOne({ username });
      if (userByUsername) throw new Error('User already exists');

      const userByEmial = await User.findOne({ email });
      if (userByEmial) throw new Error('Email in use');

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, keys.secret, '1hr') };
    },

    sendInvitation: async (root, { senderId, receiverId }, { User }) => {
      const currentUser = await User.findOne({ _id: senderId });
      const newFriend = await User.findOne({ _id: receiverId });

      // Validation
      if (alreadyExists(newFriend.invitations, senderId)) throw new Error('Invitation has already been sent');

      if (alreadyExists(currentUser.invitations, receiverId)) throw new Error('Invitation exists. Check your invitations');

      if (alreadyExists(newFriend.friends, senderId)) throw new Error('This user already exists in your friends list');

      newFriend.invitations.push(senderId);
      await newFriend.save();

      return { feedback: "The invitation has been sent" };
    },

    acceptOrRejectInvitation: async (root, { receiverId, senderId, rejection }, { User }) => {
      // If rejection true => reject invitation
      if (rejection) {
        await User.findOneAndUpdate(
          { _id: receiverId },
          { $pull: { invitations: senderId } },
          { new: true }
        );
        return { feedback: 'Invitation rejected successfully' };
      };

      // If rejection false => add friedn to lists
      await User.findOneAndUpdate(
        { _id: receiverId },
        {
          $pull: { invitations: senderId },
          $push: { friends: senderId }
        },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: senderId },
        { $push: { friends: receiverId } },
        { new: true }
      );

      return { feedback: 'Invitation accepted successfully' };
    },

    removeFriend: async (root, { currentUserId, friendId }, { User }) => {
      await User.findOneAndUpdate(
        { _id: currentUserId },
        { $pull: { friends: friendId } },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: friendId },
        { $pull: { friends: currentUserId } },
        { new: true }
      );

      return { feedback: 'Friend removed successfully' };
    },

    addMovie: async (root, { MovieData: { title, imageUrl, director, year, genres, shortDescription, description, username } }, { Movie }) => {
      const existingMovie = await Movie.findOne({ title });
      if (existingMovie) throw new Error('Movie already exists');

      const newMovie = await new Movie({ title, imageUrl, director, year, genres, shortDescription, description, username }).save();

      return newMovie;
    },

    deleteUserMovie: async (root, { _id }, { Movie }) => {
      const movie = await Movie.findOneAndRemove({ _id });
      return movie;
    },

    likeMovie: async (root, { _id, username }, { Movie, User }) => {
      const movie = await Movie.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      await User.findOneAndUpdate({ username }, { $addToSet: { liked: _id } });

      return movie;
    },

    unlikeMovie: async (root, { _id, username }, { Movie, User }) => {
      const movie = await Movie.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
      await User.findOneAndUpdate({ username }, { $pull: { liked: _id } });

      return movie;
    },

    addWatched: async (root, { _id, username }, { Movie, User }) => {
      const movie = await Movie.findOneAndUpdate({ _id }, { $inc: { watched: 1 } });
      await User.findOneAndUpdate({ username }, { $addToSet: { watched: _id } });

      return movie;
    },

    removeWatched: async (root, { _id, username }, { Movie, User }) => {
      const movie = await Movie.findOneAndUpdate({ _id }, { $inc: { watched: -1 } });
      await User.findOneAndUpdate({ username }, { $pull: { watched: _id } });

      return movie;
    },

    addToWatch: async (root, { _id, username }, { Movie, User }) => {
      const movie = await Movie.findOneAndUpdate({ _id }, { $inc: { toWatch: 1 } });
      await User.findOneAndUpdate({ username }, { $addToSet: { toWatch: _id } });

      return movie;
    },

    removeToWatch: async (root, { _id, username }, { Movie, User }) => {
      const movie = await Movie.findOneAndUpdate({ _id }, { $inc: { toWatch: -1 } });
      await User.findOneAndUpdate({ username }, { $pull: { toWatch: _id } });

      return movie;
    },

    rateMovie: async (root, { movieId, userId, rating }, { Movie }) => {
      const movie = await Movie.findOne({ _id: movieId });

      if (alreadyExists(movie.numberOfRatings, userId)) throw new Error('You have already rated this movie');

      const numberOfRatings = movie.numberOfRatings.length;
      const actualRating = movie.rating;
      const updatedRating = ((actualRating * numberOfRatings) + rating) / (numberOfRatings + 1);

      movie.rating = updatedRating;
      movie.numberOfRatings.push(userId);
      movie.save();

      return movie;
    }
  }
};