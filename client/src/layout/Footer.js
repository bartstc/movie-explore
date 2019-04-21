import React from 'react';
import { FooterWrapper } from './styled';

const Footer = () => (
  <FooterWrapper>
    <p>Copyright &copy; {new Date().getFullYear()} MovieExplore</p>
  </FooterWrapper>
);

export default Footer;