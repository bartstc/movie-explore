import React from 'react';
import styled from 'styled-components';
import { colors, device } from '../../utils/styles';

import NavItem from './NavItem';

const links = [
  { path: '/dashboard', classes: "fas fa-home" },
  { path: '/explore', classes: "fas fa-search" },
  { path: '/add', classes: "fas fa-plus-circle" },
  { path: '/profile', classes: "far fa-user" },
  { path: '/logout', classes: "fas fa-power-off" }
];

const Toolbar = () => (
  <ToolbarWrapper>
    <ul className="link-group">
      {links.map((link, index) => (
        <NavItem key={index} linkType="nav-icon" to={link.path}><i className={link.classes}></i></NavItem>
      ))}
    </ul>
  </ToolbarWrapper>
);

const ToolbarWrapper = styled.nav`
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  background: ${colors.mainBlack};

  @media ${device.tablet} {
    display: none;
  }

  .link-group {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    max-width: 425px;
    margin: 0 auto;
  }
`;

export default Toolbar;