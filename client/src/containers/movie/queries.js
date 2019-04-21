import { gql } from 'apollo-boost';

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