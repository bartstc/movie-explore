const userQueries = {
  getCurrentUser: async (root, args, { currentUser, User }) => {
    if (!currentUser) return null;

    const user = await User.findOne({ username: currentUser.username })
      .populate({ path: 'liked', model: 'Movie' })
      .populate({ path: 'watched', model: 'Movie' })
      .populate({ path: 'toWatch', model: 'Movie' })

    return {
      ...user._doc,
      date: user.date.toISOString()
    };
  },

  getUser: async (root, { username }, { User }) => {
    const user = await User.findOne({ username })
      .populate({ path: 'watched', model: 'Movie' })
      .populate({ path: 'liked', model: 'Movie' })
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
      const testUsers = await User.find();
      return testUsers;
    };
  }
};

module.exports = userQueries;