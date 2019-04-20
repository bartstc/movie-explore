import React, { useContext } from 'react';
import styled from 'styled-components';
import { colors, device } from '../utils/styles';
import { SideDrawerContext } from '../store/UIStore/UIstore';

import logo from '../assets/logo.png';
import NavItem from '../components/navigation/NavItem';
import Modal from '../components/UI/Modal';
import SideDrawer from '../components/navigation/SideDrawer';
import Backdrop from '../components/navigation/Backdrop';
import Signout from '../containers/auth/Signout';
import Footer from '../components/UI/Footer';

const Layout = ({ children, session: { getCurrentUser } }) => {
  const adminLinks = [
    { path: '/', content: "Home" },
    { path: '/explore', content: "Explore" },
    { path: '/admin', content: "Admin" },
    { path: '/profile', content: "Profile" }
  ];

  const authLinks = [
    { path: '/', content: "Home" },
    { path: '/explore', content: "Explore" },
    { path: '/profile', content: "Profile" }
  ];

  const publicLinks = [
    { path: '/', content: "Home" },
    { path: '/explore', content: "Explore" },
    { path: '/signin', content: "Sign In" },
    { path: '/signup', content: "Sign Up" }
  ];

  let links;
  if (getCurrentUser && getCurrentUser.isAdmin) links = adminLinks;
  else if (getCurrentUser) links = authLinks;
  else links = publicLinks;

  const { open, setOpen } = useContext(SideDrawerContext);
  const onToggle = () => setOpen(!open);
  const hide = () => setOpen(false);

  return (
    <>
      <Modal />
      <SideDrawer links={links} open={open} hide={hide} isSignIn={getCurrentUser} />
      <Backdrop open={open} hide={hide} />
      <Header>
        <img className="logo" src={logo} alt="" />
        <Nav>
          <ul className="link-group">
            {links.map((link, index) => (
              <NavItem key={index} to={link.path}>{link.content}</NavItem>
            ))}
            {getCurrentUser && <Signout to="/logout">Logout</Signout>}
          </ul>
        </Nav>
        <button onClick={onToggle} className="toggle"><i className="fas fa-bars"></i></button>
      </Header>
      <Main>{children}</Main>
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
  max-width: 950px;
  margin: 0 auto;
  color: ${colors.mainWhite};
  padding: 55px .5em 30px .5em;

  @media ${device.tablet} {
    padding-top: 90px;
  }
`;

export default Layout;