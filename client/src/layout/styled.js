import styled from 'styled-components';
import { fonts, colors, device } from '../utils/styles';

export const FooterWrapper = styled.footer`
  height: 50px;
  text-align: center;
  font-weight: ${fonts.fontLight};
  font-size: .9em;
  color: ${colors.mainWhite};
`;

export const Header = styled.header`
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

export const Nav = styled.nav`
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

export const Main = styled.main`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  color: ${colors.mainWhite};
  padding: 55px .5em 30px .5em;

  @media ${device.tablet} {
    padding-top: 90px;
  }
`;