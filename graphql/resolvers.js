exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      };

      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favourites',
          model: 'Recipe'
        })

      return {
        ...user._doc,
        joinDate: user.joinDate.toISOString()
      };
    },
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

      return { token: createToken(user, process.env.SECRET, '1hr') };
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

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    }
  }
};