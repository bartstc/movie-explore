const alreadyExists = require('../../utils/alreadyExists');

const movieMutations = {
  addMovie: async (root, { MovieData: { title, imageUrl, director, year, genres, description } }, { Movie }) => {
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) throw new Error('Movie already exists');

    const newMovie = await new Movie({ title, imageUrl, director, year, genres, description }).save();

    return newMovie;
  },

  deleteMovie: async (root, { _id }, { Movie, User }) => {
    const movie = await Movie.findOneAndRemove({ _id });

    await User.updateMany({}, {
      $pull: { liked: _id },
      $pull: { watched: _id },
      $pull: { toWatch: _id },
    });

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
  },

  addComment: async (root, { text, movieId, username }, { Movie }) => {
    const comment = {
      username: username,
      text
    };

    await Movie.findOneAndUpdate(
      { _id: movieId },
      { $push: { comments: comment } },
      { new: true }
    );

    return comment;
  },

  removeComment: async (root, { commentId, movieId }, { Movie }) => {
    const movie = await Movie.findOne({ _id: movieId });

    const updatedComments = movie.comments.filter(comment => comment.id !== commentId);
    movie.comments = updatedComments;
    movie.save();

    return { feedback: 'Comment removed successfully' };
  }
};

module.exports = movieMutations;