import { gql } from 'apollo-boost';

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