import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom'; // access to props.history
import { SideDrawerContext } from '../../store/UIStore/UIstore';

import NavItem from '../../components/navigation/NavItem';

const Signout = ({ history, children, to }) => {
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

Signout.propTypes = {
  history: PropTypes.object,
  to: PropTypes.string
};

export default withRouter(Signout);