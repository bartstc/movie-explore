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


// Movie Mutations
export const ADD_MOVIE = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $director: String!
    $year: Int!
    $genres: [String!]!
    $shortDescription: String!
    $description: String!
    $username: String!) {
    addMovie(MovieData: {title: $title, imageUrl: $imageUrl, director: $director, year: $year, genres: $genres, shortDescription: $shortDescription, description: $description, username: $username}) {
      _id
      title
      imageUrl
      director
      year
      genres
      shortDescription
      description
      date
      username
    }
  }
`;