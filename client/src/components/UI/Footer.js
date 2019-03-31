import React from 'react';
import styled from 'styled-components';
import { fonts, colors, device } from '../../utils/styles';

const Footer = () => (
  <FooterWrapper>
    <p>Made by Bart</p>
  </FooterWrapper>
);

const FooterWrapper = styled.footer`
  display: none;
  height: 50px;
  text-align: center;
  font-weight: ${fonts.fontLight};
  font-size: .9em;
  color: ${colors.mainWhite};

  @media ${device.tablet} {
    display: block;
  }
`;

export default Footer;