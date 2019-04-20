exports.types = `
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean!
    date: String
    liked: [Movie!]
    watched: [Movie!]
    toWatch: [Movie!]
    friends: [String!]
    invitations: [String!]
  }

  type Token {
    token: String!
  }
`;

exports.queries = `
  getCurrentUser: User
  getUser(username: String!): User
  searchFriends(keyword: String): [User]
`;

exports.mutations = `
  signinUser(username: String!, password: String!): Token
  signupUser(username: String!, email: String!, password: String!): Token
  deleteAccount(_id: ID!): User
  sendInvitation(senderUsername: String!, username: String!): Feedback
  acceptOrRejectInvitation(currentUsername: String!, friendUsername: String!, rejection: Boolean): Feedback
  removeFriend(currentUsername: String!, friendUsername: String!): Feedback
`;