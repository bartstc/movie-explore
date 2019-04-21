import React, { useContext } from 'react';
import { SideDrawerContext } from '../store/UIStore/UIstore';
import { Header, Main, Nav } from './styled';

import logo from '../assets/logo.png';
import NavItem from '../components/navigation/NavItem';
import Modal from '../shared/Modal';
import SideDrawer from '../components/navigation/SideDrawer';
import Backdrop from '../components/navigation/Backdrop';
import Signout from '../containers/auth/Signout';
import Footer from './Footer';

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
              <NavItem key={index} to={link.path} withoutActive>{link.content}</NavItem>
            ))}
            {getCurrentUser && <Signout to="/">Logout</Signout>}
          </ul>
        </Nav>
        <button onClick={onToggle} className="toggle"><i className="fas fa-bars"></i></button>
      </Header>
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;