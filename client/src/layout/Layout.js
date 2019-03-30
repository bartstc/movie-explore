import React from 'react';
import styled from 'styled-components';
import { colors, device } from '../utils/styles';

import logo from '../assets/logo.png';
import Toolbar from '../components/navigation/Toolbar';
import NavItem from '../components/navigation/NavItem';

const links = [
  { path: '/dashboard', content: "Home" },
  { path: '/explore', content: "Explore" },
  { path: '/add', content: "Add Movie" },
  { path: '/profile', content: "Profile" },
  { path: '/', content: "Logout" }
];

const Layout = ({ children }) => (
  <>
    <Header>
      <img className="logo" src={logo} alt="" />
      <Nav>
        <ul className="link-group">
          {links.map((link, index) => (
            <NavItem key={index} linkType="nav-icon" to={link.path}>{link.content}</NavItem>
          ))}
        </ul>
      </Nav>
    </Header>
    <Main>{children}</Main>
    <Toolbar />
  </>
);

const Header = styled.header`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: ${colors.mainBlack};

  @media ${device.tablet} {
    display: flex;
    justify-content: space-between;
    height: 65px;
  }

  @media ${device.laptop} {
    padding: 0 40px;
  }

  .logo {
    height: 34px;
    width: auto;

    @media ${device.tablet} {
      height: 46px;
    }
  }
`;

const Nav = styled.nav`
  display: none;
  width: 420px;

  @media ${device.tablet} {
    display: block;
  }

  .link-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  color: ${colors.mainWhite};
`;

export default Layout;