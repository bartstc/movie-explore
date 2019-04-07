import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom'; // access to props.history

import NavItem from '../../components/navigation/NavItem';

const handleSignout = (client, history) => {
  localStorage.setItem('token', ''); // remove token
  client.resetStore();
  history.push('/');
};

const Signout = ({ history, children, linkType, to }) => (
  <ApolloConsumer>
    {client => {
      return (
        <NavItem
          linkType={linkType}
          to={to}
          onClick={() => handleSignout(client, history)}
        >
          {children}
        </NavItem>
      )
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);