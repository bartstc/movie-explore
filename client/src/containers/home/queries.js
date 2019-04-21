import { gql } from 'apollo-boost';

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