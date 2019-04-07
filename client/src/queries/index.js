import { gql } from 'apollo-boost';

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      date
      liked {
        _id
        title
        genres
      }
      watched {
        _id
        title
        genres
      }
      toWatch {
        _id
        title
        genres
      }
      friends {
        _id
        username
      }
      invitations {
        _id
        username
      }
    }
  }
`;
export const GET_ADDED_MOVIES = gql`
  query($username: String!) {
    getUserMovies(username: $username) {
      _id
      title
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
      username
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