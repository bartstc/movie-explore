import React from 'react';
import styled from 'styled-components';
import { device, fonts, colors } from '../../utils/styles';

export const BackdropWrapper = ({ children, onHide }) => (
  <>
    <BackdropStyles onClick={onHide}>
      {children}
    </BackdropStyles>
  </>
);

const BackdropStyles = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  background: rgba(0,0,0, .7);
`;

export const NavItemWrapper = styled.li`

  .nav-link {
    color: #fff;
    transition: color .2s ease-in-out;

    &:hover {
      color: #B41027;
    }

    &.active {
      color: #B41027;
      font-weight: ${fonts.fontBold};
    }
  }

  .nav-icon {
    font-size: 1em;
  }
`;

export const SideDrawerWrapper = styled.nav`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  transform: ${props => (props.open ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform .2s ease-in-out;
  background: ${colors.mainBlack};
  width: 100%;
  height: 160px;

  .link-group {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 1em 0;
  }
  
  @media ${device.tablet} {
    display: none;
  }
`;