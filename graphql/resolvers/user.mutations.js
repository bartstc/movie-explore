const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../../config/keys');
const alreadyExists = require('../../utils/alreadyExists');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
};

const userMutations = {
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

  deleteAccount: async (root, { _id }, { User }) => {
    const user = await User.findOneAndRemove({ _id });
    const username = user.username;

    // updateMany does not work for multiple pull?
    await User.updateMany({}, {
      $pull: { invitations: username }
    });

    await User.updateMany({}, {
      $pull: { friends: username }
    });

    return user;
  },

  sendInvitation: async (root, { senderUsername, username }, { User }) => {
    const currentUser = await User.findOne({ username: senderUsername });
    const newFriend = await User.findOne({ username });

    // Validation
    if (alreadyExists(newFriend.invitations, senderUsername)) throw new Error('Invitation has already been sent');

    if (alreadyExists(currentUser.invitations, username)) throw new Error('Invitation exists. Check your invitations');

    if (alreadyExists(newFriend.friends, senderUsername)) throw new Error('This user already exists in your friends list');

    newFriend.invitations.push(senderUsername);
    await newFriend.save();

    return { feedback: "The invitation has been sent" };
  },

  acceptOrRejectInvitation: async (root, { currentUsername, friendUsername, rejection }, { User }) => {
    // If rejection true => reject invitation
    if (rejection) {
      await User.findOneAndUpdate(
        { username: currentUsername },
        { $pull: { invitations: friendUsername } },
        { new: true }
      );
      return { feedback: 'Invitation rejected successfully' };
    };

    // If rejection false => add friend to lists
    await User.findOneAndUpdate(
      { username: currentUsername },
      {
        $pull: { invitations: friendUsername },
        $push: { friends: friendUsername }
      },
      { new: true }
    );

    await User.findOneAndUpdate(
      { username: friendUsername },
      { $push: { friends: currentUsername } },
      { new: true }
    );

    return { feedback: 'Invitation accepted successfully' };
  },

  removeFriend: async (root, { currentUsername, friendUsername }, { User }) => {
    await User.findOneAndUpdate(
      { username: currentUsername },
      { $pull: { friends: friendUsername } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { username: friendUsername },
      { $pull: { friends: currentUsername } },
      { new: true }
    );

    return { feedback: 'Friend removed successfully' };
  }
};

module.exports = userMutations;