import { gql } from 'apollo-boost';

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      isAdmin
      liked {
        _id
        title
        rating
      }
      watched {
        _id
        title
        rating
      }
      toWatch {
        _id
        title
        rating
      }
      friends
      invitations
    }
  }
`;

export const GET_USER = gql`
  query($username: String!) {
    getUser(username: $username) {
      _id
      username
      watched {
        _id
        title
        rating
      }
      liked {
        _id
        title
        rating
      }
    }
  }
`;


// User Mutations
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SEND_INVITATION = gql`
  mutation($senderUsername: String!, $username: String!) {
    sendInvitation(senderUsername: $senderUsername, username: $username) {
      feedback
    }
  }
`;

export const ACCEPT_OR_REJECT_INVITATION = gql`
  mutation($currentUsername: String!, $friendUsername: String!, $rejection: Boolean) {
    acceptOrRejectInvitation(currentUsername: $currentUsername, friendUsername: $friendUsername, rejection: $rejection) {
      feedback
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation($currentUsername: String!, $friendUsername: String!) {
    removeFriend(currentUsername: $currentUsername, friendUsername: $friendUsername) {
      feedback
    }
  }
`;

export const SEARCH_FRIENDS = gql`
  query($keyword: String) {
    searchFriends(keyword: $keyword) {
      username
    }
  }
`;

export const DELETE_ACCOUNT = gql`
mutation($_id: ID!) {
  deleteAccount(_id: $_id) {
    username
  }
}
`;


// Movie Queries
export const GET_LAST_ADDED = gql`
  query {
    getLastAdded {
      _id
      title
      imageUrl
      director
      year
      genres
    }
  }
`;

export const GET_TOP_10 = gql`
  query {
    getTop10 {
      _id
      title
      imageUrl
      rating
    }
  }
`;

export const GET_MOST_POPULAR = gql`
  query {
    getMostPopular {
      _id
      title
      imageUrl
      director
      year
      genres
    }
  }
`;

export const SEARCH_MOVIES = gql`
  query($keyword: String) {
    searchMovies(keyword: $keyword) {
      _id
      title
      imageUrl
      year
      genres
    }
  }
`;

export const GET_MOVIE = gql`
  query($_id: ID!) {
    getMovie(_id: $_id) {
      _id
      title
      imageUrl
      director
      year
      genres
      description
      date
      likes
      watched
      toWatch
      rating
      numberOfRatings
      comments {
        _id
        username
        text
        date
      }
    }
  }
`;


// Movie Mutations
export const ADD_MOVIE = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $director: String!
    $year: Int!
    $genres: [String!]!
    $description: String!
    $username: String!) {
    addMovie(MovieData: {title: $title, imageUrl: $imageUrl, director: $director, year: $year, genres: $genres, description: $description, username: $username}) {
      _id
      title
      imageUrl
      director
      year
      genres
      description
      date
      username
    }
  }
`;

export const LIKE_MOVIE = gql`
  mutation($_id: ID!, $username: String!) {
    likeMovie(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const UNLIKE_MOVIE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeMovie(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const ADD_WATCHED = gql`
  mutation($_id: ID!, $username: String!) {
    addWatched(_id: $_id, username: $username) {
      _id
      watched
    }
  }
`;

export const REMOVE_WATCHED = gql`
  mutation($_id: ID!, $username: String!) {
    removeWatched(_id: $_id, username: $username) {
      _id
      watched
    }
  }
`;

export const ADD_TO_WATCH = gql`
  mutation($_id: ID!, $username: String!) {
    addToWatch(_id: $_id, username: $username) {
      _id
      toWatch
    }
  }
`;

export const REMOVE_TO_WATCH = gql`
  mutation($_id: ID!, $username: String!) {
    removeToWatch(_id: $_id, username: $username) {
      _id
      toWatch
    }
  }
`;

export const RATE_MOVIE = gql`
  mutation($movieId: ID!, $userId: ID!, $rating: Int!) {
    rateMovie(movieId: $movieId, userId: $userId, rating: $rating) {
      _id
      rating
      numberOfRatings
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation($text: String!, $movieId: ID!, $username: String!) {
    addComment(text: $text, movieId: $movieId, username: $username) {
      username
      text
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation($commentId: ID!, $movieId: ID!) {
    removeComment(commentId: $commentId, movieId: $movieId) {
      feedback
    }
  }
`;