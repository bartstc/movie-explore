import React from 'react';
import PropTypes from 'prop-types';
import { SideDrawerWrapper } from './styled';

import NavItem from './NavItem';
import Signout from '../../containers/auth/Signout';

const SideDrawer = ({ links, open, hide, isSignIn }) => (
  <SideDrawerWrapper open={open}>
    <ul className="link-group">
      {links.map((link, index) => (
        <NavItem
          key={index}
          onClick={hide}
          linkType="nav-icon"
          to={link.path}>
          {link.content}
        </NavItem>
      ))}
      {isSignIn && <Signout to="/logout">Logout</Signout>}
    </ul>
  </SideDrawerWrapper>
);

SideDrawer.propTypes = {
  links: PropTypes.array.isRequired,
  open: PropTypes.bool,
  isSignIn: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  hide: PropTypes.func
};

export default SideDrawer;