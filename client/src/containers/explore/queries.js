import { gql } from 'apollo-boost';

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