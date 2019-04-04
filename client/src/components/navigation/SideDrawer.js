import React from 'react';
import styled from 'styled-components';
import { colors, device } from '../../utils/styles';

import NavItem from './NavItem';

const SideDrawer = ({ links, open }) => (
  <Nav open={open}>
    <ul className="link-group">
      {links.map((link, index) => (
        <NavItem key={index} linkType="nav-icon" to={link.path}>{link.content}</NavItem>
      ))}
    </ul>
    {/* <button className="close"><i class="fas fa-times"></i></button> */}
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

  .link-group {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1em 0;
  }
  
  @media ${device.tablet} {
    display: none;
  }
`;

export default SideDrawer;