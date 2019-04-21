import { gql } from 'apollo-boost';

export const ADD_MOVIE = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $director: String!
    $year: Int!
    $genres: [String!]!
    $description: String!) {
    addMovie(MovieData: {title: $title, imageUrl: $imageUrl, director: $director, year: $year, genres: $genres, description: $description}) {
      _id
      title
      imageUrl
      director
      year
      genres
      description
      date
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation($_id: ID!) {
    deleteMovie(_id: $_id) {
      _id
      title
    }
  }
`;

export const GET_MOVIES = gql`
  query {
    getMovies {
      _id
      title
    }
  }
`;