import React, { useContext } from 'react';
import styled from 'styled-components';
import { colors, device } from '../utils/styles';
import { SideDrawerContext } from '../utils/UIstore';

import logo from '../assets/logo.png';
import Toolbar from '../components/navigation/Toolbar';
import NavItem from '../components/navigation/NavItem';
import Footer from '../components/UI/Footer';
import Modal from '../components/UI/Modal';
import SideDrawer from '../components/navigation/SideDrawer';
import Backdrop from '../components/navigation/Backdrop';

const authLinks = [
  { path: '/', content: "Home" },
  { path: '/explore', content: "Explore" },
  { path: '/add', content: "Add Movie" },
  { path: '/profile', content: "Profile" },
  { path: '/logout', content: "Logout" }
];

const publicLinks = [
  { path: '/', content: "Home" },
  { path: '/explore', content: "Explore" },
  { path: '/signin', content: "Sign In" },
  { path: '/signup', content: "Sign Up" }
];

let links;

const Layout = ({ children, session: { getCurrentUser } }) => {
  (getCurrentUser) ? links = authLinks : links = publicLinks;

  const [open, setOpen] = useContext(SideDrawerContext);
  const onToggle = () => setOpen(!open);
  const hide = () => setOpen(false);

  return (
    <>
      <Modal />
      <SideDrawer links={links} open={open} hide={hide} />
      <Backdrop open={open} hide={hide} />
      <Header>
        <img className="logo" src={logo} alt="" />
        <Nav>
          <ul className="link-group">
            {links.map((link, index) => (
              <NavItem key={index} linkType="nav-icon" to={link.path}>{link.content}</NavItem>
            ))}
          </ul>
        </Nav>
        <button onClick={onToggle} className="toggle"><i className="fas fa-bars"></i></button>
      </Header>
      <Main>{children}</Main>
      {getCurrentUser && <Toolbar />}
      <Footer />
    </>
  );
};

const Header = styled.header`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-image: linear-gradient(${colors.mainBlack}, ${colors.mainBlack}, transparent);

  @media ${device.tablet} {
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

  .toggle {
    position: fixed;
    z-index: 30;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    width: 26px;
    height: 26px;
    font-size: 1.2em;
    color: ${colors.mainWhite};

    @media ${device.tablet} {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  display: none;
  width: 350px;

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
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 60px;
  color: ${colors.mainWhite};
`;

export default Layout;