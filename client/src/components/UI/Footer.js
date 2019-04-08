import React from 'react';
import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';

const Footer = () => (
  <FooterWrapper>
    <p>Copyright &copy; {new Date().getFullYear()} MovieExplore</p>
  </FooterWrapper>
);

const FooterWrapper = styled.footer`
  height: 50px;
  text-align: center;
  font-weight: ${fonts.fontLight};
  font-size: .9em;
  color: ${colors.mainWhite};
`;

export default Footer;