import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from './queries';

// HOC, responsible for getting current user data
const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data)

      return (
        <Component {...props} refetch={refetch} session={data} />
      )
    }}
  </Query>
);

export default withSession;

// refetch allows to refetch queries (in this case we want to refetch getCurrentUser for take current user data)