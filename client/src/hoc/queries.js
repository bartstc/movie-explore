import { gql } from 'apollo-boost';

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