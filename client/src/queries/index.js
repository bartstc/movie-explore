import { gql } from 'apollo-boost';

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
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

// Movie Mutations
export const ADD_MOVIE = gql`
mutation(
  $title: String!
  $imageUrl: String!
  $director: String!
  $year: Int!
  $genres: String!
  $shortDescription: String!
  $description: String!
  $username: String!
) {
  addMovie(MovieData: {title: $title, imageUrl: $imageUrl, director: $director, year: $year, genres: $genres, shortDescription: $shortDescription, description: $description}) {
    name
    _id
    director
    year
    genres
    shortDescription
    description
    date
  }
}
`;