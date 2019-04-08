import React, { useContext } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom'; // access to props.history
import { SideDrawerContext } from '../../utils/UIstore';

import NavItem from '../../components/navigation/NavItem';

const Signout = ({ history, children, linkType, to }) => {
  const { open, setOpen } = useContext(SideDrawerContext);

  const handleSignout = (client, history) => {
    localStorage.setItem('token', ''); // remove token
    if (open) setOpen(false);
    client.resetStore();
    history.push('/');
  };

  return (
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
  )
};

export default withRouter(Signout);