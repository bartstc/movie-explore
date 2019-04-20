const movieQueries = {
  getMovies: async (root, args, { Movie }) => {
    const userMovies = await Movie.find().sort({ date: 'desc' });
    return userMovies;
  },

  getLastAdded: async (root, args, { Movie }) => {
    const movies = await Movie.find()
      .sort({ date: 'desc' })
      .limit(6)

    return movies;
  },

  getMostPopular: async (root, args, { Movie }) => {
    const movies = await Movie.find()
      .sort({ likes: 'desc' })
      .limit(5);

    return movies;
  },

  getTop10: async (root, args, { Movie }) => {
    const movies = await Movie.find()
      .sort({ rating: 'desc' })
      .limit(10);

    return movies;
  },

  getMovie: async (root, { _id }, { Movie }) => {
    const movie = await Movie.findOne({ _id });

    return {
      ...movie._doc,
      date: movie.date.toISOString(),
      comments: movie.comments.map(c => {
        return {
          ...c._doc,
          date: c.date.toISOString()
        }
      })
    };
  },

  searchMovies: async (root, { keyword }, { Movie }) => {
    if (keyword) {
      const searchResults = await Movie.find(
        {
          $text: { $search: keyword }
        }, {
          score: { $meta: 'textScore' }
        }).sort({
          score: { $meta: 'textScore' }
        });

      return searchResults;
    } else {
      const latest10 = await Movie.find()
        .sort({ date: 'desc' })
        .limit(10);

      return latest10;
    };
  }
};

module.exports = movieQueries;