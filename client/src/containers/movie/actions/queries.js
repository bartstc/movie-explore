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