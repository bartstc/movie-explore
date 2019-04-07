import React from 'react';
import styled from 'styled-components';
import { colors, device } from '../../utils/styles';

import NavItem from './NavItem';
import Signout from '../../containers/auth/Signout';

const SideDrawer = ({ links, open, hide, isSignIn }) => (
  <Nav open={open}>
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
  </Nav>
);

const Nav = styled.nav`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  transform: ${props => (props.open ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform .2s ease-in-out;
  background: ${colors.mainBlack};
  width: 100%;
  height: 160px;

  .link-group {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 1em 0;
  }
  
  @media ${device.tablet} {
    display: none;
  }
`;

export default SideDrawer;